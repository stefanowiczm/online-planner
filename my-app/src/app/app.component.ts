import { Component, OnInit } from '@angular/core';
import { TodoWithID, Todo, TodosService } from './services/todos.service';
import { CalendarEvent } from 'calendar-utils';
import { addHours, startOfDay } from 'date-fns';
import { sortBy } from 'lodash';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  todosList: Array<TodoWithID> = [];
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

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todosService
      .getAll().then((todos: Array<TodoWithID>) => {
        this.todosList = sortBy(todos, ['order']);
      });
    // this.eventsService.add(this.events[0]);
    // this.eventsService.add(this.events[1]);
    // this.eventsService.add(this.events[2]);
  }

  onAddTodo(title: string) {
    this.todosService
      .add(title, this.todosList.length + 1);
    this.todosService
      .getAll().then((todos) => {
        this.todosList = sortBy(todos, ['order']);
      });
  }

  onToggleTodo({ id, done }: { id: number, done: boolean }) {
    this.todosService
      .update(id, { done })
      .then(() => {
        const todoToUpdate = this.todosList.find((todo) => todo.id === id);
        this.todosList = [...this.todosList.filter((todo) => todo.id !== id), Object.assign({}, todoToUpdate, { done })];
      });
  }

  onChangeTaskOrder(updatedTaskTable: Array<TodoWithID>) {
    this.todosService
      .updateTableOrder(updatedTaskTable);
  }

  onDropCalendarEventOnTaskList(event: CdkDragDrop<any>) {
    const calendarEvent = event.container.data[event.currentIndex];
    const updatedTaskTable = event.container.data;
    this.todosService
      .add(calendarEvent.title, event.currentIndex + 1);
    this.todosService
      .updateTableOrder(updatedTaskTable);
    this.eventsService
      .remove(calendarEvent.id)
      .then(() => {
        this.eventsList = this.eventsList.filter((e) => e.id !== calendarEvent.id);
    });
  }

  onDeleteTodo(id: number) {
    this.todosService
    .remove(id)
    .then(() => {
        this.todosList = this.todosList.filter((todo) => todo.id !== id);
     });
  }
}
