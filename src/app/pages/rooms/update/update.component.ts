import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/variables/room';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomsService } from '../rooms.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { env } from "src/app/variables/env";
class RoomCategories {
  public id: number;
  public name: string;
}
class BedTypes {
  public id: number;
  public name: string;
}
class Branch {
  public id: number;
  public name: string;
}
class Amenities {
  public id: number;
  public name: string;
  public selected: boolean
}
@Component({
  selector: 'rooms-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  addons = [];
  room: Room;
  roomCategories: RoomCategories[] = [];
  bedTypes: BedTypes[] = [];
  branches: Branch[] = [];
  amenities: Amenities[] = [];
  roomImages: File[] = [];
  imageData: any[] = [];
  roomForm: FormGroup;
  saveLoading: boolean = false;
  imageUrl:string = env.apiURL;
  removedImages:number[] = [];
  constructor(private router: Router, private service: RoomsService, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.service.getRoomCategories().subscribe(roomCategories => {
      this.roomCategories = roomCategories;
    })
    this.service.getAmenities().subscribe(amenities => {
      amenities.map(am => {
        this.amenities.push({ id: am.id, name: am.name, selected: false })
      })
    })
    this.service.getBranches().subscribe(branches => {
      this.branches = branches;
    })
    this.service.getRoomBedTypes().subscribe(bedTypes => {

      this.bedTypes = bedTypes
    })
    this.room = new Room();
    this.service.getRoom(this.route.snapshot.paramMap.get('roomId')).subscribe(roomRes=>{ 
      this.room.description = roomRes.description;
      this.room.descriptionAr = roomRes.descriptionAr;
      this.room.adultCount = roomRes.adultCount;
      this.room.childCount = roomRes.childCount; 
      this.room.BBATwoPercent = roomRes.BBATwoPercent; 
      this.room.BBAOnePercent = roomRes.BBAOnePercent; 
      this.room.ROATwoPercent = roomRes.ROATwoPercent; 
      this.room.count = roomRes.count;
      this.room.branchId = roomRes.branch.id;
      this.room.bedTypeId = roomRes.bedType.id;
      this.room.roomCategoryId = roomRes.roomCategory.id;
      this.room.roomImages = roomRes.roomImages;
      roomRes.roomAmenities.map(rm=>{
        this.room.amenitiesId.push(rm.id)
      })
      this.roomForm = new FormGroup({ 
        'description': new FormControl(this.room.description, Validators.required),
        'descriptionAr': new FormControl(this.room.descriptionAr),
        'branchId': new FormControl(this.room.branchId, Validators.required),
        'roomCategoryId': new FormControl(this.room.roomCategoryId, Validators.required),
        'bedTypeId': new FormControl(this.room.bedTypeId, Validators.required), 
        'adultCount': new FormControl(this.room.adultCount, Validators.required),
        'childCount': new FormControl(this.room.childCount, Validators.required), 
        'BBATwoPercent': new FormControl(this.room.BBATwoPercent, Validators.required), 
        'BBAOnePercent': new FormControl(this.room.BBAOnePercent, Validators.required), 
        'ROATwoPercent': new FormControl(this.room.ROATwoPercent, Validators.required), 
        'count': new FormControl(this.room.count, Validators.required ),
        'roomImages': new FormControl(this.room.roomImages ),
        'addons': new FormControl(this.room.addons),
        'amenitiesId': new FormControl(this.room.amenitiesId, Validators.required),
      })
    })
    
    
  }
  changeAmenities(e, amenity) { 
    let a = this.roomForm.value.amenitiesId;
    if (e.target.checked) {
      a.push(amenity.id)
    } else {
      const index = a.indexOf(amenity.id);
      if (index > -1) {
        a.splice(index, 1);
      }
    }
    this.roomForm.controls['amenitiesId'].setValue(a);
    console.log(this.roomForm.value);
  }
  changeFile(value) {
    this.imageData = [];
    this.roomImages = [];
    for (let i = 0; i < value.length; i++) {
      this.roomImages.push(value[i]);
      this.readURL(value[i]);
    }
    if (this.roomImages.length == 0) {
      this.roomForm.controls['roomImages'].setValue(null);
    }
    this.roomForm.controls['roomImages'].setValue(this.roomImages);
    console.log(this.roomForm);
  }
  readURL(input) {
    let that = this;
    if (input) {
      let reader = new FileReader();

      reader.onload = function (e) {
        that.imageData.push(e.target['result']);
      }
      reader.readAsDataURL(input);

    }
  }
  removeRoomUploadedImage(id,i){
    this.removedImages.push(id);
    this.room.roomImages.splice(i,1);
  }
  removeRoomImage(i){
    this.imageData.splice(i,1);
  }

  validateExpiry(event) {
    const pattern = /[-/.]/;  
    if (pattern.test(event.key)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  saveRoomAndUpdateAddon() {
    if(this.roomForm.value.count <= 0) {
      this.toastr.error('Please provide a room count greater than 0');
      return
    }
    this.saveLoading = true;
    const fd = new FormData(); 
    fd.append('description', this.roomForm.value.description);
    fd.append('descriptionAr', this.roomForm.value.descriptionAr);
    fd.append('branchId', this.roomForm.value.branchId);
    fd.append('roomCategoryId', this.roomForm.value.roomCategoryId);
    fd.append('bedTypeId', this.roomForm.value.bedTypeId); 
    fd.append('adultCount', this.roomForm.value.adultCount);
    fd.append('childCount', this.roomForm.value.childCount); 
    fd.append('BBATwoPercent', this.roomForm.value.BBATwoPercent); 
    fd.append('BBAOnePercent', this.roomForm.value.BBAOnePercent); 
    fd.append('ROATwoPercent', this.roomForm.value.ROATwoPercent); 
    fd.append('count', this.roomForm.value.count);
    fd.append('removedImages', JSON.stringify(this.removedImages));


    if (this.roomForm.value.roomImages.length == 0) {
      fd.append('roomImages', null);
    } else {
      this.roomForm.value.roomImages.map(
        (rI, i) => { 
          if(!rI.path){
            fd.append('roomImages', rI, rI.name);
          } 
        }
      );
    }
    if (this.roomForm.value.amenitiesId.length == 0) {
      fd.append('amenityId', JSON.stringify([]));
    } else {
      let b = [];
      this.roomForm.value.amenitiesId.map(
        (aI, i) => {
          b.push(aI);
        }
      );
      fd.append('amenityId', JSON.stringify(b));
    }
    this.service.updateRoom(this.route.snapshot.paramMap.get('roomId'),fd).subscribe(res => {
      this.toastr.success('Room Update Successfully..!!');
      this.saveLoading = false;
      this.router.navigate(['/rooms/update-addon/', this.route.snapshot.paramMap.get('roomId')])
    }, err => {
      this.saveLoading = false;
      this.toastr.error('Room Update Failed, Please try again later..!!');
    });
  }
}
