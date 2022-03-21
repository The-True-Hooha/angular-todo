import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { allTasks } from '../model/all-tasks';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  tasks : allTasks [] = [];
  inProgress : allTasks [] = [];
  done : allTasks [] = [];
  updateTask : any;
  isEditEnabled : boolean = false;

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item : ['', Validators.required]
    })
  }

  addTasks(){
    this.tasks.push({
      description:this.todoForm.value.item,
      done: false
    })
    this.todoForm.reset();
  }

  liveEdit(item: allTasks, i : number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateTask = i;
    this.isEditEnabled = true;
  }

  deleteTasks(i: number){
    this.tasks.splice(i, 1)
  }

  deleteInprogress(i : number) {
    this.inProgress.splice(i, 1)
  }
  editTasks(){
    this.tasks [this.updateTask].description = this.todoForm.value.item;
    this.tasks [this.updateTask].done = false;
    this.todoForm.reset();
    this.updateTask = undefined;
    this.isEditEnabled = false;
  }
  deleteDone(i : number){
    this.done.splice(i, 1)
  }

  drop(event: CdkDragDrop<allTasks[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
