import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcercaDeComponent } from '../acerca-de.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AcercaDeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    AcercaDeComponent,
    RouterModule
  ]
})
export class AcercaDeModule { }
