import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Rx';
import { SearchActions } from '../actions/search.actions';
import { IAppState } from '../store';
import { DictionaryService } from '../services/dictionary.service';
import { RandomNumberService } from '../services/random-number.service';
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
  selector: 'search',
  providers: [ HTTP_PROVIDERS, SearchActions, DictionaryService, RandomNumberService ],
  template: `
  <input
    id='search-input'
    type="text"
    class="search"
    [(ngModel)]="keyword"
    (ngModelChange)="actions.searchDispatch($event)"/>
  <p>Number of characters (from subscription): {{ numChars }}</p>
  <p>Number of characters (from async pipe): {{ numChars$ | async }}</p>
  <p>You entered: {{ search$ | async }}<p>
  <button (click)="searchDictionary()"> Search dictionary </button>
  <button (click)="randomWord()"> Random Word </button>
  `
})
export class Search {
  // Selected observables to test async pipe model.
  @select(['search', 'total']) numChars$: Observable<number>;
  @select(['search', 'keyword']) search$: Observable<string>;

  // Members to test subscribe model.
  numChars: number;
  keyword: string;

  constructor(
    private actions: SearchActions,
    private ngRedux: NgRedux<IAppState>,
    private dictionaryService: DictionaryService,
    private randomNumberService: RandomNumberService) { }

  ngOnInit() {
    // Exercise the flow where a state change results in a new action.
    this.search$.subscribe(keyword => {
      if (keyword != '') {
        this.actions.fetchResultDispatch(keyword.length)
      }
    });

    // Exercise the flow where you set a member on change manually instead of
    // using async pipe.
    this.numChars$.subscribe(state => {
      this.numChars = state;
    });
  }

  searchDictionary() {
    this.dictionaryService.searchDictionary(this.keyword)
      .subscribe(
        inDictionary => console.log(`${this.keyword} - ${inDictionary}`)
      );
  }

  getDictionary() {
    this.dictionaryService.getDictionary()
      .subscribe(
        data => console.log('hi', data),
        error => console.log('error', error)
      );
  }

  randomWord () {
    console.log("Getting random word");
    let index = this.randomNumberService.pick(1700);
    this.dictionaryService.getDictionary()
    .subscribe(
      dictionary => {
        console.log(index, dictionary[index])
        console.log(dictionary.length)
      },
      error => console.log('error', error)
    );
    
  }
}
