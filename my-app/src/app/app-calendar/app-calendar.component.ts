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
    this.events = [];
    this.getEvents();
  }

  getEvents() {
    this.eventsService
    .getAll().then((events: Array<CalendarEvent>) => {
      this.events = [...events];
    });
  }

  eventDropped({
    event,
    newStart,
    newEnd }: CalendarEventTimesChangedEvent): void {
    const newEvent: CalendarEvent = {
      start: newStart,
      end: newEnd,
      draggable: true,
      title: event.title,
    };
    this.eventsService.add(newEvent);
    this.events.push(newEvent);
    this.events = [...this.events];
    const taskId =  Number(event.id);
    this.todosService.remove(taskId).then(() => {
      this.todosService.change.emit(null);
    });
  }
}
