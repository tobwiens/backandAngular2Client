import {Http, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import {BackendLoginResponse} from "./backand-login-response.model";


@Injectable()
export class BackandLoginService {
  private _apiUrl:string = "https://api.backand.com";
  private _appName:string = "timesheetcrusher";

  constructor(public http:Http) {
  }

  public get appName() {
    return this._appName;
  }

  public get tokenUrl() {
    return this._apiUrl + '/token';
  }

  private createBackandCredentials(username:string, password:string): string {
    return  `username=${username}` +
      `&password=${password}` +
      `&appName=${this.appName}` +
      `&grant_type=password`;
  }

  private createBackendLoginHeader(): Headers {
    let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return header;
  }

  public signIn(username:string, password:string):Observable<BackendLoginResponse> {
    let creds = this.createBackandCredentials(username, password);
    let header = this.createBackendLoginHeader();

    return this.http.post(this.tokenUrl, creds, {
      headers: header
    })
      .catch(this.handleServerError)
      .map(response => BackendLoginResponse.fromBackAndJsonResponse(response))
  }

  handleServerError(error:any):Observable<any> {
    console.error('Error: ' + error);
    return Observable.throw(error || 'Server error');
  }

}
