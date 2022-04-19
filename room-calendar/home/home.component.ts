import { Component, OnInit } from '@angular/core'; 
import * as moment from "moment";  
import { Branch } from 'src/app/variables/branch';
import { ToastrService } from 'ngx-toastr';
import { RoomCalendarService } from '../room-calendar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'room-calendar-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit { 
  branches:Branch[] = [];
  selectedHotel; 
  edit = []; 
  moment = moment;
  minDate = {
    year:moment().format('YYYY'),month:moment().format('MM'),day:moment().format('DD')
  } 
  startDate = null;
  endDate = null; 
  BBAOne:number;
  BBATwo:number;
  ROAOne:number;
  ROATwo:number;
  saveLoading:boolean = false;
  dates = [];
  rooms = [];
  opendRoomIndex = null;
  constructor( private modalService: NgbModal,private service: RoomCalendarService, private toastr:ToastrService) { }
  ngOnInit() {
    this.service.listBranch().subscribe(res => {
      this.branches = res;
      let data = {
        start: moment().startOf('month').format('YYYY-MM-DD'),
        end: moment().endOf("month").format('YYYY-MM-DD')
      }
      this.selectedHotel = this.branches[0].id; 
    })
  }  
  openModal(contentModal,i) {
    this.opendRoomIndex = i;
    this.modalService.open(contentModal, { size: 'lg' });
  }
  buttonRightClick(container) {
    container.scrollTo({ 
      left: (container.scrollLeft+150),
      behavior: 'smooth'
    });
  };
  buttonLeftClick(container) {
    container.scrollTo({ 
      left: (container.scrollLeft-150),
      behavior: 'smooth'
    });
  };
  search(branch,startDate, endDate) {
    if(!branch){
      this.toastr.error("Branch Not selected");
    }else if(!startDate){
      this.toastr.error("Start Date Not selected");
    }else if(!endDate){
      this.toastr.error("End Date Not selected");
    }else if((startDate.day == endDate.day)&&(startDate.month == endDate.month)&&(startDate.year == endDate.year)){
      this.toastr.error("Start and End date is same");
    }else{
      this.service.getRoomAvailability({
        start:moment(startDate.day+'-'+startDate.month+'-'+startDate.year+'-','DD-MM-YYYY').format('YYYY-MM-DD'),
        end:moment(endDate.day+'-'+endDate.month+'-'+endDate.year+'-','DD-MM-YYYY').format('YYYY-MM-DD')
      },branch).subscribe(res=>{
        this.rooms = res;
      })
      this.dates = [];
      let currDate = moment(startDate.day+'-'+startDate.month+'-'+startDate.year+'-','DD-MM-YYYY').startOf('day');
      let lastDate = moment(endDate.day+'-'+endDate.month+'-'+endDate.year+'-','DD-MM-YYYY').startOf('day');
      this.dates.push(currDate.clone().toDate());
      while(currDate.add(1, 'days').diff(lastDate) < 0) { 
        this.dates.push(currDate.clone().toDate());
      }
      this.dates.push(lastDate.clone().toDate());
    }
  }
  getColSpan(){
    let col = []
    this.dates.map(d=>{
      if(col.length > 0){
        let count = 0;
        col.map((c,i)=>{
          if(c.name == moment(d).format('MMM YYYY')){
            col[i].colspan += 1;
            count += 1;
          }
        });
        if(count == 0){
          col.push({ 
            name:moment(d).format('MMM YYYY'),
            colspan:1
          });
        }
      }else{
        col.push({ 
          name:moment(d).format('MMM YYYY'),
          colspan:1
        });
      }
    });
    return col;
  }
  getRoomDate(d,room){
    let indx = null;
    room.roomDate.map((rm,i)=>{
      if(rm.date == moment(d).format('YYYY-MM-DD')){
        indx = i;
      }
    });
    return indx;
  }
  updatePrice(i){
    this.edit[i] = false;
    console.log(this.rooms[i].roomDate)
    this.service.updateRoomPricing(this.rooms[i].roomDate).subscribe(res=>{
      console.log(res);
      this.toastr.success(res.message);
    },err=>{
      this.toastr.error(err.message);
    })
  }
  pricingBulkUpdate(i){
    this.edit[i] = false;
    console.log(this.rooms[i].roomDate)
    this.service.roomPricingBulkUpdate({
      dates:this.rooms[i].roomDate,
      BBAOne:this.BBAOne,
      BBATwo:this.BBATwo,
      ROAOne:this.ROAOne,
      ROATwo:this.ROATwo,
    }).subscribe(res=>{
      console.log(res);
      this.BBAOne = null;
      this.BBATwo = null;
      this.ROAOne = null;
      this.ROATwo = null;
      this.search(this.selectedHotel,this.startDate,this.endDate);
      this.modalService.dismissAll();
      this.toastr.success(res.message);
    },err=>{
      this.toastr.error(err.message);
    })
  }
}