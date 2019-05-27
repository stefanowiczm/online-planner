import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { TodosService } from '../services/todos.service';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-calendar.component.html',
  styleUrls: ['./app-calendar.component.sass']
})

export class AppCalendarComponent implements OnInit {
  viewDate: Date = new Date(2019, 1, 1);
  events: CalendarEvent[] = [];
  CalendarView = CalendarView;

  view = CalendarView.Day;

  activeDayIsOpen = false;

  refresh = new Subject<void>();

  constructor(private todosService: TodosService, private eventsService: EventsService) {}

  ngOnInit() {
    this.getEvents();
    this.eventsService.changeEmitter
    .subscribe((change) => {
      switch (change.type) {
        case 1: // CREATED
        this.events.push(change.obj);
        break;
        case 3: // DELETED
        this.events = this.events.filter((event) => event.id !== change.oldObj.id);
        break;
      }
    });
  }

  getEvents() {
    this.eventsService
    .getAll().then((events: Array<CalendarEvent>) => {
      this.events = [...events];
      this.refresh.next();
    });
  }

  eventDropped({
    event,
    newStart,
    newEnd }: CalendarEventTimesChangedEvent): void {
      if (this.events.includes(event)) {
        const eventToUpdate = this.events.find((element) => element.id === event.id);
        this.events = [...this.events.filter((todo) => todo.id !== event.id), Object.assign({}, eventToUpdate, {start: newStart})];
        this.refresh.next();
        this.eventsService
        .update(event.id, {start: newStart});
      } else {
        const newEvent: CalendarEvent = {
          start: newStart,
          end: newEnd,
          draggable: true,
          title: event.title,
        };
        this.eventsService.add(newEvent);
        const taskId =  event.id.toString();
        this.todosService.remove(taskId);
    }
  }
}
