import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../services/todo';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

	constructor(private todoService:TodoService) { }

	public todoList:any[];
	newTodo:Todo;
	validation:any = {
		value: false,
		message: 'You have to do something!!'
	}

	addTodo(content):void {
		if(content.value == ''){
			this.validation.value = true;
			setTimeout(()=> {
			this.validation.value = false;
			}, 2000);
			return;
		}
		this.newTodo.content = content.value;
		this.todoService.createTodo(this.newTodo).then(() => {
			content.value = '';
			this.validation.value = false;
			this.ngOnInit();
		});
	}
	editTodo(index:number, editOne:any):void {
		const id:string = this.todoList[index]._id;
		if(editOne.value !== ''){
			this.todoService.updateTodo(id, {'todo.content': editOne.value})
			.then(() => {
				this.ngOnInit();
			});
		}
	}
	doneTodo(index:number):void {
		const id:string = this.todoList[index]._id;
		this.todoService.updateTodo(id, {'todo.done': !this.todoList[index].todo.done})
		.then(() => {
			this.ngOnInit();
		})
	}
	changePriority(k:number,i:number) {
		const currentId:string = this.todoList[i]._id;
		const newId:string = this.todoList[k]._id;
		const temp = this.todoList[i];
		this.todoService.updateTodo(currentId, {'todo.priority': this.todoList[k].todo.priority});
		this.todoService.updateTodo(newId, {'todo.priority': temp.todo.priority})
		.then(() => {
			this.ngOnInit();
		});
	}
	deleteTodo(index:number):void {
		const id:string = this.todoList[index]._id
		this.todoService
			.deleteTodo(id)
			.then(() => {
				this.ngOnInit();
			});
	}
	getAllTodos():void{
		this.todoService.getTodos()
		.then(todos => {
			this.todoList = todos;
			this.todoList.sort((a, b) => {
				return (a.todo.priority > b.todo.priority) ? 1 : ((b.todo.priority > a.todo.priority) ? -1 : 0);
			});
			this.newTodo = {
				'content': '',
				'edit': false,
				'done': false,
				'priority': (this.todoList) ? this.todoList.length : 0
			}
		});
	}
	ngOnInit() {
		this.getAllTodos();
	}
}
