import { EventReminderComponent } from './event-reminder/event-reminder.component';
import { TodoComponent } from './todo/todo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: TodoComponent },
  { path: 'event', component: EventReminderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
