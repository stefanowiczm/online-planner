import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule, MatCardModule, MatCheckboxModule,
        MatButtonModule, MatInputModule, MatDividerModule, MatSelectModule} from '@angular/material';

@NgModule({
  imports: [
    MatGridListModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule
  ],
  exports: [
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule
  ]
})
export class AppMaterialModule { }
