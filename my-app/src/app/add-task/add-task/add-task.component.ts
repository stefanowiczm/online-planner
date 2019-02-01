import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass']
})
export class AddTaskComponent implements OnInit {
  @Output() addTodo = new EventEmitter();
  title = '';

  constructor() { }

  ngOnInit() {
  }

  onAddTodo() {
    this.addTodo.emit(this.title);
  }

  onKey(value: string) {
    this.title = value;
  }

}
