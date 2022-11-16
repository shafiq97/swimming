import { Component, OnInit, ViewRef } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  eventList: any = [];
  eventListSubscribe: any;

  rowData: any = [];
  gridOptions = {
    rowHeight: 50,
  };

  constructor(private crudService: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.getEventList();
  }

  columnDefs = [
    { field: 'event_id', headerName: 'Event Id' },
    { field: 'name', headerName: 'Event Name' },
    { field: 'venue', headerName: 'Event Venue' },
    { field: 'description', headerName: 'Event Description' },
    { field: 'imageURL', headerName: 'Image URL' },
    { field: 'p_name', headerName: 'Participant Name' },
    { field: 'p_age', headerName: 'Participant Age' },
    {
      field: '',
      headerName: 'Actions',
      cellRenderer: this.actionRender.bind(this),
      width: 300,
    },
  ];

  getEventList() {
    this.eventListSubscribe = this.crudService.loadEvents().subscribe((res) => {
      this.eventList = res;
      this.rowData = res;
    });
  }

  actionRender(params: any) {
    let div = document.createElement('div');
    let htmlCode =
      '<button type="button" class="btn btn-danger">Delete</button>\n' +
      '<button type="button" class="btn btn-success">Edit</button>\n';
    div.innerHTML = htmlCode;
    // View button
    // let viewButton = div.querySelector('.btn-success');
    // viewButton?.addEventListener('click', () => {
    //   console.log('View clicked');
    //   this.viewEventDetails(params);
    // });

    // Edit button
    let editButton = div.querySelector('.btn-success');
    editButton?.addEventListener('click', () => {
      console.log('View clicked');
      this.editEvent(params);
    });

    // Delete button
    let deleteButton = div.querySelector('.btn-danger');
    deleteButton?.addEventListener('click', () => {
      this.deleteEvent(params);
    });

    return div;
  }

  viewEventDetails(params: any) {
    console.log('params', params);
    this.router.navigate(['/view-event-details/' + params.data.event_id]);
  }

  editEvent(params: any) {
    this.router.navigate(['/update-event/' + params.data.event_id]);
  }

  deleteEvent(params: any) {
    const that = this;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        that.crudService.deleteEvent(params.data.event_id).subscribe(res => {
          if(res.result === "success"){
            this.getEventList();
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          }
        })
      }
    });
  }
}
