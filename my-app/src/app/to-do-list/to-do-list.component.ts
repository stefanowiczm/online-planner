import { Component, OnInit } from '@angular/core';
import { TodoWithID, TodosService, Todo } from '../services/todos.service';
import { EventsService } from '../services/events.service';
import { CalendarEvent } from 'calendar-utils';
import 'dexie-observable';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.sass']
})
export class ToDoListComponent implements OnInit {
  tasks: Array<TodoWithID>;

  constructor(private todosService: TodosService, private eventsService: EventsService) {}

  ngOnInit() {
    this.getTasks();

    this.todosService.changeEmitter
    .subscribe((change) => {
        switch (change.type) {
          case 1: // CREATED
            this.tasks.push(change.obj);
            break;
          case 3: // DELETED
            this.tasks = [...this.tasks.filter((task) => task.id !== change.oldObj.id)];
            break;
      }
    });
  }

  getTasks() {
    this.todosService
    .getAll()
    .then((todos: Array<TodoWithID>) => {
      this.tasks = todos;
    });
  }

  onAddTodo(title: string) {
    this.todosService
      .add(title);
  }

  externalDrop(event) {
    if (this.tasks.indexOf(event) === -1) {
      this.todosService.add(event.title);
      const taskId =  event.id.toString();
      this.eventsService.remove(taskId);
    }
  }

  deleteTask(id: string) {
    this.todosService
      .remove(id);
  }
}
