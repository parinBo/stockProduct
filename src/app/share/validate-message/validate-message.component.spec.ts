import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateMessageComponent } from './validate-message.component';

describe('ValidateMessageComponent', () => {
  let component: ValidateMessageComponent;
  let fixture: ComponentFixture<ValidateMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
