import Dexie from 'dexie';

export class DexieService extends Dexie {
  constructor() {
    super('onlinePlannerDB');
    this.version(1).stores({
      todos: '++id',
      events: '++id',
    });
  }
}
