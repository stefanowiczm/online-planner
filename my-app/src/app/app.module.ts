import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule, MatCardModule, MatCheckboxModule, MatButtonModule, MatInputModule, MatDividerModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import {DexieService} from './dexie/dexie.service';
import { TodosService } from './services/todos.service';
import { AddTaskComponent } from './add-task/add-task/add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    DragDropModule
  ],
  providers: [
    DexieService,
    TodosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
