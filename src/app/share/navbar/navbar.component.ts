import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  onClickToggle(){
    const nav = document.querySelector('#navbarSupportedContent')?.classList;
    nav?.toggle('show');
  }

  onMenuClick(e:any){
    console.log(e)
  }

  onSignOut(){
    localStorage.removeItem('token');
    location.reload();
  }
}
