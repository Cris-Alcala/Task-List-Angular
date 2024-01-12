import { Component, Input } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { TaskService } from '../../services/task.service';
import { HomeComponent } from '../../pages/home/home.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})
export class TasklistComponent {
  @Input() taskList!: Task[];
  @Input() resolvedList!: Task[];
  deleted!: string | undefined;
  isModifying: boolean = false;
  taskListEmpty: boolean = true;
  resolvedListEmpty: boolean = true;
  tareaActual!: Task;
  form = new FormGroup({
    id_mod: new FormControl(''),
    title_mod: new FormControl(''),
    description_mod: new FormControl(''),
  })
  constructor(private service: TaskService, private home: HomeComponent) { }
  deleteUncompletedTask(id: string) {
    let deletedTask = this.service.delUncompletedTask(id);
    this.deleted = deletedTask?.title;
    setTimeout(() => {
      this.deleted = undefined;
    }, 5000)
    this.home.checkEmptyLists()
    this.home.isResolvedEmpty();
  }
  deleteCompletedTask(id: string) {
    let deletedTask = this.service.delCompletedTask(id);
    this.deleted = deletedTask?.title;
    setTimeout(() => {
      this.deleted = undefined;
    }, 5000)
    this.home.checkEmptyLists()
  }
  completeTask(id: string) {
    this.service.completeTask(id);
    this.home.isResolvedEmpty();
  }
  unCompleteTask(id: string) {
    this.service.unCompleteTask(id);
    this.home.isResolvedEmpty();
  }
  startModifying(task: any) {
    this.tareaActual = task;
    this.form.controls['id_mod'].setValue(task.id);
    this.isModifying = !this.isModifying;
  }
  modTask() {
    const task: Task = {
      id: this.form.value.id_mod ?? '',
      title: this.form.value.title_mod ?? '',
      description: this.form.value.description_mod ?? '',
    }
    this.service.modTarea(task);
    this.isModifying = !this.isModifying
  }
}
