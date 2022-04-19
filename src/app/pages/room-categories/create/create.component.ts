import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoomCategories } from 'src/app/variables/room-categories';
import { ToastrService } from 'ngx-toastr';
import { RoomCategoriesService } from '../room-categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'room-categories-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  roomCategoryForm: FormGroup;
  roomCategory: RoomCategories;
  saveLoading:boolean = false;
  constructor(private toastr: ToastrService,private service:RoomCategoriesService,private router:Router) { }
  ngOnInit() {
    this.roomCategory = new RoomCategories();
    this.roomCategoryForm = new FormGroup({
      'name': new FormControl(this.roomCategory.name, Validators.required),
      'nameAr': new FormControl(this.roomCategory.nameAr),
      'featured': new FormControl(this.roomCategory.featured, Validators.required)
    });

  }
  createRoomCategory(roomCategoryData){
    this.saveLoading = true;
    this.service.createRoomCategory(roomCategoryData).subscribe(res=>{
      console.log(res);
      this.toastr.success("Create Successfully!!!");
      this.saveLoading = false;
      this.router.navigate(['/room-categories']);
    },err=>{
      this.toastr.error(err); 
    })
  }
}