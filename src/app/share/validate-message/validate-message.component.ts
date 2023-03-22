import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'validate-message',
  templateUrl: './validate-message.component.html',
  styleUrls: ['./validate-message.component.scss']
})
export class ValidateMessageComponent implements OnChanges  {
  @Input('error')error:any;

  ngOnChanges(changes: SimpleChanges): void {
    this.error =  changes['error'].currentValue;
  }

  getMessage(){
    if(this.error) {
      return Object.keys(this.error).map((val)=> ('ERROR.'+val));
    }
    return [];
  }
}
