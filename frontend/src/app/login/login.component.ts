import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { IUsersRepository } from '../../../../shared/repository-base/users.repository';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  redirectTo : string = '';

  // Form Controls
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  isLoading : boolean = false;
  hasError : boolean = false;

  constructor(private _router : Router, private _routeState : ActivatedRoute, private _repo : IUsersRepository) {

  }

  ngOnInit() {
    this._routeState.queryParams.subscribe(params => this.redirectTo = params['redirectTo'] || 'portal');
  }

  showError() : void {
    console.log('Try showing the error.');
    this.hasError = true;
  }

  hideError() : void{
    this.hasError = false;
  }

  async tryLogin() {
    console.log(this.usernameFormControl.valid);
    if(!this.usernameFormControl.valid || !this.passwordFormControl.valid) {
      return;
    }
    this.hideError();
    this.isLoading = true;
    try{
      let response = await this._repo.login(this.usernameFormControl.value, this.passwordFormControl.value)
      
    }catch(e) {
      this.showError();
    }finally {
      this.isLoading = false;
    }
  }
}
