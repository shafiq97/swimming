import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '../models/http-response';
import { Event } from '../models/event';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private httpClient: HttpClient) { }

  loadEvents(){
    const url = environment.API_ENDPOINT + 'view.php';
    return this.httpClient.get(url, httpOptions).pipe(map(data => data));
  }

  loadParticipants(){
    const url = environment.API_ENDPOINT + 'viewParticipants.php';
    return this.httpClient.get(url, httpOptions).pipe(map(data => data));
  }

  createEvent(data: any): Observable<HttpResponse>{
    const url = environment.API_ENDPOINT + 'create.php';
    console.log(url);
    return this.httpClient.post<HttpResponse>(data, url, httpOptions).pipe(map(data => data));
  }

  loadEventInfo(eventId: any): Observable<Event>{
    const url = environment.API_ENDPOINT + 'view_one.php?id=' + eventId;
    console.log(url);
    return this.httpClient.get<Event>(url).pipe(map(data => data));
  }

  deleteEvent(eventId: any){
    const url = environment.API_ENDPOINT + 'delete.php?id=' + eventId;
    return this.httpClient.get<HttpResponse>(url, httpOptions).pipe(map(data => data));
  }
}
