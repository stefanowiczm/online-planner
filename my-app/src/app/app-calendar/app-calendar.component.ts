import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { colors } from './app-calendar-utils/colors';
import { find } from 'lodash';
import { TodosService } from '../services/todos.service';
import { EventsService } from '../services/events.service';

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

  ngOnInit() {
    this.eventsService
      .getAll().then((events: CalendarEvent[]) => {
        this.events = events;
        console.log('app.callendar pobrał events:', events);
      });
  }
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    console.log('zmieniam czs eventu?');
    event.start = newStart;
    event.end = newEnd;
    this.events = [...this.events];
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('callendar drop event to:', event);
    if (event.container.id === event.previousContainer.id) {
      console.log('calendar pierwszy if!');
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('calendar drugi if!');
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
