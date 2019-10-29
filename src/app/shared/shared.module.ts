import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular-6-datatable';
import { ToastrModule } from 'ngx-toastr';

import { NotFoundComponent } from './not-found/not-found.component';
import { CardUserComponent } from './card-user/card-user.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DataTableModule,
    ToastrModule,
    NotFoundComponent,
    CardUserComponent
  ],
  declarations: [NotFoundComponent, CardUserComponent]
})
export class SharedModule { }
