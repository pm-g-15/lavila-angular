import { Component, OnInit } from '@angular/core';
import { OffersService } from '../offers.service';
import { Offer } from 'src/app/variables/offer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'offers-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  offers:Offer;
  offersForm:FormGroup;
  saveLoading:boolean = false;
  rooms = [];
  minDate = {
    year: null,
    month: null,
    day: null
  }
  constructor(private service:OffersService,private toastr:ToastrService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {  
    this.offers = new Offer(); 
    this.service.getRooms().subscribe(res=>{
      this.rooms = res;
    }) 
    this.service.getOffer(this.route.snapshot.paramMap.get('id')).subscribe(res=>{
      this.offers.offerPercent = res.offerPercent;
      this.offers.roomId = res.roomId;
      this.offers.status = res.status;
      this.offersForm = new FormGroup({
        'offerPercent': new FormControl(this.offers.offerPercent, Validators.required),
        'roomId': new FormControl(this.offers.roomId),
        'status': new FormControl(this.offers.status, Validators.required)
      }) 
    })
    
  }
  updateOffer(offerData){
    this.saveLoading = true;
    this.service.updateOffer(offerData,this.route.snapshot.paramMap.get('id')).subscribe(res=>{
      console.log(res);
      this.toastr.success("Update Successfully!!!");
      this.saveLoading = false;
      this.router.navigate(['/offers']);
    },err=>{
      this.toastr.error(err); 
    })
  }
}