import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { DexieService } from './dexie/dexie.service';
import { TodosService } from './services/todos.service';
import { AddTaskComponent } from './add-task/add-task/add-task.component';
import { AppCalendarModule } from './app-calendar/app-calendar.module';
import { EventsService } from './services/events.service';


@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    DragDropModule,
    AppCalendarModule
  ],
  providers: [
    DexieService,
    TodosService,
    EventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
