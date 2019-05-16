import { Component, OnInit } from '@angular/core';
import { TodoWithID, TodosService } from '../services/todos.service';
import { CalendarEvent } from 'calendar-utils';
import { sortBy } from 'lodash';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.sass']
})
export class ToDoListComponent implements OnInit {
  tasks: Array<TodoWithID>;
  events: CalendarEvent[];

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.getTasks();
    this.todosService.change.subscribe(() => {
      this.getTasks();
    });
  }

  getTasks() {
    this.todosService
    .getAll()
    .then((todos: Array<TodoWithID>) => {
      this.tasks = sortBy(todos, ['order']);
    });
  }

  onAddTodo(title: string) {
    this.todosService
      .add(title, this.tasks.length + 1);
    this.todosService
      .getAll().then((todos) => {
        this.tasks = sortBy(todos, ['order']);
      });
  }

  }

  deleteTask(id) {
    this.todosService
    .remove(id);
    this.todosService
      .getAll().then((todos) => {
        this.tasks = sortBy(todos, ['order']);
      });
  }
}
