import Dexie, { Table } from 'dexie';

export interface DATA {
  id?: number;
  content: any;
}

export class MySubClassedDexie extends Dexie {
  // 'data' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  data!: Table<DATA>; 

  constructor() {
    super('kef-code');
    this.version(1).stores({
      data: '++id, content' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
