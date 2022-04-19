import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RoomCategories } from 'src/app/variables/room-categories';
import { ToastrService } from 'ngx-toastr';
import { RoomCategoriesService } from '../room-categories.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'room-categories-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  roomCategoryForm: FormGroup;
  roomCategory: RoomCategories;
  saveLoading:boolean = false;
  constructor(private toastr: ToastrService,private service:RoomCategoriesService,private router:Router,private route:ActivatedRoute) { }
  ngOnInit() {
    this.roomCategory = new RoomCategories();
    this.service.getRoomCategory(this.route.snapshot.paramMap.get('id')).subscribe(res=>{
      this.roomCategory.name = res.name;
      this.roomCategory.nameAr = res.nameAr;
      this.roomCategory.featured = res.featured; 

      this.roomCategoryForm = new FormGroup({
        'name': new FormControl(this.roomCategory.name, Validators.required),
        'nameAr': new FormControl(this.roomCategory.nameAr ),
        'featured': new FormControl(this.roomCategory.featured, Validators.required)
      });
  
    })    
  }
  updateRoomCategory(roomCategoryData){
    this.saveLoading = true;
    this.service.updateRoomCategory(this.route.snapshot.paramMap.get('id'),roomCategoryData).subscribe(res=>{
      console.log(res);
      this.toastr.success("Update Successfully!!!");
      this.saveLoading = false;
      this.router.navigate(['/room-categories']);
    },err=>{
      this.toastr.error(err); 
    })
  }
}