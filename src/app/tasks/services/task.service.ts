import { Injectable } from '@angular/core';
import { Task } from '../interfaces/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskList: Task[] = [];
  resolvedTasks: Task[] = [];

  constructor() { }

  getTaskList() {
    return this.taskList;
  }

  getResolveList() {
    return this.resolvedTasks;
  }

  addTask(task: Task) {
    this.taskList = [...this.taskList, task];
    return task;
  }
  delCompletedTask(id: string) {
    let deletedTask: Task;
    const prevTask: Task | undefined = this.taskList.find(task => task.id === id);
    if (prevTask === undefined) return null;
    else {
      deletedTask = prevTask
      this.taskList = this.taskList.filter(task => task.id !== id);
      return deletedTask;
    }
  }
  delUncompletedTask(id: string) {
    let deletedTask: Task;
    const prevTask: Task | undefined = this.resolvedTasks.find(task => task.id === id);
    if (prevTask === undefined) return null;
    else {
      deletedTask = prevTask
      this.resolvedTasks = this.resolvedTasks.filter(task => task.id !== id);
      return deletedTask;
    }
  }
  completeTask(id: string) {
    const prevTask: Task | null = this.delCompletedTask(id);
    if (prevTask === null) return null;
    else {
      this.resolvedTasks.push(prevTask);
      return prevTask;
    }
  }
  unCompleteTask(id: string) {
    const prevTask: Task | null = this.delUncompletedTask(id);
    if (prevTask === null) return null;
    else return this.addTask(prevTask);
  }
  delAllTasks() {
    this.taskList = [];
    this.resolvedTasks = [];
  }
  delCompletedTasks() {
    this.resolvedTasks = [];
  }
  modTarea(task: Task) {
    const index = this.taskList.findIndex(task_ => task_.id === task.id);
    if (index === -1) return null;
    else {
      this.taskList[index] = { ...task };
      return task;
    }
  }
}
