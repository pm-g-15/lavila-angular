import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/variables/room';
import { Router } from '@angular/router';
import { RoomsService } from '../rooms.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  selector: 'rooms-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
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
  constructor(private router: Router, private service: RoomsService, private toastr: ToastrService) { }

  ngOnInit() {
    this.room = new Room();
    this.service.getRoomCategories().subscribe(roomCategories => {
      this.service.getAmenities().subscribe(amenities => {
        this.service.getBranches().subscribe(branches => {
          this.service.getRoomBedTypes().subscribe(bedTypes => {
            this.roomCategories = roomCategories;
            amenities.map(am => {
              this.amenities.push({ id: am.id, name: am.name, selected: false })
            })

            this.branches = branches;
            this.bedTypes = bedTypes
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
              'count': new FormControl(this.room.count , Validators.required),
              'roomImages': new FormControl(this.room.roomImages, Validators.required),
              'addons': new FormControl(this.room.addons),
              'amenitiesId': new FormControl(this.room.amenitiesId, Validators.required),
            })
          })
        })
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
  saveRoomAndUpdateAddon() {
    this.saveLoading = true;
    const fd = new FormData();
    fd.append('name', this.roomForm.value.name);
    fd.append('nameAr', this.roomForm.value.nameAr);
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


    if (this.roomForm.value.roomImages.length == 0) {
      fd.append('roomImages', null);
    } else {
      this.roomForm.value.roomImages.map(
        (rI, i) => {
          fd.append('roomImages', rI, rI.name);

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
    this.service.createRoom(fd).subscribe(res => {
      this.toastr.success('Room Create Successfully..!!');
      this.saveLoading = false;
      this.router.navigate(['/rooms/update-addon/',res.id])
    }, err => {
      this.saveLoading = false;
      this.toastr.error('Room Create Failed, Please try again later..!!');
    });
  }
}
