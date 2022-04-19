import { Component, OnInit } from '@angular/core';
import { iconClass } from "../../../variables/icon-class";
import { Amenities } from 'src/app/variables/amenities';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AmenitiesService } from '../amenities.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'amenities-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  iconClass = iconClass;
  amenities:Amenities;
  amenitiesForm:FormGroup;
  saveLoading:boolean = false;
  amenitiesTypes = [];
  amenitiesIcons = [];
  constructor(private service:AmenitiesService,private toastr:ToastrService,private router:Router) { }

  ngOnInit() { 
    this.amenities = new Amenities();
    this.service.getAmenitiesIcon().subscribe(iconRes=>{
      this.service.getAmenitiesType().subscribe(typeRes=>{
        this.amenitiesIcons = iconRes;
        this.amenitiesTypes = typeRes;
        this.amenitiesForm = new FormGroup({
          'name': new FormControl(this.amenities.name, Validators.required),
          'nameAr': new FormControl(this.amenities.nameAr),
          'amenitiesIconId': new FormControl(this.amenities.amenitiesIconId, Validators.required),
          'amenitiesTypeId': new FormControl(this.amenities.amenitiesTypeId, Validators.required)
        })
      })
    })
  }
  createAmenities(amenitiesData){
    this.saveLoading = true;
    this.amenitiesIcons.map(ai=>{
      if(ai.id == amenitiesData.amenitiesIconId){
        amenitiesData.iconName = ai.name;
      }
    })
    this.service.createAmenity(amenitiesData).subscribe(res=>{
      console.log(res);
      this.toastr.success("Create Successfully!!!");
      this.saveLoading = false;
      this.router.navigate(['/amenities']);
    },err=>{
      this.toastr.error(err); 
    })
  }
}
