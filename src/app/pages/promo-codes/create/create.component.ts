import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PromoCode } from 'src/app/variables/promo-code';
import { PromoCodesService } from '../promo-codes.service';
import * as moment from "moment";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Branch } from 'src/app/variables/branch';

@Component({
  selector: 'promo-codes-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  promoCodeForm: FormGroup;
  promoCode: PromoCode;
  users = [];
  branches:Branch[] = [];
  minDate = {
    year: null,
    month: null,
    day: null
  }
  saveLoading:boolean = false;
  constructor(private service: PromoCodesService,private router:Router,private toastr:ToastrService) { }

  ngOnInit() {
    this.service.listBranch().subscribe(res=>{
      this.branches = res;
    })
    this.minDate.day = Number(moment().add(1, 'day').format('DD'));
    this.minDate.month = Number(moment().add(1, 'day').format('MM'));
    this.minDate.year = Number(moment().add(1, 'day').format('YYYY'));
    this.promoCode = new PromoCode();
    this.service.getAllNormalUsers().subscribe(res => {
      this.users = res;
      this.promoCodeForm = new FormGroup({
        'code': new FormControl(this.promoCode.code, Validators.required),
        'description': new FormControl(this.promoCode.description, Validators.required),
        'descriptionAr': new FormControl(this.promoCode.description ),
        'discountPercent': new FormControl(this.promoCode.discountPercent, Validators.required),
        'global': new FormControl(this.promoCode.global),
        'expDate': new FormControl(this.promoCode.expDate, Validators.required),
        'status': new FormControl(this.promoCode.status, Validators.required),
        'userIds': new FormControl(this.promoCode.users),
        'branchId': new FormControl(this.promoCode.branchId)
      })
    })
  }
  submitForm(v) {
    this.saveLoading = true; 
    v.expDate = String(v.expDate.year).padStart(4, '0')+'-'+String(v.expDate.month).padStart(2, '0')+'-'+String(v.expDate.day).padStart(2, '0')
    console.log(v);
    this.service.createPromoCode(v).subscribe(res=>{
      this.toastr.success("Create Successfully..!!!");
      this.saveLoading = false;
      this.router.navigate(['promo-codes']);
    },err=>{
      this.toastr.error("Create Failed, Please try again later..!!!");
      this.saveLoading = false;
    })    
  }
}