import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TodoWithID } from '../services/todos.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.sass']
})
export class ToDoListComponent implements OnInit {
  @Input() tasks: Array<TodoWithID>;
  @Output() toggleTodo = new EventEmitter();
  @Output() deleteTodo = new EventEmitter();

  constructor() {}


  ngOnInit() { }

  drop(event: CdkDragDrop<string[]>) {
    console.log('todo-list drop event to:', event);
    if (event.container.id === event.previousContainer.id) {
      console.log('todo pierwszy if!');
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
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
