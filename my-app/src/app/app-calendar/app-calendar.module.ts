import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';
import { CalendarModule, DateAdapter, DateFormatterParams, CalendarNativeDateFormatter, CalendarDateFormatter } from 'angular-calendar';
import { AppCalendarHeaderComponent } from './app-calendar-utils/app-calendar-header.component';
import { AppCalendarComponent } from './app-calendar.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
    AppMaterialModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    DragDropModule,
  ],
  declarations: [
    AppCalendarComponent,
    AppCalendarHeaderComponent
  ],
  exports: [
    AppCalendarComponent,
    AppCalendarHeaderComponent
  ],
  providers: [
    {provide: CalendarDateFormatter, useClass: CustomDateFormatter}
  ]
})
export class AppCalendarModule {}
