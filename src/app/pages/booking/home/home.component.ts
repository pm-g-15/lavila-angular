import { Component, OnInit, ViewChild } from "@angular/core";
import { BookingService } from "../booking.service";
import * as moment from "moment";
import { Subject } from "rxjs";
import { DTOptions } from "src/app/variables/data-table-config";
import { Branch } from "src/app/variables/branch";
import { DataTableDirective } from "angular-datatables";
import { Daterangepicker } from "ng2-daterangepicker";
import { NgbCalendar, NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup } from "@angular/forms";
@Component({
  selector: "booking-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  styles: [
    `
      // .custom-day {
      //   text-align: center;
      //   padding: 0.185rem 0.25rem;
      //   display: inline-block;
      //   height: 2rem;
      //   width: 2rem;
      // }
      // .custom-day.focused {
      //   background-color: #e6e6e6;
      // }
      // .custom-day.range,
      // .custom-day:hover {
      //   background-color: rgb(2, 117, 216);
      //   color: white;
      // }
      // .custom-day.faded {
      //   background-color: rgba(2, 117, 216, 0.5);
      // }
    `,
  ],
})
export class HomeComponent implements OnInit {
  cBDtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  myDateForm: FormGroup;
  cBDtTrigger: Subject<any> = new Subject();
  allBooking = [];
  moment = moment;
  branches: Branch[] = [];
  checkInNew = {
    from: "",
    to: "",
  };
  allBookingSearch = {
    branch: "",
    checkIn: {
      from: "2021-03-17",
      to: "2021-03-17",
    },
    checkOut: null,
    fName: null,
    booking: null,
    status: "",
  };
  public daterange: any = {
    start: Date.now(),
    end: Date.now(),
    label: "",
  };
  // @ViewChild(DatepickerModule)
  private picker: Daterangepicker;
  hoveredDate: NgbDate | null = null;
  isSelectDate: boolean = false;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  public options: any = {
    locale: { format: "YYYY-MM-DD" },
    alwaysShowCalendars: false,
  };
  dateArray = [];

  constructor(private service: BookingService, private calendar: NgbCalendar) {}

  ngOnInit() {
    let that = this;
    this.service.listBranch().subscribe((res) => {
      this.branches = res;
    });
    let NewcheckIn = {
      from: this.fromDate,
      to: this.toDate,
    };
    console.log(this.dateArray, "NGONINIT");

    console.log(NewcheckIn, "NewcheckInNewcheckIn");
    this.cBDtOptions = {
      ...DTOptions,
      serverSide: true,
      search: false,
      searching: false,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters["branch"] = this.allBookingSearch.branch;
        dataTablesParameters["checkIn"] = this.checkInNew;
        dataTablesParameters["checkOut"] = this.allBookingSearch.checkOut;
        dataTablesParameters["fName"] = this.allBookingSearch.fName;
        dataTablesParameters["booking"] = this.allBookingSearch.booking;
        dataTablesParameters["status"] = this.allBookingSearch.status;
        this.service
          .getAllBooking(dataTablesParameters)
          .subscribe((booking) => {
            that.allBooking = booking.data;
            callback({
              recordsTotal: booking.recordsTotal,
              recordsFiltered: booking.recordsFiltered,
              data: [],
            });
          });
      },

      columns: [
        { data: "bookingId", orderable: false, searchable: false },
        { data: "checkIn", orderable: false, searchable: false },
        { data: "checkOut", orderable: false, searchable: false },
        { data: "fName", orderable: false, searchable: false },
        { data: "createdAt", orderable: false, searchable: false },
        { data: "finalPrice", orderable: false, searchable: false },
        { data: "status", orderable: false, searchable: false },
        { data: "roomCategories", orderable: false, searchable: false },
        { data: "id", visible: true, orderable: false, searchable: false },
      ],
    };
  }

  onDateSelection(date) {
    let dateRange = {};
    if (!this.fromDate && !this.toDate) {
      this.dateArray = [];
      this.fromDate = date;
      dateRange["fromDate"] = this.fromDate;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      dateRange["toDate"] = this.toDate;
    } else {
      this.dateArray = [];
      this.toDate = null;
      this.fromDate = date;
      dateRange["fromDate"] = date;
    }
    this.dateArray.push(dateRange);
    const data = this.dateArray;
    const yy = data[0].fromDate.year.toString();
    const m = data[0].fromDate.month.toString();
    const ss = data[0].fromDate.day.toString();
    const sss = yy.concat("-", m);
    const fromFinal = sss.concat("-", ss);
    const yy1 = data[1].toDate.year.toString();
    const m1 = data[1].toDate.month.toString();
    const ss1 = data[1].toDate.day.toString();
    const sss1 = yy1.concat("-", m1);
    const toFinal = sss1.concat("-", ss1);
    this.checkInNew = {
      from: fromFinal,
      to: toFinal,
    };
    this.isSelectDate = false;
  }
  onDateEDit() {
    this.isSelectDate = !this.isSelectDate;
    console.log(this.isSelectDate, " sd;lfkjdsklfjskdfjksd");
  }
  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
  ngAfterViewInit(): void {
    this.cBDtTrigger.next();
  }
  public selectedDate(value: any) {
    console.log(value);
    this.daterange.start = value.start;
    this.daterange.end = value.end;
  }

  public applyDate(e: any) {
    console.log(e);
  }

  ngOnDestroy(): void {
    this.cBDtTrigger.unsubscribe();
  }
  leftPad(number, targetLength) {
    var output = number + "";
    while (output.length < targetLength) {
      output = "0" + output;
    }
    return output;
  }
  search() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.cBDtTrigger.next();
    });
  }
}
