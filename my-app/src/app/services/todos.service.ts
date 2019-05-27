import { Injectable, Output, EventEmitter } from '@angular/core';
import Dexie from 'dexie';

import { DexieService } from '../dexie/dexie.service';

export interface Todo {
  title: string;
}

export interface TodoWithID extends Todo {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  table: Dexie.Table<Todo, string>;

  @Output() changeEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    private dexieService: DexieService
  ) {
    this.table = this.dexieService.table('todos');
    this.dexieService.on('changes', (changes) => {
      changes.forEach((change) => {
        if (change.table === 'todos') {
          this.changeEmitter.emit(change);
        }
      });
    });
  }

  getAll() {
    return this.table.toArray();
  }

  add(title: string) {
    const task = {
      title: title
    };
    return this.table.add(task);
  }

  update(id: string, data: any) {
    return this.table.update(id, data);
  }

  updateTableOrder(table: Array<TodoWithID>) {
    table.forEach((item, index) => {
      const updatedOrder: number = index + 1;
      this.update(item.id, { order: updatedOrder });
    });
  }

  remove(id: string) {
    return this.table.delete(id);
  }
}
