import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule, MatCardModule, MatCheckboxModule, MatButtonModule, MatInputModule, MatDividerModule} from '@angular/material';

@NgModule({
  imports: [
    MatGridListModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule
  ],
  exports: [
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule
  ]
})
export class AppMaterialModule { }
