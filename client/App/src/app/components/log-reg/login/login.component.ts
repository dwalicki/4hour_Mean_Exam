// Dependencies
import { Component, OnInit } from '@angular/core';

// Providers
import { UserService } from './../../../services/user/user.service';
import { Router } from '@angular/router';

// JSON Classes and Interfaces
import { User } from '../../../classes/user';
import { IUser } from '../../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser;
  serverMessage: string;
  constructor(private _router: Router, private _userService: UserService) {
    this.user = new User();
    this.serverMessage = '';
  }

  ngOnInit() {
  }

  login() {
    this._userService.registerUser(this.user, (res) => {

      console.log(res);
      if (res.success) {
        this._userService.user.next(res.output);
        this._router.navigate(['dashboard']);
      } else {
        this.serverMessage = res.output.message;
      }
    });
  }

}
