import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private location:Location){

  }
  onClickToggle(){
    const nav = document.querySelector('#navbarSupportedContent')?.classList;
    nav?.toggle('show');
  }

  onRouteClick(name:string){
    this.location.replaceState(name);
    window.location.reload();
  }

  onSignOut(){
    localStorage.removeItem('token');
    location.reload();
  }
}
