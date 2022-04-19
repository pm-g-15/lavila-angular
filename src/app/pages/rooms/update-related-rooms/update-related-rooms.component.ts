import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../rooms.service';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/variables/room';
import { env } from "src/app/variables/env";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'rooms-update-related-rooms',
  templateUrl: './update-related-rooms.component.html',
  styleUrls: ['./update-related-rooms.component.scss']
})
export class UpdateRelatedRoomsComponent implements OnInit {

  otherRooms:Room[] = [];
  imageUrl = env.apiURL;
  selectedOtherRooms:number[] = [];
  isLoading:boolean = false;
  constructor(private serivce:RoomsService,private route:ActivatedRoute,private toastr:ToastrService) { }

  ngOnInit() {
    this.serivce.getRelatedRooms(this.route.snapshot.paramMap.get('roomId')).subscribe(res=>{
      res.map(r=>{
        this.selectedOtherRooms.push(r.relatedItemId);
      })
    })
    this.serivce.getOtherRooms(this.route.snapshot.paramMap.get('roomId')).subscribe(res=>{
      this.otherRooms = res;
      console.log(this.otherRooms);
    })
  }
  changeOtherRooms(e, id){ 
    if (e.target.checked) {
      this.selectedOtherRooms.push(id)
    } else {
      const index = this.selectedOtherRooms.indexOf(id);
      if (index > -1) {
        this.selectedOtherRooms.splice(index, 1);
      }
    } 
  }
  updateRelatedRoom(){
    this.isLoading = true;
    let data = [];
    this.selectedOtherRooms.map(d=>{
      data.push({
        relatedItemId:d,
        roomId:this.route.snapshot.paramMap.get('roomId')
      })
    });
    this.serivce.updateRelatedRooms({rooms:data},this.route.snapshot.paramMap.get('roomId')).subscribe(res=>{
      this.isLoading = false;
      this.toastr.success("Related Rooms Updated!!!");
    })
  }
}
