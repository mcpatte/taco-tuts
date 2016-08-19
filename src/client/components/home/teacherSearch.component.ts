import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { AppointmentService } from '../../services/appointment.service';
import { StudentDashboardService } from '../../services/studentDashboard.service';
import { Button } from 'primeng/primeng';
import { debounce } from 'lodash';
import { AdvancedSearchService } from '../../services/advanced-search.service';
import { TeacherList } from '../../actions/teacherList.actions';

@Component({
    selector: 'teacherSearch',
    directives: [Button],
    providers: [ AppointmentService, StudentDashboardService, AdvancedSearchService, TeacherList],
    styles: [`
        .filter-input: {
            
        }
    `],
    template: `
        <div class="container" >
            <div class="input-field col s12">
              <input id="subject" type="text" class="validate filter-input" placeholder="What do you want to learn?" [(ngModel)]=query (keyup)=debounce() size="35">
              <button pButton class="btn btn-default" (click)="sendToParent(query)" label="Submit"></button>
            </div>
            <div class="suggestions" *ngIf="filteredList.length > 0">
                <div *ngFor="#item of filteredList" >
                        <button pButton (click)="select(item)" label={{item}}> </button>
                </div>
            </div>
        </div>  	
        `
})

export class TeacherSearchComponent implements OnInit {
  public subjects = [];
  public filteredList = [];
  private studentid: number;
  private fullSubjects = [];
  private debounce: Function;
@Input()  query: string;
@Output() onClicked = new EventEmitter<string>();
  sendToParent(stuff: string) {
    console.log(stuff);
    this.onClicked.emit(stuff);
  }

  constructor(
      private ngRedux: NgRedux<IAppState>,
      private appointmentService: AppointmentService,
      private studentDashboardServices: StudentDashboardService,
      private advancedSearch: AdvancedSearchService,
      private teacherList: TeacherList
  ) {}

  ngOnInit() {
      this.getSubjects();
      this.getStudentID();
      this.debounce = debounce(this.filter.bind(this), 500);
  }

  getSubjects() {
        this.appointmentService.getSubjects()
            .subscribe(
                data =>
                data.forEach(el => {
                    this.fullSubjects.push(el)
                    this.subjects.push(el.name)
                })
            );
    }

  addSubject(subject) {
    let subjectObj = this.fullSubjects.filter( (el) => { 
        return el.name === subject;
    });
    let model = {
        userID: this.studentid,
        subjectID: subjectObj[0].id
    };
    this.studentDashboardServices.addSubjectForStudent(model)
        .subscribe(data => console.log(data))

  }

  filter() {
    if (this.query !== '') {
        console.log("++++++++");
        this.advancedSearch.advancedSearch({subject: this.query})
          .subscribe ( (data) => {
            console.log(data);
            this.teacherList.setTeacherListDispatch(data);
          });
    } else {
      this.filteredList = [];
    }
  }

  select(item){
    this.query = item;
    this.filteredList = [];
  }

  getStudentID() {
    let userData = this.ngRedux.getState().login['userData'];
    if(userData) {
      let authID = userData.authID;
      this.appointmentService.getUserID(authID)
        .subscribe( data => this.studentid = data[0].id);
    }
  }

}
