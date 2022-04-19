import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/variables/property';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropertiesService } from '../properties.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Amenities } from 'src/app/variables/amenities';
import { env } from "src/app/variables/env";

@Component({
  selector: 'properties-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

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
  imageUrl = env.apiURL;
  removedImages:number[] = [];
  constructor(private service: PropertiesService, private toastr: ToastrService, private router: Router,private route:ActivatedRoute) { }

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
    this.service.getProperty(this.route.snapshot.paramMap.get('id')).subscribe(res=>{
      this.property.id = res.id;
      this.property.name = res.name;
      this.property.nameAr = res.nameAr;
      this.property.description = res.description;
      this.property.descriptionAr = res.descriptionAr;
      this.property.bedroomNo = res.bedroomNo;
      this.property.bathroomNo = res.bathroomNo;
      this.property.plotArea = res.plotArea;
      this.property.price = res.price;
      this.property.carParking = res.carParking;
      this.property.furnished = res.furnished;
      this.property.phone = res.phone;
      this.property.email = res.email;
      this.property.address = res.address;
      this.property.addressAr = res.addressAr;
      this.property.lat = res.lat;
      this.property.lng = res.lng;
      this.property.featured = res.featured;
      this.property.propertyTypeId = res.propertyType.id;
      this.property.propertyPurposeId = res.propertyPurpose.id;
      this.property.propertyLocationId = res.propertyLocation.id;
      this.property.propertyLookingForId = res.propertyLookingFor.id; 
      this.property.propertyImages = res.propertyImages; 
      res.propertyImages.map(pi=>{
        pi.path =  pi.path;
      })
      this.property.propertyImages = res.propertyImages; 
      res.propertyAmenities.map(a=>{
        this.property.amenityId.push(a.id);
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
    })
    
  }
  block(event){
    event.preventDefault();
  }
  changeFile(value) { 
    let roomImages = [];
    let v = this.propertyForm.value.propertyImages;
    let rc = [];
    v.map(dv=>{
      if(dv.id){
        rc.push(dv);
      }
    })
    this.propertyForm.controls['propertyImages'].setValue(rc); 
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
  removePropertyImage(id,i){ 
    if(id){
      this.removedImages.push(id);
    } 
    let images = this.propertyForm.value.propertyImages;
    images.splice(i,1);
    this.propertyForm.controls['propertyImages'].setValue(images);
  }
  saveProperty(value) {
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
    fd.append('removedImages',JSON.stringify(this.removedImages));
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
    this.service.updateProperty(fd,this.route.snapshot.paramMap.get('id')).subscribe(res => {
      
      this.toastr.success('Property Update Successfully..!!');
      this.saveLoading = false;
      this.router.navigate(['/properties'])
    }, err => {
      this.saveLoading = false;
      this.toastr.error('Property Update Failed, Please try again later..!!');
    });
  }
}
