import { Component, OnInit } from '@angular/core'; 
import { Events } from 'src/app/variables/events';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventsService } from '../events.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {env} from 'src/app/variables/env';

@Component({
  selector: 'events-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit { 
  events:Events;
  eventsForm:FormGroup;
  saveLoading:boolean = false;
  minDate = {
    year: null,
    month: null,
    day: null
  }
  imageUrl = env.apiURL;
  constructor(private service:EventsService,private toastr:ToastrService,private router:Router, private formatter: NgbDateParserFormatter,private route:ActivatedRoute) { }

  ngOnInit() { 
    this.minDate.day = Number(moment().add(1, 'day').format('DD'));
    this.minDate.month = Number(moment().add(1, 'day').format('MM'));
    this.minDate.year = Number(moment().add(1, 'day').format('YYYY'));
    this.events = new Events();  
    this.service.getEvent(this.route.snapshot.paramMap.get('id')).subscribe(res=>{
      this.events.date = {
        day: Number(moment(res.date, 'YYYY-MM-DD').format('DD')),
        month:Number( moment(res.date, 'YYYY-MM-DD').format('MM')),
        year: Number(moment(res.date, 'YYYY-MM-DD').format('YYYY'))
      };
      this.events.description = res.description;
      this.events.descriptionAr = res.descriptionAr;
      this.events.featured = res.featured;
      this.events.id = res.id;
      this.events.image = res.image;
      this.events.name = res.name;
      this.events.nameAr = res.nameAr;
      this.eventsForm = new FormGroup({
        'name': new FormControl(this.events.name, Validators.required),
        'nameAr': new FormControl(this.events.nameAr),
        'description': new FormControl(this.events.description, Validators.required),
        'descriptionAr': new FormControl(this.events.descriptionAr),
        'image': new FormControl(this.events.image, Validators.required),
        'eventImage': new FormControl(this.events.eventImage),
        'date': new FormControl(this.events.date, Validators.required),
        'featured': new FormControl(this.events.featured, Validators.required),
      }) 
    })
    
  }
  changeFile(value) {
    console.log(value);
    this.eventsForm.controls['eventImage'].setValue(value); ;
    
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
  updateEvent(eventData){
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
    this.service.updateEvent(fd,this.route.snapshot.paramMap.get('id')).subscribe(res=>{
      console.log(res);
      this.toastr.success("Update Successfully!!!");
      this.saveLoading = false;
      this.router.navigate(['/events']);
    },err=>{
      this.toastr.error(err); 
    })
  }
}