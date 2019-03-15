import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header.component';
import { DayViewSchedulerComponent } from './day-view-scheduler/day-view-scheduler.component';
import { CalendarComponent } from '../calendar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule
  ],
  declarations: [
    CalendarComponent,
    CalendarHeaderComponent,
    DayViewSchedulerComponent
  ],
  exports: [
    CalendarComponent,
    CalendarHeaderComponent,
    DayViewSchedulerComponent
  ]
})
export class CalendarUtilsModule {}
