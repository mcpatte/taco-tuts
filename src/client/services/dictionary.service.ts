import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class DictionaryService {
  constructor (private http: Http) {}

  dictionary: string[] = [];
  hasDictionaryCache: boolean = false;
  dictionaryUrl: string = '/dictionary.txt';

  private cacheDictionary(dictionary: string[]) {
    this.hasDictionaryCache = true;
    this.dictionary = dictionary;
  }

  private parseDictionary(res: Response): string[] {
    const dictionary = res.text().split('\n');
    this.cacheDictionary(dictionary);
    return dictionary;
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private requestDictionary() {
    return this.http.get(this.dictionaryUrl)
      .map(this.parseDictionary.bind(this))
      .catch(this.handleError);
  }

  getDictionary() {
    if (!this.hasDictionaryCache) {
      return this.requestDictionary();
    } else {
      return Observable.of(this.dictionary);
    }
  }

  searchDictionary(word: string) {
    return this.getDictionary()
      .map(
        dict => dict.indexOf(word) >= 0
      );
  }

}
