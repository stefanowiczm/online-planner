import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { DexieService } from '../dexie/dexie.service';

export interface Event {
  title: string;
  scheduled: boolean;
}

export interface EventWithID extends Event {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  table: Dexie.Table<EventWithID, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('events');
  }

  getAll() {
    return this.table.toArray();
  }

  add(data) {
    return this.table.add(data);
  }

  update(id, data) {
    return this.table.update(id, data);
  }

  remove(id) {
    return this.table.delete(id);
  }
}
