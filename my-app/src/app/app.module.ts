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
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DemoUtilsModule } from './calendar/calendar-utils/module';
import { CalendarComponent } from './calendar/calendar.component';
import { DayViewSchedulerComponent } from './calendar/day-view-scheduler/day-view-scheduler.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    AddTaskComponent,
    CalendarComponent,
    DayViewSchedulerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    DragDropModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CalendarUtilsModule
  ],
  providers: [
    DexieService,
    TodosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
