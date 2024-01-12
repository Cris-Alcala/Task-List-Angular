import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = 'Lista de tareas';
  imgRoute: string = '../../../../assets/tasklist.png';
  alternativeText:string = 'TaskList Image';
}
