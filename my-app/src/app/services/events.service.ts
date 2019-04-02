import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { DexieService } from '../dexie/dexie.service';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  table: Dexie.Table<CalendarEvent, number>;

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
