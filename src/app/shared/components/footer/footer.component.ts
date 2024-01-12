import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  footerText:string = 'Diseño de interfaces web - Cristóbal Alcalá Cazorla'
  imgRoute:string = '../../../../assets/github.png'
  imgAlternativeText:string = 'Github Image'
  gitHubLink:string = 'https://github.com/Cris-Alcala'
}
