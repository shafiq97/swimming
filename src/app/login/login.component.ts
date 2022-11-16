import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm!: any;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';
  logged = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(values: any) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    let formData = new FormData();
    formData.append('username', values.username);
    formData.append('password', values.password);

    this.http.post('http://localhost/web_api/login.php', formData).subscribe({
      next: (response) => {
        var x = JSON.parse(JSON.stringify(response));
        console.log(x.result);
        if (x.result === 'success') {
          this.logged = true;
          this.router.navigate(['event-list']);
        } else {
          this.error = 'Invalid Credentials';
          this.loading = false;
        }
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
        console.log(error);
      },
    });
    // this.authenticationService
    //   .login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     (data) => {
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     (error) => {
    //       this.error = error;
    //       this.loading = false;
    //       console.log(error);
    //     }
    //   );
  }
}
