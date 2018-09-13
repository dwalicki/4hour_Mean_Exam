// Dependencies
import { Component, OnInit } from '@angular/core';

// Providers
import { UserService } from './../../services/user/user.service';
import { Router } from '@angular/router';

// JSON Classes and Interfaces
import { ServerMessage } from './../../classes/server-message';

@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.css']
})
export class LogRegComponent implements OnInit {

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this._userService.ensureUserIsLoggedIn((res) => {

      if (res.success) {
        this._router.navigate(['dashboard']);
      }
    });
  }

}
