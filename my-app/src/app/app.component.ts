import { Component, OnInit } from '@angular/core';
import { TodoWithID, Todo, TodosService } from './services/todos.service';
import { EventsService } from './services/events.service';
import { CalendarEvent } from 'calendar-utils';
import { addHours, startOfDay } from 'date-fns';
import { sortBy } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Lista zadań';
  todosList: Array<TodoWithID> = [];
  eventsList: CalendarEvent[] = [];
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

  constructor(private todosService: TodosService, private eventsService: EventsService) {}

  ngOnInit() {
    this.todosService.getAll().then((todos: Array<TodoWithID>) => {
      this.todosList = sortBy(todos, ['order']);
    });
    this.eventsService.getAll().then((events: CalendarEvent[]) => {
      this.eventsList = events;
    });
    // this.eventsService.add(this.events[0]);
    // this.eventsService.add(this.events[1]);
    // this.eventsService.add(this.events[2]);
  }

  onAddTodo(title: string) {
    const todo: Todo = {
      title: title,
      order: this.todosList.length + 1,
    };
    this.todosService
      .add(todo)
      .then((id) => {
        this.todosList = [...this.todosList, Object.assign({}, todo, { id })];
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

  onChangeTaskOrder(tablica: Array<TodoWithID>) {
    tablica.forEach((item, index) => {
        const updatedOrder: number = index + 1;
        this.todosService
        .update(item.id, { order: updatedOrder });
      });
    }

  onDropEventOnTaskList(event) {

  }



  onDeleteTodo(id: number) {
    this.todosService
    .remove(id)
    .then(() => {
        this.todosList = this.todosList.filter((todo) => todo.id !== id);
     });
  }
}
