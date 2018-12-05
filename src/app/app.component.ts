import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GITRecoup';
  
  goToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

}
