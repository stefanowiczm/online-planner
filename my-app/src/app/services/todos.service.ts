import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { DexieService } from '../dexie/dexie.service';

export interface Todo {
  title: string;
  order: number;
}

export interface TodoWithID extends Todo {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  table: Dexie.Table<Todo, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('todos');
  }

  getAll() {
    return this.table.toArray();
  }

  add(title: string, order: number) {
    const task = {
      title: title,
      order: order
    };
    return this.table.add(task);
  }

  update(id: number, data: any) {
    return this.table.update(id, data);
  }

  updateTableOrder(table: Array<TodoWithID>) {
    table.forEach((item, index) => {
      const updatedOrder: number = index + 1;
      this.update(item.id, { order: updatedOrder });
    });
  }

  remove(id: number) {
    return this.table.delete(id);
  }
}
