import { Component, ElementRef, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import {v4 as uuidv4} from 'uuid'
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from '../../interfaces/Task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('title') title!:ElementRef<HTMLInputElement>; 
  @ViewChild('description') description!:ElementRef<HTMLInputElement>; 
  emptyLists: boolean = true;
  emptyResolvedList:boolean = true;
  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  })
  constructor(private service:TaskService) { }
  get getTasklist() {
    return this.service.getTaskList();
  }
  get getResolvedList() {
    return this.service.getResolveList();
  }
  checkEmptyLists() {
    (this.service.taskList.length === 0 && this.service.resolvedTasks.length === 0) ? this.emptyLists = true : this.emptyLists = false;
  }
  addTask() {
    const task:Task = {
      id:uuidv4(),
      title:this.form.value.title ?? '',
      description:this.form.value.description ?? '',
    }
    if (task.title !== '') {
      this.service.addTask(task);
      this.checkEmptyLists();
      this.title.nativeElement.value = '';
      this.description.nativeElement.value = '';
      this.form.value.title = '';
      this.form.value.description = '';
    }
  }
  delAllTasks() {
    const confirmation = confirm('¿Estás seguro de eliminar todas las tareas?');
    if (confirmation) {
      this.service.delAllTasks();
      this.checkEmptyLists();
    }
  }
  delCompletedTasks() {
    const confirmation = confirm('¿Estás seguro de eliminar las tareas completadas?');
    if (confirmation) {
      this.service.delCompletedTasks();
      this.isResolvedEmpty();
      this.checkEmptyLists();
    }
  }
  isResolvedEmpty() {
    this.emptyResolvedList = this.service.resolvedTasks.length===0;
  }

}
