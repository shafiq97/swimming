import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser") || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    const url = environment.API_ENDPOINT + 'login.php';
    // post to fake back end, this url will be handled there...
    return this.http
      .post<any>(url, { username, password })
      .pipe(
        map(user => {
          // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
          user.authdata = window.btoa(username + ":" + password);
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
