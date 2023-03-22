import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  onClickToggle(){
    const nav = document.querySelector('#navbarSupportedContent')?.classList;
    if(nav?.contains('show')){
      nav.remove('show');
    }else{
      nav?.add('show');
    }
  }

  onSignOut(){
    localStorage.removeItem('token');
    location.reload();
  }
}
