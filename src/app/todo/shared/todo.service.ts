import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  toDoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

  addTitle(title: string) {
    this.toDoList.push({
      title,
      isChecked: false
    });
  }

  getToDoItems() {
    this.toDoList = this.firebasedb.list('titles');
    return this.toDoList;
  }

  updateTitle($key: string, flag: boolean) {
    this.toDoList.update($key, { isChecked: !flag });
  }

  deleteTitle($key: string) {
    this.toDoList.remove($key);
  }

}
