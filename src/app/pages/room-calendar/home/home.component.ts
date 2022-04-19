import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { Branch } from 'src/app/variables/branch';
import { ToastrService } from 'ngx-toastr';
import { RoomCalendarService } from '../room-calendar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Room } from 'src/app/variables/room';
import { RoomDate } from 'src/app/variables/room-date';


@Component({
  selector: 'room-calendar-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  branches: Branch[] = [];
  selectedHotel = null;
  edit = [];
  moment = moment;
  minDate = { year: Number(moment().format('YYYY')), month: Number(moment().format('MM')), day: Number(moment().format('DD')) };
  startDate = null;
  endDate = null;
  searchStartDate = null;
  searchEndDate = null;
  BBAOne: number;
  BBATwo: number;
  ROAOne: number;
  ROATwo: number;
  saveLoading: boolean = false;
  dates = [];
  rooms: Room[] = [];
  opendRoomIndex = null;
  saveRoomCountLoadingIndex: number = null;


  constructor(private modalService: NgbModal, private service: RoomCalendarService, private toastr: ToastrService) { }
  ngOnInit() {
    console.log(sessionStorage.getItem("token"))
    this.service.listBranch().subscribe(res => {
      this.branches = res;
      let data = {
        start: moment().startOf('month').format('YYYY-MM-DD'),
        end: moment().endOf("month").format('YYYY-MM-DD')
      }
      if (this.branches.length > 0) {
        this.selectedHotel = this.branches[0].id;
      }
    })
  }
  getMaxDate() {
    if (this.startDate) {
      let maxDate = moment(this.startDate.day + '-' + this.startDate.month + '-' + this.startDate.year + '-', 'DD-MM-YYYY').add(2, 'months');
      return { year: Number(maxDate.format('YYYY')), month: Number(maxDate.format('MM')), day: Number(maxDate.format('DD')) };
    } else {
      let maxDate = moment().add(2, 'months');
      return { year: Number(maxDate.format('YYYY')), month: Number(maxDate.format('MM')), day: Number(maxDate.format('DD')) };
    }
  }
  openModal(contentModal, i) {
    this.opendRoomIndex = i;
    this.BBAOne = null;
    this.BBATwo = null;
    this.ROAOne = null;
    this.ROATwo = null;
    this.modalService.open(contentModal, { size: 'lg' });
  }
  buttonRightClick(room) {
    if (moment(room.endDate) < this.searchEndDate) {
      room.startDate = moment(room.startDate).add(1, 'days');
      room.endDate = moment(room.endDate).add(1, 'days');
    }
  };
  buttonLeftClick(room) {
    if (moment(room.startDate) > this.searchStartDate) {
      room.startDate = moment(room.startDate).subtract(1, 'days');
      room.endDate = moment(room.endDate).subtract(1, 'days');
    }
  };
  search(branch, startDate, endDate) {
    console.log("token", sessionStorage.getItem('token'))
    if (!branch) {
      this.toastr.error("Branch Not selected");
    } else if (!startDate) {
      this.toastr.error("Start Date Not selected");
    } else if (!endDate) {
      this.toastr.error("End Date Not selected");
    }
    // else if ((startDate.day == endDate.day) && (startDate.month == endDate.month) && (startDate.year == endDate.year)) {
    //   this.toastr.error("Start and End date is same");
    // }
    else {
      this.service.getRoomAvailability({
        start: moment(startDate.day + '-' + startDate.month + '-' + startDate.year + '-', 'DD-MM-YYYY').format('YYYY-MM-DD'),
        end: moment(endDate.day + '-' + endDate.month + '-' + endDate.year + '-', 'DD-MM-YYYY').format('YYYY-MM-DD')
      }, branch).subscribe(res => {
        console.log("search", res)

        this.rooms = res;
        this.rooms.map(room => {
          room.startDate = moment(startDate.day + '-' + startDate.month + '-' + startDate.year + '-', 'DD-MM-YYYY');
          if (moment(endDate.day + '-' + endDate.month + '-' + endDate.year + '-', 'DD-MM-YYYY') >= moment().add(10, 'days')) {
            room.endDate = moment().add(10, 'days');
          } else {
            room.endDate = moment(endDate.day + '-' + endDate.month + '-' + endDate.year + '-', 'DD-MM-YYYY');
          }
        })
        // for (var i = 0; i < this.rooms.length; i++) {
        //   for (var j = 0; j < this.rooms[i].roomCount[j].length; j++) {

        //   }
        // }
      })
      this.dates = [];
      let currDate = moment(startDate.day + '-' + startDate.month + '-' + startDate.year + '-', 'DD-MM-YYYY').startOf('day');
      let lastDate = moment(endDate.day + '-' + endDate.month + '-' + endDate.year + '-', 'DD-MM-YYYY').startOf('day');
      this.dates.push(currDate.clone().toDate());
      while (currDate.add(1, 'days').diff(lastDate) < 0) {
        this.dates.push(currDate.clone().toDate());
      }
      this.searchStartDate = moment(startDate.day + '-' + startDate.month + '-' + startDate.year + '-', 'DD-MM-YYYY');
      this.searchEndDate = moment(endDate.day + '-' + endDate.month + '-' + endDate.year + '-', 'DD-MM-YYYY');
      this.dates.push(lastDate.clone().toDate());
    }
  }

  getRoomToSell(index, id, roomCount, room) {
    // console.log(index, id, roomCount)
    let finalCount = roomCount
    // console.log(room, room.roomDate[this.getRoomDate(moment(room.startDate).add(7, 'days'), room)])
    if (this.rooms)
      for (var i = 0; i < this.rooms.length; i++) {
        for (var j = 0; j < this.rooms[i].roomCount.length; j++) {
          if (this.rooms[i].roomCount[j].date == moment(room.startDate).add(index, 'days').format('YYYY-MM-DD') && (id == this.rooms[i].roomCount[j].roomId)) {
            if (this.rooms[i].roomCount[j].count != null) {
              console.log(this.rooms[i].roomCount[j].count)
              finalCount = this.rooms[i].roomCount[j].count
            }
          }
        }
      }
    return finalCount
  }

  getColSpan() {
    let col = []
    this.dates.map(d => {
      if (col.length > 0) {
        let count = 0;
        col.map((c, i) => {
          if (c.name == moment(d).format('MMM YYYY')) {
            col[i].colspan += 1;
            count += 1;
          }
        });
        if (count == 0) {
          col.push({
            name: moment(d).format('MMM YYYY'),
            colspan: 1
          });
        }
      } else {
        col.push({
          name: moment(d).format('MMM YYYY'),
          colspan: 1
        });
      }
    });
    return col;
  }
  getRoomDate(d, room) {
    let indx = null;
    let rmId = null;
    this.rooms.map((rm, k) => {
      if (rm.id == room.id) {
        rmId = k;
      }
    })
    room.roomDate.map((rm, i) => {
      if (rm.date == moment(d).format('YYYY-MM-DD')) {
        indx = i;
      }
    });

    if (indx == null) {
      this.rooms[rmId].roomDate.push(new RoomDate(null, null, null, null, 0, moment(d).format('YYYY-MM-DD'), this.rooms[rmId].id, null));
      indx = this.rooms[rmId].roomDate.length - 1;
    }
    return indx;
  }

  updatePrice(i) {
    this.saveLoading = true;
    this.edit[i] = false;
    let create = [];
    let update = [];
    this.rooms[i].roomDate.map(roomDate => {
      if (roomDate.id) {
        update.push(roomDate);
      } else {
        if (roomDate.BBAOne) {
          create.push(roomDate);
        }
      }
    })
    this.service.updateRoomPricing({
      create: create,
      update: update
    }).subscribe(res => {
      this.toastr.success(res.message);
      this.search(this.selectedHotel, this.startDate, this.endDate);
      this.saveLoading = false;
    }, err => {
      this.toastr.error(err.message);
    })
  }
  pricingBulkUpdate(i) {
    
    this.saveLoading = true;
    this.edit[i] = false;
    let create = [];
    let update = [];
    // console.log("this.rooms[i].roomDate.length",this.rooms[i].roomDate.length);//how many days
    // console.log("this.rooms[i]",this.rooms[i]);
    console.log("this.rooms[i].roomDate",this.rooms[i].roomDate);
    // console.log("this.rooms[i].roomDate[this.rooms[i].roomDate.length - 1].date",this.rooms[i].roomDate[this.rooms[i].roomDate.length - 1].date);
    // console.log("this.rooms[i].roomDate[this.rooms[i].roomDate.length - 1]",this.rooms[i].roomDate[this.rooms[i].roomDate.length - 1]);
    // console.log("\n");
    // console.log("\nthis.endDate",this.endDate);
    // console.log("\nthis.startDate",this.startDate);
    // // cl
    // console.log("\nmoment(this.rooms[i].roomDate[this.rooms[i].roomDate.length - 1].date, 'YYYY-MM-DD')",moment(this.rooms[i].roomDate[this.rooms[i].roomDate.length - 1].date, 'YYYY-MM-DD'));
    
   
    // console.log(moment(this.rooms[i].roomDate[this.rooms[i].roomDate.length - 1].date, 'YYYY-MM-DD') , moment(this.endDate.day + '-' + this.endDate.month + '-' + this.endDate.year + '-', 'DD-MM-YYYY'))
    // console.log("entering if",(moment(this.rooms[i].roomDate[this.rooms[i].roomDate.length - 1].date, 'YYYY-MM-DD')) ,"<",moment(this.endDate.day + '-' + this.endDate.month + '-' + this.endDate.year + '-', 'DD-MM-YYYY') ,"  ",(moment(this.rooms[i].roomDate[this.rooms[i].roomDate.length - 1].date, 'YYYY-MM-DD') < moment(this.endDate.day + '-' + this.endDate.month + '-' + this.endDate.year + '-', 'DD-MM-YYYY')) )
    // console.log("start date ",moment(this.startDate.day + '-' + this.startDate.month + '-' + this.startDate.year + '-', 'DD-MM-YYYY')," < end date",moment(this.endDate.day + '-' + this.endDate.month + '-' + this.endDate.year + '-', 'DD-MM-YYYY'))
    if (moment(this.startDate.day + '-' + this.startDate.month + '-' + this.startDate.year + '-', 'DD-MM-YYYY') < moment(this.endDate.day + '-' + this.endDate.month + '-' + this.endDate.year + '-', 'DD-MM-YYYY')) {

      // console.log("\n\ninside if looking for for loop")
      // console.log("end date ",moment(this.endDate.day + '-' + this.endDate.month + '-' + this.endDate.year,'DD-MM-YYYY').format('YYYY-MM-DD'))
      // console.log("end date +1",moment(this.endDate.day + '-' + this.endDate.month + '-' + this.endDate.year,'DD-MM-YYYY').add(1,'d').format("YYYY-MM-DD"))

      // console.log("end date ",moment(new Date()).format('YYYY-MM-DD'))

      // console.log("end date +1 ",moment(new Date()).add(1, 'd').format('YYYY-MM-DD'))

      var a = moment( this.startDate.day + '-' + this.startDate.month + '-' + this.startDate.year, "DD-MM-YYYY" );
      var b = moment( this.endDate.day + '-' + this.endDate.month + '-' + this.endDate.year, "DD-MM-YYYY" );
      console.log(a, b)
      for (var m = moment(a); m.diff(b, 'days') <= 0; m.add(1, 'days')) {
        console.log(m.format('YYYY-MM-DD'));
        let index = m
        // for(var x=0; x< this.rooms[i].roomDate.length; x++) {
        //   console.log("checking with api date : ",this.rooms[i].roomDate[x].date, index.format('DD-MM-YYYY'))
        // }
        
        if(this.rooms[i].roomDate.filter(item=>  (item.date) == index.format('YYYY-MM-DD')).length == 0 ) {
          console.log("create new entry in room : ",index)
          this.rooms[i].roomDate.push(new RoomDate(this.BBAOne, this.BBATwo, this.ROAOne, this.ROATwo, 0, index.format('YYYY-MM-DD'), this.rooms[i].id, null))
        } else {
           for(var x=0; x< this.rooms[i].roomDate.length; x++) {
            this.rooms[i].roomDate[x].BBAOne = this.BBAOne;
            this.rooms[i].roomDate[x].BBATwo = this.BBATwo;
            this.rooms[i].roomDate[x].ROAOne = this.ROAOne;
            this.rooms[i].roomDate[x].ROATwo = this.ROATwo;
        }
        }
      }

      
      // for (let index = moment( this.startDate.day + '-' + this.startDate.month + '-' + this.startDate.year + '-', 'DD-MM-YYYY').format('DD-MM-YYYY'); index <= moment(this.endDate.day + '-' + this.endDate.month + '-' + this.endDate.year + '-', 'DD-MM-YYYY').format('DD-MM-YYYY'); index = moment(index).add(1, 'days').format('DD-MM-YYYY')) {
      //   console.log("inside for condition ",index," <=", moment(this.endDate.day + '-' + this.endDate.month + '-' + this.endDate.year + '-', 'DD-MM-YYYY').format('DD-MM-YYYY'))
      //   // console.log(index <= moment(this.endDate.day + '-' + this.endDate.month + '-' + this.endDate.year + '-', 'DD-MM-YYYY'))
      //   // console.log(this.rooms[i].roomDate.filter(item=> moment(item.date) == index).length)
      //   for(var x=0; x< this.rooms[i].roomDate.length; x++) {
      //     console.log("checking with api date : ",this.rooms[i].roomDate[x].date, index)
      //   }
        
      //   if(this.rooms[i].roomDate.filter(item=>  (item.date) == index).length == 0 ) {
      //     console.log("create new entry in room : ",index)
      //     this.rooms[i].roomDate.push(new RoomDate(this.BBAOne, this.BBATwo, this.ROAOne, this.ROATwo, 0, index, this.rooms[i].id, null))
      //   } 
      // }
      console.log("exited for")
    }
     

    console.log(this.rooms[i].roomDate)


    this.rooms[i].roomDate.map((roomDate, j) => {
      if (roomDate.id) {
        update.push(roomDate);
      } else {
        if (roomDate.BBAOne) {
          create.push(roomDate);
        }
      }
    })


    console.log("create ",create,"\n Update", update)
    this.saveLoading = false;


    // return

    this.service.updateRoomPricing({
      create: create,
      update: update
    }).subscribe(res => {
      this.search(this.selectedHotel, this.startDate, this.endDate);
      this.BBAOne = null;
      this.BBATwo = null;
      this.ROAOne = null;
      this.ROATwo = null;
      this.opendRoomIndex = null;
      this.saveLoading = false;
      this.toastr.success(res.message);
      this.modalService.dismissAll();
    }, err => {
      this.toastr.error(err.message);
    })
  }

  updateRoomCountWithDate(i) {
    console.log(this.rooms[i].count, this.rooms[i].roomCountStartDate, this.rooms[i].roomCountEndDate)

    if (this.rooms[i].count < 0) {
      console.log(this.rooms[i].count)
      this.toastr.error("Count should not be negative")
      return
    }
    if (!this.rooms[i].roomCountStartDate) {
      this.toastr.error("Please choose a start date")
      return
    }
    if (!this.rooms[i].roomCountEndDate) {
      this.toastr.error("Please choose a end date")
      return
    }
    console.log(this.rooms[i].roomCountEndDate.year)

    // if (!(moment((this.rooms[i].roomCountEndDate.year + "-" + this.rooms[i].roomCountEndDate.month + "-" + this.rooms[i].roomCountEndDate.day)).isSameOrAfter(((this.rooms[i].roomCountStartDate.year + "-" + this.rooms[i].roomCountStartDate.month + "-" + this.rooms[i].roomCountStartDate.day)), 'day'))) {
    //   this.toastr.error("End date should be after start date")
    //   return
    // }

    if (moment(this.rooms[i].roomCountStartDate).toDate() > moment(this.rooms[i].roomCountEndDate).toDate()) {
      this.toastr.error("End date should be after start date")
      return
    }

    let create = [];

    var a = moment(this.rooms[i].roomCountStartDate.year + "-" + this.rooms[i].roomCountStartDate.month + "-" + this.rooms[i].roomCountStartDate.day);
    var b = moment(this.rooms[i].roomCountEndDate.year + "-" + this.rooms[i].roomCountEndDate.month + "-" + this.rooms[i].roomCountEndDate.day);

    for (var m = moment(a); m.diff(b, 'days') <= 0; m.add(1, 'days')) {
      console.log(m.format('YYYY-MM-DD'));
      create.push({
        roomId: this.rooms[i].id,
        date: m.format('YYYY-MM-DD'),
        count: this.rooms[i].count
      })
    }

    console.log(create)

    this.service.updateRoomCountWithDate(create).subscribe(res => {
      console.log(res)
      this.toastr.success('Room Count Updated')
      this.search(this.selectedHotel, this.startDate, this.endDate)
    }, err => {
      this.toastr.error(err.message);
    })
  }

  validateExpiry(event) {
    const pattern = /[-/.]/;
    
    if (pattern.test(event.key)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  updateRoomCount(i) {
    this.saveRoomCountLoadingIndex = i;
    let data = {
      count: this.rooms[i].count,
    }
    this.service.updateRoomCount(this.rooms[i].id, data).subscribe(res => {
      this.search(this.selectedHotel, this.startDate, this.endDate);
      this.saveRoomCountLoadingIndex = null;
      this.toastr.success('Room Count Updated')
    }, err => {
      this.toastr.error(err.message);
    })
  }
}