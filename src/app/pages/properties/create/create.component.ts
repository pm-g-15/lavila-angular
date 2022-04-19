import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/variables/property';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropertiesService } from '../properties.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Amenities } from 'src/app/variables/amenities';

@Component({
  selector: 'properties-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  bathroomCount: number;
  bedroomCount: number;
  center: any = {
    lat: 25.209094339280746,
    lng: 50.95256742556967
  };
  property: Property;
  propertyForm: FormGroup;
  amenities: Amenities[] = [];
  propertyLocation = [];
  propertyLookingFor = [];
  propertyPurpose = [];
  propertyType = [];
  saveLoading: boolean = false;
  constructor(private service: PropertiesService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.property = new Property();
    this.service.getAmenities().subscribe(res=>{
      this.amenities = res;
    })
    this.service.getPropertyPurpose().subscribe(res=>{
      this.propertyPurpose = res;
    })
    this.service.getPropertyType().subscribe(res=>{
      this.propertyType = res;
    })
    this.service.getPropertyLookingFor().subscribe(res=>{
      this.propertyLookingFor = res;
    })
    this.service.getPropertyLocation().subscribe(res=>{
      this.propertyLocation = res;
    })
    this.propertyForm = new FormGroup({
      'name': new FormControl(this.property.name, Validators.required),
      'nameAr': new FormControl(this.property.nameAr, Validators.required),
      'description': new FormControl(this.property.description, Validators.required),
      'descriptionAr': new FormControl(this.property.descriptionAr, Validators.required),
      'carParking': new FormControl(this.property.carParking, Validators.required),
      'furnished': new FormControl(this.property.furnished, Validators.required),
      'propertyPurposeId': new FormControl(this.property.propertyPurposeId, Validators.required),
      'bathroomNo': new FormControl(this.property.bathroomNo, Validators.required),
      'bedroomNo': new FormControl( this.property.bedroomNo , Validators.required),
      'plotArea': new FormControl(this.property.plotArea, Validators.required),
      'phone': new FormControl(this.property.phone, Validators.required),
      'email': new FormControl(this.property.email, Validators.required),
      'price': new FormControl(this.property.price, Validators.required),
      'propertyTypeId': new FormControl(this.property.propertyTypeId, Validators.required),
      'propertyLookingForId': new FormControl(this.property.propertyLookingForId, Validators.required),
      'address': new FormControl(this.property.address, Validators.required),
      'addressAr': new FormControl(this.property.addressAr),
      'propertyLocationId': new FormControl(this.property.propertyLocationId, Validators.required),
      'lat': new FormControl(this.property.lat, Validators.required),
      'lng': new FormControl(this.property.lng, Validators.required),
      'propertyImages': new FormControl(this.property.propertyImages, Validators.required),
      'images': new FormControl(this.property.images),
      'amenityId': new FormControl(this.property.amenityId ), 
    }) 
  }
  changeFile(value) {
    this.propertyForm.controls['propertyImages'].setValue([]);
    let roomImages = [];
    for (let i = 0; i < value.length; i++) {
      roomImages.push(value[i]);
      this.readURL(value[i]);
    } 
    if (roomImages.length == 0) {
      this.propertyForm.controls['images'].setValue(null);
    }else{
      this.propertyForm.controls['images'].setValue(roomImages);
    }
    
  }
  block(event){
    event.preventDefault();
  }
  readURL(input) {
    let that = this;
    if (input) {
      let reader = new FileReader();

      reader.onload = function (e) {
        let v = that.propertyForm.value.propertyImages;
        v.push({ path: e.target['result'] })
        that.propertyForm.controls['propertyImages'].setValue(v);
      }
      reader.readAsDataURL(input);

    }
  }
  plusBedRoom(){
    this.propertyForm.controls['bedroomNo'].setValue((this.propertyForm.value.bedroomNo == null)?1:( this.propertyForm.value.bedroomNo+1))
  }
  minusBedRoom(){
    this.propertyForm.controls['bedroomNo'].setValue(this.propertyForm.value.bedroomNo = (this.propertyForm.value.bedroomNo == null||this.propertyForm.value.bedroomNo == 0)?0:( this.propertyForm.value.bedroomNo-1))
  }
  plusBathRoom(){
    this.propertyForm.controls['bathroomNo'].setValue((this.propertyForm.value.bathroomNo == null)?1:(this.propertyForm.value.bathroomNo+1)  ) 
  }
  minusBathRoom(){
    this.propertyForm.controls['bathroomNo'].setValue((this.propertyForm.value.bathroomNo == null||this.propertyForm.value.bathroomNo == 0)?0:(this.propertyForm.value.bathroomNo-1))
  }
  markerDragEnd(  event ) {
    this.propertyForm.controls['lat'].setValue(event.coords.lat);
    this.propertyForm.controls['lng'].setValue(event.coords.lng);
  }
  changeAmenities(e, amenity) {
    let a = this.propertyForm.value.amenityId;
    if (e.target.checked) {
      a.push(amenity.id)
    } else {
      const index = a.indexOf(amenity.id);
      if (index > -1) {
        a.splice(index, 1);
      }
    }
    this.propertyForm.controls['amenityId'].setValue(a);
  }
  saveProperty(value) {
    if(!value.name) {
      this.toastr.error('Name is required');
      return;
    }
    if(!value.nameAr) {
      this.toastr.error('Name in Arabic is required');
      return;
    }
    if(!value.description) {
      this.toastr.error('Description is required');
      return;
    }
    if(!value.descriptionAr) {
      this.toastr.error('Description in Arabic is required');
      return;
    }
    if(!value.propertyPurposeId) {
      this.toastr.error('Property purpose is required');
      return;
    }
    if(!value.bathroomNo) {
      this.toastr.error('Bathroom count is required');
      return;
    }
    if(!value.bedroomNo) {
      this.toastr.error('Bedroom count is required');
      return;
    }
    if(!value.plotArea) {
      this.toastr.error('Plot area is required');
      return;
    }
    if(!value.phone) {
      this.toastr.error('Phone number is required');
      return;
    }
    if(!value.email) {
      this.toastr.error('Email is required');
      return;
    }
    if(!value.price) {
      this.toastr.error('Price is required');
      return;
    }
    if(!value.propertyTypeId) {
      this.toastr.error('Property type is required');
      return;
    }
    if(!value.propertyLookingForId) {
      this.toastr.error('Property looking for is required');
      return;
    }
    if(!value.propertyLocationId) {
      this.toastr.error('Property location is required');
      return;
    }
    if(!value.address) {
      this.toastr.error('Address is required');
      return;
    }
    if(!value.addressAr) {
      this.toastr.error('Address in Arabic is required');
      return;
    }
    if(value.amenityId.length == 0) {
      this.toastr.error('Atleast one amenity is required');
      return;
    }
    if(value.propertyImages.length == 0) {
      this.toastr.error('Atleast one property image is required');
      return;
    }
    this.saveLoading = true;
    const fd = new FormData();
    fd.append('name', value.name);
    fd.append('nameAr', value.nameAr);
    fd.append('description', value.description);
    fd.append('descriptionAr', value.descriptionAr);
    fd.append('carParking', value.carParking);
    fd.append('furnished', value.furnished);
    fd.append('propertyPurposeId', value.propertyPurposeId);
    fd.append('bathroomNo', value.bathroomNo);
    fd.append('bedroomNo', value.bedroomNo);
    fd.append('plotArea', value.plotArea);
    fd.append('phone', value.phone);
    fd.append('email', value.email);
    fd.append('price', value.price);
    fd.append('propertyTypeId', value.propertyTypeId);
    fd.append('propertyLookingForId', value.propertyLookingForId); 
    fd.append('address', value.address);
    fd.append('addressAr', value.addressAr);
    fd.append('propertyLocationId', value.propertyLocationId);
    fd.append('featured', 'false');
    fd.append('lat', value.lat);
    fd.append('lng', value.lng);



    if (value.images.length == 0) {
      fd.append('propertyImages', null);
    } else {
      value.images.map(
        (rI, i) => {
          fd.append('propertyImages', rI, rI.name);

        }
      );
    }
    if (value.amenityId.length == 0) {
      fd.append('amenityId', JSON.stringify([]));
    } else {
      let b = [];
      value.amenityId.map(
        (aI, i) => {
          b.push(aI);
        }
      );
      fd.append('amenityId', JSON.stringify(b));
    }
    this.service.createProperty(fd).subscribe(res => {
      this.toastr.success('Property Create Successfully..!!');
      this.saveLoading = false;
      this.router.navigate(['/properties'])
    }, err => {
      this.saveLoading = false;
      this.toastr.error('Property Create Failed, Please try again later..!!');
    });
  }
}
