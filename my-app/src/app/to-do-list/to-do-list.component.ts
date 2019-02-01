import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { TodoWithID } from '../services/todos.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.sass']
})
export class ToDoListComponent implements OnInit {
  @Input() todos: Array<TodoWithID>;
  @Output() toggleTodo = new EventEmitter();
  @Output() deleteTodo = new EventEmitter();

  constructor(
  //  public service: ServiceUIFrameContext,
  //  private service: ServiceUIFrameContext
  ) {}

  tasks = [
    'rozładować zmywarke',
    'wstaw pranie',
    'pojemniki',
    'odkurzyć',
    'Delikatesy'
  ];

  ngOnInit() { }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  onTodoToggle(event, id, newValue) {
    event.preventDefault();
    event.stopPropagation();
    this.toggleTodo.emit({
      id,
      done: newValue,
    });
  }

  onDelete(id) {
    this.deleteTodo.emit(id);
  }

}
