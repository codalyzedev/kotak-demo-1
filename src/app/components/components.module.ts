import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomImageComponent } from './custom-image/custom-image.component';



@NgModule({
  declarations: [CustomImageComponent],
  exports: [CustomImageComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
