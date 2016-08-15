
import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { AppointmentService } from '../../services/appointment.service';




@Component({
    selector: 'subjectSearch',
    providers: [ AppointmentService ],
    styles: [`
        .filter-input: {
            
        }
    `],
    template: `
        <div class="container" >
            <div class="input-field col s12">
              <input id="subject" type="text" class="validate filter-input" placeholder="What do you want to learn?" [(ngModel)]=query (keyup)=filter() size="35">
              <button class="btn btn-default" (click)="addSubject(query)">Add Subject</button>
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

 
constructor(
     private appointmentService: AppointmentService
) {}

 ngOnInit() {
     this.getSubjects()
 }

 getSubjects() {
        this.appointmentService.getSubjects()
            .subscribe(
                data => data.forEach(el => {
                    this.subjects.push(el.name)
                })
            )
    }

addSubject(subject) {
    console.log("added subject", subject);
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







}