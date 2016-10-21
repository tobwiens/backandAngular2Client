import {Injectable} from "@angular/core";
import {BackandLoginService} from "./backand-login-service.ts";
import {BackendLoginResponse} from "./backand-login-response.model";

@Injectable()
export class BackandAuthTokenHolderService {
  private auth_token:{ header_name:string, header_value:string} = {header_name: "Authorization", header_value: ''};
  private _isLoggedIn:boolean = false;

  constructor(private backandLoginService:BackandLoginService) {
  }

  private setToken(backendLoginResponse:BackendLoginResponse) {
    if (backendLoginResponse) {
      this.auth_token.header_value = "Bearer " + backendLoginResponse.accessToken;
    }
  }

  signInAndCallback(username:string, password:string, successCallback:() => any, errorCallback:(error:any) => any) {
    this.backandLoginService
      .signIn(username, password)
      .subscribe(
        backendLoginResponse => this.setToken(backendLoginResponse),
        error => this.errorCallback(error, errorCallback),
        () => this.successCallback(successCallback)
      );
  }

  successCallback(successCallback:() => any):void {
    this._isLoggedIn = true;
    console.info("Success in login holder");
    // Execute user provided callback
    if (successCallback) {
      successCallback();
    }
  }

  errorCallback(error:any, errorCallback:(error:any) => any):void {
    this._isLoggedIn = false;
    console.error("Error callback in login holder");
    // Execute user provided callback
    if (errorCallback) {
      errorCallback(error);
    }
  }

  signIn(username:string, password:string) {
    this.signInAndCallback(username, password, null, null);
  }

  get isLoggedIn():boolean {
    return this._isLoggedIn;
  }

}
