import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter, DateFormatterParams, CalendarNativeDateFormatter, CalendarDateFormatter } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header.component';
import { DayViewSchedulerComponent } from './day-view-scheduler/day-view-scheduler.component';
import { CalendarComponent } from '../calendar.component';
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
    CalendarComponent,
    CalendarHeaderComponent,
    DayViewSchedulerComponent
  ],
  exports: [
    CalendarComponent,
    CalendarHeaderComponent,
    DayViewSchedulerComponent
  ],
  providers: [
    {provide: CalendarDateFormatter, useClass: CustomDateFormatter}
  ]
})
export class CalendarUtilsModule {}
