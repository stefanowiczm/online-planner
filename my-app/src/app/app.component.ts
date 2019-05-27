import { Component, OnInit } from '@angular/core';
import { TodoWithID, Todo, TodosService } from './services/todos.service';
import { CalendarEvent } from 'calendar-utils';
import { addHours, startOfDay } from 'date-fns';
import { sortBy } from 'lodash';

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

  ngOnInit() {}

  onToggleTodo({ id, done }: { id: string, done: boolean }) {
    this.todosService
      .update(id, { done })
      .then(() => {
        const todoToUpdate = this.todosList.find((todo) => todo.id === id);
        this.todosList = [...this.todosList.filter((todo) => todo.id !== id), Object.assign({}, todoToUpdate, { done })];
      });
  }
}
