import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter, DateFormatterParams, CalendarNativeDateFormatter, CalendarDateFormatter } from 'angular-calendar';
import { AppCalendarHeaderComponent } from './app-calendar-utils/app-calendar-header.component';
import { DayViewSchedulerComponent } from './app-calendar-utils/day-view-scheduler/day-view-scheduler.component';
import { AppCalendarComponent } from './app-calendar.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

class CustomDateFormatter extends CalendarNativeDateFormatter {
  public dayViewHour({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat('ca', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  declarations: [
    AppCalendarComponent,
    AppCalendarHeaderComponent,
    DayViewSchedulerComponent
  ],
  exports: [
    AppCalendarComponent,
    AppCalendarHeaderComponent,
    DayViewSchedulerComponent
  ],
  providers: [
    {provide: CalendarDateFormatter, useClass: CustomDateFormatter}
  ]
})
export class AppCalendarModule {}
