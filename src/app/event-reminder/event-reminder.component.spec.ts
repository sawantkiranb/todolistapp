import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventReminderComponent } from './event-reminder.component';

describe('EventReminderComponent', () => {
  let component: EventReminderComponent;
  let fixture: ComponentFixture<EventReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
