import { EventService } from './shared/event.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EventData } from './shared/event';

@Component({
  selector: 'app-event-reminder',
  templateUrl: './event-reminder.component.html',
  styleUrls: ['./event-reminder.component.css']
})
export class EventReminderComponent implements OnInit {

  constructor(private eventService: EventService) {
  }
  eventList: any[];
  event: any;
  distance: number;
  countdown: string;
  title: string;

  eventForm = new FormGroup({
    title: new FormControl('', Validators.required),
    eventDate: new FormControl('', Validators.required),
    eventTime: new FormControl('', Validators.required)
  });
  startTimer;

  ngOnInit() {
    this.countdown = 'Event Timer';
    this.eventService.getAll()
      .subscribe(response => {
        this.eventList = [];
        response.forEach(item => {
          const x = item.payload.toJSON();
          x['$key'] = item.key;
          this.eventList.push(x);
        });
      });
  }

  onSubmit() {
    const item: EventData = this.eventForm.value;
    console.log(item);

    this.eventService.addEvent(item);
    this.eventForm.reset();
  }

  selectEvent($key: string) {
    clearInterval(this.startTimer);
    this.eventService.getEvent($key).subscribe(response => {
      this.event = response.payload.toJSON();

      this.title = this.event.title;
      const t1 = this.event.eventDate;

      const tt = this.event.eventTime.split(':');
      const tDelta = tt[0] * 3600 + tt[1] * 60;

      this.updateTimer(t1, tDelta);
    });

  }

  updateTimer(eventDate, delta) {
    // Time calculations for days, hours, minutes and seconds
    const edate = new Date(eventDate);
    var that = this;
    this.startTimer = setInterval(() => {

      const now = new Date();

      const distance = edate.getTime() - now.getTime();

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (now >= edate) {
        that.countdown = 'Event Completed';
        that.title = '';
      } else {
        that.countdown = days + ':' + hours + ':' + minutes + ':' + seconds;
      }


      console.log(that.countdown);

    }, 1000);
  }

  deleteEvent($key: string) {
    this.countdown = 'Event Timer';
    this.title = '';
    clearInterval(this.startTimer);
    this.eventService.deleteEvent($key);
  }

  tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

}
