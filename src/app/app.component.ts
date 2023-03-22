import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Utils from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'beanStock';
  isLoading = false
  isAuthen = !!localStorage.getItem('token');
  constructor(translate :TranslateService){
    translate.use('th')
    Utils.load$.subscribe(load => {
      this.isLoading = load
    });
  }
}
