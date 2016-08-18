
import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { AppointmentService } from '../../services/appointment.service';
import { StudentDashboardService } from '../../services/studentDashboard.service';
import { InputText, Button } from 'primeng/primeng';



@Component({
    selector: 'subjectSearch',
    directives: [InputText, Button],
    providers: [ AppointmentService, StudentDashboardService ],
    styles: [`
        .filter-input: {
            
        }
    `],
    template: `
        <div class="container" >
            <div class="input-field col s12">
              <input id="subject" type="text" pInputText class="validate filter-input" placeholder="What do you want to learn?" [(ngModel)]=query (keyup)=filter() size="35">
              <button pButton label="Add Subject" (click)="addSubject(query)"></button>
            </div>
            <div class="suggestions" *ngIf="filteredList.length > 0">
                <ul *ngFor="#item of filteredList" >
                    <li >
                        <a (click)="select(item)">{{item}}</a>
                    </li>
                </ul>
            </div>
        </div>  	
        `
})

export class SubjectSearchComponent {
    public query = '';
    public subjects = [];
    public filteredList = [];
    private studentid: number; 
    private fullSubjects = [];

 
constructor(
     private ngRedux: NgRedux<IAppState>,    
     private appointmentService: AppointmentService,
     private studentDashboardService: StudentDashboardService
) {}

 ngOnInit() {
     this.getSubjects()
     this.getStudentID()
 }

 getSubjects() {
        this.appointmentService.getSubjects()
            .subscribe(
                data => 
                data.forEach(el => {
                    this.fullSubjects.push(el)
                    this.subjects.push(el.name)
                })        
            )
    }

addSubject(subject) {
    let subjectObj = this.fullSubjects.filter( (el) => { 
        return el.name === subject;
    })
   let model = {
       userID: this.studentid,
       subjectID: subjectObj[0].id
   }
    this.studentDashboardService.addSubjectForStudent(model)
        .subscribe(
            data => console.log(data))
}

 getSubjectByStudent() {
      let authID = this.ngRedux.getState().login['userData'].authid
      this.studentDashboardService.findSubjectsByUser(authID)
        .subscribe(
          data => this.subjects = data
        );
    }
    
 filter() {
    if (this.query !== ""){
        this.filteredList = this.subjects.filter(function(el){
            return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filteredList = [];
    }
}

select(item){
    this.query = item;
    this.filteredList = [];
}

 getStudentID(){
        let userData = this.ngRedux.getState().login['userData']
        if(userData){
          let authID = userData.authID;
          this.appointmentService.getUserID(authID)
            .subscribe( data => this.studentid = data[0].id);
        }
    }   

}