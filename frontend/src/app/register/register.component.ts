import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsersRepository } from 'shared/repository-base/users.repository';
import { User, UserType } from 'shared/domain/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  redirectTo : string = '';
    // Form Controls
    usernameFormControl = new FormControl('', [Validators.required]);
    firstNameFormControl = new FormControl('', [Validators.required]);
    lastNameFormControl = new FormControl('', [Validators.required]);
    passwordFormControl = new FormControl('', [Validators.required]);
    cityFormControl = new FormControl('', [Validators.required]);
    
    genderFormControl = new FormControl('', [Validators.required]);
    emailFormControl = new FormControl('', [Validators.required,Validators.email]);
    birthDateFormControl = new FormControl('',[Validators.required])
    addressFormControl = new FormControl('',[Validators.required])
    isLoading : boolean = false;
    hasError : boolean = false;

    constructor(private _router :Router , private _routeState : ActivatedRoute, private _repo : IUsersRepository) {

    }
    hideError() : void{
      this.hasError = false;
    }
    showError() : void {
      console.log('Try showing the error.');
      this.hasError = true;
    }
  
   ngOnInit() {
      this._routeState.queryParams.subscribe(params => this.redirectTo = params['redirectTo'] || 'portal');
    }
  
  async tryRegister(){
    console.log(this.usernameFormControl.value)
    if(!this.usernameFormControl.valid || !this.passwordFormControl.valid) {
      return;
    }
    
    this.hideError();
    this.isLoading = true;
    try{
      let user = new User(null,UserType.CUSTOMER,
        this.usernameFormControl.value,
        this.firstNameFormControl.value,
        this.lastNameFormControl.value,
        this.birthDateFormControl.value,
        this.genderFormControl.value,
        this.cityFormControl.value,
        this.emailFormControl.value,
        this.addressFormControl.value,null,null,false,null)
        console.log(user)
      let response = await this._repo.register(user, this.passwordFormControl.value)
      this._router.navigate(['login'])
    }catch(e) {
      this.showError();
    }finally {
      this.isLoading = false;
    }
  }
}
