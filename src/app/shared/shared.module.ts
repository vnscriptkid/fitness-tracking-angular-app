import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, FlexLayoutModule],
  exports: [CommonModule, MaterialModule, FormsModule, FlexLayoutModule]
})

export class SharedModule { }
