import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Todo } from './todo';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class TodoService {
 
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  getTodos():Promise<Todo[]> {
  	const url = 'http://localhost:3000/v1/todos';
	return this.http
		.get(url)
		.toPromise()
		.then(response => response.json())
		.catch(this.handleError);
  }
  createTodo(todo: any): Promise<Todo> {
  	const url = 'http://localhost:3000/v1/todos';
    return this.http
		.post(url, JSON.stringify({todo: todo}), {headers: this.headers})
		.toPromise()
		.then(res => res.json())
		.catch(this.handleError);
  }
  deleteTodo(id: string): Promise<void> {
    const url = `http://localhost:3000/v1/todos/${id}`;
    return this.http
    	.delete(url, {headers: this.headers})
		.toPromise()
		.then(() => null)
		.catch(this.handleError);
  }
  updateTodo(id: string, todo: any): Promise<Todo> {
	const url = `http://localhost:3000/v1/todos/${id}`;
	return this.http
		.patch(url, JSON.stringify(todo), {headers: this.headers})
		.toPromise()
		.then(() => todo)
		.catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
