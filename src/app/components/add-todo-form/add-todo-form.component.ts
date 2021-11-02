import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../models/Todo'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css']
})
export class AddTodoFormComponent implements OnInit {
  
  constructor() { }
  @Output() newTodoEvent = new EventEmitter<Todo>();
  inputTodo:string = "";
  
  errors = { todo:{} }
  todoData = new FormGroup({
    todo: new FormControl('', [
      Validators.required, 
      Validators.minLength(5)])
  })

  isSubmitted = false

  get todo(){
    return this.todoData.get('todo');
  }

  handleTodoForm(){
    this.isSubmitted = true
    this.isValidate()
  }
  
  isValidate(){
    if (this.todo?.invalid){
      this.errors.todo = {...this.todo?.errors};
    } else {
      this.addTodo();
      this.errors.todo = {};
      this.isSubmitted = false;
    }
  }
  
  handleIsSubmittedState(){
    if(this.isSubmitted == true){
      this.isSubmitted = false;
    }
  }
  
  addTodo () {
    const todo: Todo = {
      content: this.inputTodo,
      completed: false,
    }

    this.newTodoEvent.emit(todo)
    this.inputTodo="";
  }

  ngOnInit(): void {
  }

}
