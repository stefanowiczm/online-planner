import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { addHours, startOfDay } from 'date-fns';
import { TodoWithID } from '../services/todos.service';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-calendar.component.html',
  styleUrls: ['./app-calendar.component.sass']
})

export class AppCalendarComponent {
  viewDate = new Date();
  @Input() todos: Array<TodoWithID>;
  events: CalendarEvent[] = [
    {
      title: 'An event',
      start: addHours(startOfDay(new Date()), 5),
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      title: 'Another event',
      start: addHours(startOfDay(new Date()), 2),      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      title: 'An 3rd event',
      start: addHours(startOfDay(new Date()), 7),
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.events = [...this.events];
  }

  }
}
