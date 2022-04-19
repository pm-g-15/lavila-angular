import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Loyalty } from 'src/app/variables/loyalty';
import { LoyaltyService } from './loyalty.service';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DTOptions } from 'src/app/variables/data-table-config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'loyalty-loyalty',
  templateUrl: './loyalty.component.html',
  styleUrls: ['./loyalty.component.scss']
})
export class LoyaltyComponent implements OnInit {
  saveLoading:boolean = false;
  loyaltyForm:FormGroup;
  loyalty:Loyalty;

  
  constructor(private service:LoyaltyService,private toastr:ToastrService) { }

  ngOnInit() {
    this.service.lastLoyalty().subscribe(res=>{
      if(res == null){
        this.loyalty = new Loyalty();
      }else{
        this.loyalty = new Loyalty(null,res.minTotalBookingAmountPassLoyalty,res.oneQAREqualPoint,res.minTotalBookingAmountForUsing,res.minTotalBookingAmountToGetLoyalty);
      }
      
      this.loyaltyForm = new FormGroup({
        'minTotalBookingAmountPassLoyalty': new FormControl(this.loyalty.minTotalBookingAmountPassLoyalty),
        'oneQAREqualPoint': new FormControl(this.loyalty.oneQAREqualPoint, Validators.required),
        'minTotalBookingAmountForUsing': new FormControl(this.loyalty.minTotalBookingAmountForUsing),
        'minTotalBookingAmountToGetLoyalty': new FormControl(this.loyalty.minTotalBookingAmountToGetLoyalty, Validators.required)
      }) 
    })
  }
  submitForm(v) {
    this.saveLoading = true; 
    console.log(v);
    this.service.updateLoyalty(v).subscribe(res=>{
      this.toastr.success("Update Successfully..!!!");
      this.saveLoading = false;
    },err=>{
      console.log(err);
      this.toastr.error("Update Failed, Please try again later..!!!");
      this.saveLoading = false;
    })    
  }
}
