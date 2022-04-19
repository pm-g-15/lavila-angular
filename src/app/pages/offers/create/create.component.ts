import { Component, OnInit } from '@angular/core';
import { OffersService } from '../offers.service';
import { Offer } from 'src/app/variables/offer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'offers-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  offers:Offer;
  offersForm:FormGroup;
  saveLoading:boolean = false;
  rooms = [];
  minDate = {
    year: null,
    month: null,
    day: null
  }
  constructor(private service:OffersService,private toastr:ToastrService,private router:Router) { }

  ngOnInit() {  
    this.offers = new Offer(); 
    this.service.getRooms().subscribe(res=>{
      this.rooms = res;
    }) 
    this.offersForm = new FormGroup({
      'offerPercent': new FormControl(this.offers.offerPercent, Validators.required),
      'roomId': new FormControl(this.offers.roomId),
      'status': new FormControl(this.offers.status, Validators.required)
    }) 
  }
  createOffer(offerData){
    this.saveLoading = true;
    this.service.createOffer(offerData).subscribe(res=>{
      console.log(res);
      this.toastr.success("Create Successfully!!!");
      this.saveLoading = false;
      this.router.navigate(['/offers']);
    },err=>{
      this.toastr.error(err); 
    })
  }
}