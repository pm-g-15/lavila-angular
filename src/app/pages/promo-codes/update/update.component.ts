import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PromoCode } from 'src/app/variables/promo-code';
import { PromoCodesService } from '../promo-codes.service';
import * as moment from "moment";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Branch } from 'src/app/variables/branch';

@Component({
  selector: 'promo-codes-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  promoCodeForm: FormGroup;
  promoCode: PromoCode;
  users = [];
  branches:Branch[] = [];

  minDate = {
    year: null,
    month: null,
    day: null
  }
  saveLoading: boolean = false;
  constructor(private service: PromoCodesService, private router: Router, private toastr: ToastrService, private route: ActivatedRoute, public formatter: NgbDateParserFormatter) { }

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
    })
    this.service.getPromoCode(this.route.snapshot.paramMap.get('id')).subscribe(pCRes => {
      this.promoCode.code = pCRes.code;
      this.promoCode.description = pCRes.description;
      this.promoCode.descriptionAr = pCRes.descriptionAr;
      this.promoCode.discountPercent = pCRes.discountPercent;
      this.promoCode.branchId = pCRes.branchId;
      this.promoCode.expDate = {
        day: Number(moment(pCRes.expDate, 'YYYY-MM-DD').format('DD')),
        month:Number( moment(pCRes.expDate, 'YYYY-MM-DD').format('MM')),
        year: Number(moment(pCRes.expDate, 'YYYY-MM-DD').format('YYYY'))
      };
      this.promoCode.global = pCRes.global;
      this.promoCode.status = pCRes.status;
      console.log(this.promoCode);
        pCRes.users.map(u => {
          this.promoCode.users.push(String(u.id));
        })
       
      this.promoCodeForm = new FormGroup({
        'code': new FormControl(this.promoCode.code, Validators.required),
        'description': new FormControl(this.promoCode.description, Validators.required),
        'descriptionAr': new FormControl(this.promoCode.descriptionAr),
        'discountPercent': new FormControl(this.promoCode.discountPercent, Validators.required),
        'global': new FormControl(this.promoCode.global),
        'expDate': new FormControl(this.promoCode.expDate, Validators.required),
        'status': new FormControl(((this.promoCode.status)?'1':'0'), Validators.required),
        'userIds': new FormControl(this.promoCode.users),
        'branchId': new FormControl(this.promoCode.branchId)
      })
    })

  }
  submitForm(v) {
    this.saveLoading = true;
    v.expDate = String(v.expDate.year).padStart(4, '0') + '-' + String(v.expDate.month).padStart(2, '0') + '-' + String(v.expDate.day).padStart(2, '0')
    console.log(v);
    if(!v.global){
      if(v.userIds.length == 0){
        this.toastr.error('Please choose Users or set as global');
      }else{
        this.service.updatePromoCode(v,this.route.snapshot.paramMap.get('id')).subscribe(res => {
          this.toastr.success("Update Successfully..!!!");
          this.saveLoading = false;
          this.router.navigate(['promo-codes']);
        }, err => {
          this.toastr.error("Update Failed, Please try again later..!!!");
          this.saveLoading = false;
        })
      }
    }else{
      this.service.updatePromoCode(v,this.route.snapshot.paramMap.get('id')).subscribe(res => {
        this.toastr.success("Update Successfully..!!!");
        this.saveLoading = false;
        this.router.navigate(['promo-codes']);
      }, err => {
        this.toastr.error("Update Failed, Please try again later..!!!");
        this.saveLoading = false;
      })
    }
  }

}
