import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TodoService } from './services/todo.service';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
