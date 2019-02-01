import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.sass']
})
export class AddTaskComponent implements OnInit {
  @ViewChild('box') box: ElementRef;
  @Output() addTodo = new EventEmitter();
  title = '';

  constructor() { }

  ngOnInit() {
  }

  onAddTodo() {
    this.addTodo.emit(this.title);
    this.box.nativeElement.value = '';
  }

  onKey(value: string) {
    this.title = value;
  }

}
