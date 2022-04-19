import { Component, OnInit } from '@angular/core';
import { iconClass } from "../../../variables/icon-class";
import { Amenities } from 'src/app/variables/amenities';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AmenitiesService } from '../amenities.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'amenities-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  iconClass = iconClass;
  amenities:Amenities;
  amenitiesForm:FormGroup;
  saveLoading:boolean = false;
  amenitiesTypes = [];
  amenitiesIcons = [];
  constructor(private service:AmenitiesService,private toastr:ToastrService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() { 
    this.service.getAmenitiesIcon().subscribe(iconRes=>{
      this.service.getAmenitiesType().subscribe(typeRes=>{
        this.service.getAmenity(this.route.snapshot.paramMap.get('id')).subscribe(aRes=>{
          this.amenitiesIcons = iconRes;
          this.amenitiesTypes = typeRes;
          this.amenities = new Amenities();
          this.amenities.name = aRes.name;
          this.amenities.nameAr = aRes.nameAr;
          this.amenities.amenitiesIconId = aRes.amenitiesIconId;
          this.amenities.amenitiesTypeId = aRes.amenitiesTypeId;
          this.amenitiesForm = new FormGroup({
            'name': new FormControl(this.amenities.name, Validators.required),
            'nameAr': new FormControl(this.amenities.nameAr ),
            'amenitiesIconId': new FormControl(this.amenities.amenitiesIconId, Validators.required),
            'amenitiesTypeId': new FormControl(this.amenities.amenitiesTypeId, Validators.required)
          })
        })
        
      })
    })
  }
  updateAmenities(amenitiesData){
    this.saveLoading = true;
    this.amenitiesIcons.map(ai=>{
      if(ai.id == amenitiesData.amenitiesIconId){
        amenitiesData.iconName = ai.name;
      }
    })
    this.service.updateAmenity(amenitiesData, this.route.snapshot.paramMap.get('id')).subscribe(res=>{
      console.log(res);
      this.toastr.success("Update Successfully!!!");
      this.saveLoading = false;
      this.router.navigate(['/amenities']);
    },err=>{
      this.toastr.error(err); 
    })
  }
}
