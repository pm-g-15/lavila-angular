import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BookingRoom } from 'src/app/variables/booking-room';
import { Booking } from 'src/app/variables/booking';
import {getFinalGrandTotalGlobal, getAppliedLoyaltyGlobal} from '../../../../Functions.js'


@Component({
  selector: 'booking-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  booking:Booking = null;
  cancellationReason:string;
  cancellationAmount:number;
  checkoutDate;
  checkOutPrice;
  moment = moment;
  cancellationLoading:boolean = false;
  checkOutLoading:boolean = false;
  moveToNoShowLoading:boolean = false;
  markAsInvalidLoading:boolean = false;
  minDate = {
    year: null,
    month: null,
    day: null
  }
  constructor(private modalService: NgbModal,private service:BookingService,private route:ActivatedRoute,private toastr:ToastrService) { }

  ngOnInit() {
    this.service.getBooking(this.route.snapshot.paramMap.get("id")).subscribe(res=>{
      console.log(res)
      this.booking = res;
      this.checkOutLoading = false;
      this.moveToNoShowLoading = false;
      this.markAsInvalidLoading = false;
      this.checkOutPrice = this.booking.finalPrice;
      this.minDate.day = Number(moment(this.booking.checkIn,'YYYY-MM-DD').format('DD'));
    this.minDate.month = Number(moment(this.booking.checkIn,'YYYY-MM-DD').format('MM'));
    this.minDate.year = Number(moment(this.booking.checkIn,'YYYY-MM-DD').format('YYYY'));
    })
  }
  openModal(contentModal){
    this.modalService.open(contentModal, { size: 'lg' });
  }

  cancelBooking(modal){
    this.openModal(modal)
  }

  submitCancelBooking(){
    if(!this.cancellationReason){
      this.toastr.error("Please provide a cancellation reason!");
      return
    }
    this.cancellationLoading = true;
    let emailArray = [];
    var bookingDetails = this.booking;

    let data = {
      date:moment().format('YYYY-MM-DD'),
      balanceAmount:this.booking.finalPrice,
      note:this.cancellationReason,
      // note:"Cancel",
      bookingId:this.route.snapshot.paramMap.get('id'),
      userId:this.booking.userId,
      data: this.booking,
      cancelledBy: 'admin'
    }
    console.log(data.note)
    this.service.cancelBooking(data).subscribe(res=>{
      console.log(res)
      this.toastr.success("Cancellation Completed");
      this.modalService.dismissAll();
      this.service.getBooking(this.route.snapshot.paramMap.get("id")).subscribe(res=>{
        this.booking = res;
        this.cancellationLoading = false;
      })
    },err=>{
      console.log(err)
      this.toastr.error("Cancellation faild");
    })
  }


  getSubTotal(room:BookingRoom){
    let total = 0;
    total += room.BBAOneCount*room.BBAOnePrice;
    total += room.BBATwoCount*room.BBATwoPrice;
    total += room.ROAOneCount*room.ROAOnePrice;
    total += room.ROATwoCount*room.ROATwoPrice;
    room.bookingAddon.map(ad=>{
      total += ad.count*ad.price;
    })
    return Number(total.toFixed(2));
  }
  getTotal(room:BookingRoom){
    let total = 0;
    total += this.getSubTotal(room);
    room.bookingOffer.map(offer=>{
      total = total- (total*offer.offerPercent)/100;
    })
    return Number(total.toFixed(2));
  }
  getGrandTotal(){
    let total = 0;
    this.booking.bookingRoom.map(rm=>{
      total += this.getTotal(rm);
    })
    return Number(total.toFixed(2));
  }

  getAppliedLoyalty(loyalty) {
    return getAppliedLoyaltyGlobal(loyalty, this.getGrandTotal())
  }

  getFinalGrandTotal(){
    return getFinalGrandTotalGlobal(this.booking, this.getGrandTotal())

    
    // if(this.booking.bookingLoyalty && this.booking.bookingLoyalty.loyaltyValue){
    //   if(this.booking.bookingPromoCode && this.booking.bookingPromoCode.discountPercent){
    //     return (this.getGrandTotal()-((this.getGrandTotal()*this.booking.bookingPromoCode.discountPercent)/100))-(this.booking.bookingLoyalty.usedPoint*(1/this.booking.bookingLoyalty.loyaltyValue));
    //   }else{
    //     return (this.getGrandTotal())-(this.booking.bookingLoyalty.usedPoint*(1/this.booking.bookingLoyalty.loyaltyValue));
    //   }

    // }else{
    //   if(this.booking.bookingPromoCode && this.booking.bookingPromoCode.discountPercent){
    //     return (this.getGrandTotal()-((this.getGrandTotal()*this.booking.bookingPromoCode.discountPercent)/100));
    //   }else{
    //     return this.getGrandTotal();
    //   }
    // }
  }
  checkout(){
    this.checkOutLoading = true;
    this.service.checkOut({bookingId:this.booking.id,date:moment((this.checkoutDate.day+"-"+this.checkoutDate.month+"-"+this.checkoutDate.year),'DD-MM-YYYY').format('YYYY-MM-DD'),amount:this.checkOutPrice}).subscribe(res=>{
      console.log(res);
      this.modalService.dismissAll();
      this.checkOutLoading = false;
      this.toastr.success("Booking Updated");
      this.ngOnInit();
    },err=>{
      this.toastr.error("Booking Checkout failed");
      this.checkOutLoading = false;
      this.modalService.dismissAll();
      this.ngOnInit();
    });
  }
  moveToNoShow(){
    this.moveToNoShowLoading = true;
    this.service.moveToNoShow(this.booking.id,this.cancellationAmount).subscribe(res=>{
      this.modalService.dismissAll();
      this.toastr.success("Status Updated");
      this.ngOnInit();
    });
  }
  markAsInvalid(){
    this.markAsInvalidLoading = true;
    this.service.markAsInvalid(this.booking.id).subscribe(res=>{
      // console.log(res)
      this.toastr.success("Status Updated");
      this.ngOnInit();
    });
  }
  print(){
    window.print()
  }
}
