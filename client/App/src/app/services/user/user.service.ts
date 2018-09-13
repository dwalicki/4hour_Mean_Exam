// Injections
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// JSON Classes and Interfaces
import { ServerMessage } from './../../classes/server-message';
import { IServerMessage } from './../../interfaces/server-message';
import { IUser } from './../../interfaces/user';
import { User } from '../../classes/user';

// Service Dependencies
import * as uriBuilder from 'build-url';
import { BehaviorSubject } from 'Rxjs';

/**
 * User Service class is used to do api classes to the backend
 * Contains User data and other information
 */
@Injectable()
export class UserService {

  user: BehaviorSubject<IUser>;

  /**
   * base constructor
   * @param _http injectable
   */
  constructor(private _http: HttpClient) {
    this.user = new BehaviorSubject(new User());
  }


  /**
   * build a uri based on the current classes requests
   * @param query uri query location on local hostname
   * @returns {string} uri location
   */
  private _localAPIBuild(query: string): string {
    return uriBuilder('', {
      path: `api/${query}`
    });
  }

  /**
   * queries the backend if the user is currently logged in or not
   * @param {callback: (res: IServerMessage)} callback callback to run after backend response
   */
  ensureUserIsLoggedIn(callback: (res: IServerMessage<IUser>) => void): void {
    const uri = this._localAPIBuild('is-logged');
    this._http.get(uri).subscribe((response: IServerMessage<IUser>) => {
      this.user.next(response.output);
      callback(response);
    });
  }

  /**
   * register a user to the database
   * @param {IUser} user user data to attempt to add to the database
   */
  registerUser(user: IUser, callback: (res: IServerMessage<IUser>) => void): void {
    const uri = this._localAPIBuild('register');
    this._http.post(uri, user).subscribe((response: IServerMessage<IUser>) => {
      this.user.next(response.output);
      callback(response);
    });
  }

  logoutUser(callback: (res: IServerMessage<{ message: string }>) => void): void {
    const uri = this._localAPIBuild('logout');
    this._http.get(uri).subscribe((response: IServerMessage<{ message: string }>) => callback(response));
  }
}