import { Component, OnInit } from '@angular/core'; 
import { Events } from 'src/app/variables/events';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventsService } from '../events.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'events-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit { 
  events:Events;
  eventsForm:FormGroup;
  saveLoading:boolean = false;
  minDate = {
    year: null,
    month: null,
    day: null
  }
  constructor(private service:EventsService,private toastr:ToastrService,private router:Router, private formatter: NgbDateParserFormatter) { }

  ngOnInit() { 
    this.minDate.day = Number(moment().add(1, 'day').format('DD'));
    this.minDate.month = Number(moment().add(1, 'day').format('MM'));
    this.minDate.year = Number(moment().add(1, 'day').format('YYYY'));
    this.events = new Events();  
    this.eventsForm = new FormGroup({
      'name': new FormControl(this.events.name, Validators.required),
      'nameAr': new FormControl(this.events.nameAr),
      'description': new FormControl(this.events.description, Validators.required),
      'descriptionAr': new FormControl(this.events.descriptionAr),
      'image': new FormControl(this.events.image, Validators.required),
      'eventImage': new FormControl(this.events.eventImage ),
      'date': new FormControl(this.events.date, Validators.required),
      'featured': new FormControl(this.events.featured, Validators.required),
    }) 
  }
  changeFile(value) {
    console.log(value);
    this.eventsForm.controls['eventImage'].setValue(value);
    
    this.readURL(value);
  }
  readURL(input) {
    let that = this;
    if (input) {
      let reader = new FileReader();

      reader.onload = function (e) {
        that.eventsForm.controls['image'].setValue(e.target['result']);
      }

      reader.readAsDataURL(input);
    }
  }
  createEvent(eventData){
    this.saveLoading = true; 
    eventData.date = this.formatter.format(eventData.date);
    const fd = new FormData();
    if( eventData.eventImage != null){
      fd.append('eventImage', eventData.eventImage, eventData.eventImage.name);
    }else{
      fd.append('eventImage', null);
    }
    
    fd.append('name',eventData.name);
    fd.append('nameAr',eventData.nameAr);
    fd.append('description',eventData.description);
    fd.append('descriptionAr',eventData.descriptionAr);
    fd.append('date',eventData.date); 
    fd.append('featured',eventData.featured); 
    this.service.createEvent(fd).subscribe(res=>{
      console.log(res);
      this.toastr.success("Create Successfully!!!");
      this.saveLoading = false;
      this.router.navigate(['/events']);
    },err=>{
      this.toastr.error(err); 
    })
  }
}