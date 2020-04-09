import { TodoService } from './shared/todo.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  toDoListArray: any[];

  constructor(private service: TodoService) { }

  todoForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.service.getToDoItems()
      .snapshotChanges()
      .subscribe(response => {
        this.toDoListArray = [];
        response.forEach(element => {

          const x = element.payload.toJSON();
          // tslint:disable-next-line:no-string-literal
          x['$key'] = element.key;

          this.toDoListArray.push(x);

        });

        this.toDoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });

      });
  }

  onSubmit() {
    const item = this.todoForm.value;
    this.service.addTitle(item.title);
    this.todoForm.reset();
  }

  updateItem(item) {
    this.service.updateTitle(item.$key, item.isChecked);
  }

  deleteItem($key: string) {
    this.service.deleteTitle($key);
  }

  get title() { return this.todoForm.get('title'); }

}
