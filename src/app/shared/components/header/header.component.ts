import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})

export class HeaderComponent implements OnInit  {
  isNavVisible = false;
  @ViewChild('container', { static: true }) container!: ElementRef;


ngOnInit(): void {
  document.addEventListener('click', (event) => {
    if (!this.container.nativeElement.contains(event.target)) {
      this.isNavVisible = false;
    }
  });

}

  toggleNav() {
    this.isNavVisible = !this.isNavVisible;
  }
}
