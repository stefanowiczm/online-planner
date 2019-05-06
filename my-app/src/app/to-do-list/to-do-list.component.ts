import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TodoWithID, TodosService } from '../services/todos.service';
import { sortBy } from 'lodash';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.sass']
})
export class ToDoListComponent implements OnInit {
  tasks: Array<TodoWithID>;

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todosService
      .getAll().then((todos: Array<TodoWithID>) => {
        this.tasks = sortBy(todos, ['order']);
      });
  }

  drop(event) {
    if (event.container.id === event.previousContainer.id) {
      moveItemInArray(event.container.data,
                      event.previousIndex,
                      event.currentIndex);
      this.todosService
      .updateTableOrder(event.container.data);
    } else {
    }
  }
    }
  }

  deleteTask(id) {
    this.todosService
    .remove(id)
    .then(() => {
        this.tasks = this.tasks.filter((todo) => todo.id !== id);
     });
  }
}
