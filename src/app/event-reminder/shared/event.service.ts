import { EventData } from './event';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  eventCollection: AngularFireList<any>;

  constructor(private firebasedb: AngularFireDatabase) { }

  getAll() {
    this.eventCollection = this.firebasedb.list('events');
    return this.eventCollection.snapshotChanges();
  }

  getEvent($key: string) {
    return this.firebasedb.object('events/' + $key).snapshotChanges();
  }

  addEvent(event: EventData) {
    this.eventCollection.push(event);
  }

  updateEvent(event: EventData) {
    this.eventCollection.update(event.$key, { event });
  }

  deleteEvent($key: string) {
    this.eventCollection.remove($key);
  }

}
