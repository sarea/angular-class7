import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

	constructor() { }

	validation = {
		value: false,
		message: 'You have to do something!!'
	};
	todo;
	editOne;
	todoList = [];
	addTodo(todo) {
		if(todo.value == ''){
			this.validation.value = true;
			setTimeout(()=> {
			this.validation.value = false;
			}, 2000);
			return;
		}
		this.todoList.push({todo: todo.value, edit: false, done: false})
		todo.value = '';
		this.validation.value = false
	}
	editTodo(index, editOne) {
		if(editOne.value !== ''){
			this.todoList[index].todo = editOne.value;
		}
	}
	deleteTodo(index) {
		this.todoList.splice(index, 1);
	}
	changePriority(k,i) {
		let temp = this.todoList[i];
		this.todoList[i] = this.todoList[k];
		this.todoList[k] = temp;
	}
	ngOnInit() {
	}

}
