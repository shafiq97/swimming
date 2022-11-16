import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  EventForm!: FormGroup;
  eventId: any;
  constructor(
    private crudService: CrudService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createEventForm();
    let eventId = '';
    if(this.activatedRoute.snapshot.params['eventId']){
      eventId = this.activatedRoute.snapshot.params['eventId'];
      if(eventId != ''){
        this.loadEventDetails(eventId);
      }
    }
  }

  createEventForm() {
    this.EventForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])],
      venue: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      imageURL: ['', Validators.compose([Validators.required])],
      p_name: ['', Validators.compose([Validators.required])],
      p_age: ['', Validators.compose([Validators.required])],
    });
  }

  createEvent(values: any) {
    let formData = new FormData();
    formData.append('name', values.name);
    formData.append('date', values.date);
    formData.append('venue', values.venue);
    formData.append('description', values.description);
    formData.append('imageURL', values.imageURL);
    formData.append('p_name', values.p_name);
    formData.append('p_age', values.p_age);

    if (this.eventId) {
      formData.append('id', this.eventId);
      this.http
        .post('http://localhost/web_api/update.php', formData)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['event-list'])
          },
          error: (error) => console.log(error),
        });
    } else {
      // this.crudService.createEvent(formData).subscribe(res => {
      //   if(res.result === 'success'){
      //     this.router.navigate(['event-list']);
      //   }
      // });
      this.http
        .post('http://localhost/web_api/create.php', formData)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['event-list'])
          },
          error: (error) => console.log(error),
        });
    }
  }

  loadEventDetails(eventId: any){
    this.crudService.loadEventInfo(eventId).subscribe(res => {
      console.log(typeof(res));
      this.EventForm.controls['name'].setValue(res.name);
      this.EventForm.controls['venue'].setValue(res.venue);
      this.EventForm.controls['description'].setValue(res.description);
      this.EventForm.controls['imageURL'].setValue(res.imageURL);
      this.EventForm.controls['p_name'].setValue(res.p_name);
      this.EventForm.controls['p_age'].setValue(res.p_age);
      this.EventForm.controls['imageURL'].setValue(res.imageURL);
      this.eventId = res.event_id;
    });
  }
}
