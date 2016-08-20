import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { AppointmentService } from '../../services/appointment.service';
import { StudentDashboardService } from '../../services/studentDashboard.service';
import { Button } from 'primeng/primeng';
import { debounce } from 'lodash';
import { AdvancedSearchService } from '../../services/advanced-search.service';
import { TeacherListActions } from '../../actions';

@Component({
    selector: 'teacherSearch',
    directives: [Button],
    providers: [ AppointmentService, StudentDashboardService, AdvancedSearchService, TeacherListActions],
    styles: [`
        .filter-input: {

        }
        input[type=text] {
          width: 100%;
          box-sizing: border-box;
          border: 2px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
          background-color: white;
          background-position: 10px 10px;
          background-repeat: no-repeat;
          padding: 12px 5px 10px 10px;
          -webkit-transition: width 0.4s ease-in-out;
          transition: width 0.4s ease-in-out;
        }
        div {
          margin: 0;
          padding: 0;
        }

        input[type=text]:focus {
            width: 200%;
        }
    `],
    template: `
        <br />
        <div class="container-fluid" >
            <input id="subject" type="text" class="validate filter-input" placeholder="Filter teachers by subject..." [(ngModel)]=query (keyup)=debounce()>
        </div>
        <br />
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
    private teacherList: TeacherListActions
  ) {}

  ngOnInit() {
    this.getSubjects();
    this.getStudentID();
    this.debounce = debounce(this.filter.bind(this), 500);
    this.filter();
  }

  getSubjects() {
    this.appointmentService.getSubjects()
      .subscribe(
        data => data.forEach(el => {
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
    this.advancedSearch.advancedSearch({subject: this.query})
      .subscribe ( (data) => {
        console.log(data);
        this.teacherList.setTeacherListDispatch(data);
      });
  }

  select(item) {
    this.query = item;
    this.filteredList = [];
  }

  getStudentID() {
    let userData = this.ngRedux.getState().login['userData'];
    if(userData) {
      let authID = userData.authid;
      this.appointmentService.getUserID(authID)
        .subscribe( data => this.studentid = data[0].id);
    }
  }

}
