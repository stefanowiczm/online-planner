import Dexie from 'dexie';
import 'dexie-observable';

export class DexieService extends Dexie {
  constructor() {
    super('onlinePlannerDB');
    this.version(1).stores({
      todos: '$$id',
      events: '$$id',
    });
  }
}
