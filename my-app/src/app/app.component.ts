import { Component, OnInit } from '@angular/core';
import { TodoWithID, Todo, TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Lista zadań';
  todosList: Array<TodoWithID> = [];
  scheduledTasks: Array<TodoWithID> = [];
  unscheduledTasks: Array<TodoWithID> = [];

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todosService.getAll().then((todos: Array<TodoWithID>) => {
      this.todosList = todos;
      this.scheduledTasks = this.getScheduledTasks(todos);
      this.unscheduledTasks = this.getUnscheduledTasks(todos);
    });
  }

  getScheduledTasks(allTodos: Array<TodoWithID>) {
    return allTodos.filter(
      obj => obj.scheduled === true
    );
  }

  getUnscheduledTasks(allTodos: Array<TodoWithID>) {
    return allTodos.filter(
      obj => obj.scheduled === false
    );
  }

  onAddTodo(title: string) {
    const todo: Todo = {
      title,
      scheduled: false,
    };
    this.todosService
      .add(todo)
      .then((id) => {
        this.todosList = [...this.todosList, Object.assign({}, todo, { id })];
        this.unscheduledTasks = this.getUnscheduledTasks(this.todosList);
      });
  }

  onToggleTodo({ id, done }: { id: number, done: boolean }) {
    this.todosService
      .update(id, { done })
      .then(() => {
        const todoToUpdate = this.todosList.find((todo) => todo.id === id);
        this.todosList = [...this.todosList.filter((todo) => todo.id !== id), Object.assign({}, todoToUpdate, { done })];
        this.unscheduledTasks = this.getUnscheduledTasks(this.todosList);
      });
  }

  onDeleteTodo(id: number) {
    this.todosService
      .remove(id)
      .then(() => {
        this.todosList = this.todosList.filter((todo) => todo.id !== id);
        this.unscheduledTasks = this.getUnscheduledTasks(this.todosList);
      });
  }
}
