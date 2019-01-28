import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.sass']
})
export class ToDoListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    } else {
      console.log('zaczynamy Gosiaczku!')
    }
  }


  tasks = [
    'rozładować zmywarke',
    'wstaw pranie',
    'pojemniki',
    'odkurzyć',
    'Delikatesy'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

}
