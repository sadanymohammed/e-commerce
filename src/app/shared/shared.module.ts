import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectComponent } from './components/select/select.component';





@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    SelectComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,

  ],
  exports: [
    HeaderComponent,
    SpinnerComponent,
    SelectComponent,
    FormsModule

  ]
})
export class SharedModule { }
