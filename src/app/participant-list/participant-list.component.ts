import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnInit {

  rowData: any = [];
  gridOptions = {
    rowHeight: 50,
  };

  constructor(private crudService: CrudService, private router: Router) { }

  ngOnInit(): void {
    this.getParticipantList();
  }

  columnDefs = [
    { field: 'p_id', headerName: 'Participant Id' },
    { field: 'name', headerName: 'Name' },
    { field: 'gender', headerName: 'Gender' },
    {
      field: '',
      headerName: 'Actions',
      cellRenderer: this.actionRender.bind(this),
      width: 300,
    },
  ];

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

  editEvent(params: any) {
    this.router.navigate(['/update-event/' + params.data.event_id]);
  }

  getParticipantList() {
    this.participantListSubscribe = this.crudService.loadParticipants().subscribe((res) => {
      this.eventList = res;
      this.rowData = res;
    });
  }

  eventList: any = [];
  participantListSubscribe: any;

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
            this.getParticipantList();
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          }
        })
      }
    });


}}
