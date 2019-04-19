import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TodoWithID } from '../services/todos.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.sass']
})
export class ToDoListComponent {
  @Input() tasks: Array<TodoWithID>;
  @Output() changeTaskOrder = new EventEmitter();
  @Output() deleteTodo = new EventEmitter();

  constructor() {}


  drop(event: CdkDragDrop<string[]>) {
    if (event.container.id === event.previousContainer.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.changeTaskOrder.emit(event.container.data);
    } else {
      console.log('todo drugi if!');
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  onDelete(id) {
    this.deleteTodo.emit(id);
  }

}
