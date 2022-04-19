import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructionsRoutingModule } from './instructions-routing.module';
import { InstructionsComponent } from './instructions.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [InstructionsComponent],
  imports: [
    CommonModule,
    InstructionsRoutingModule,
    NgbModule
  ]
})
export class InstructionsModule { }
