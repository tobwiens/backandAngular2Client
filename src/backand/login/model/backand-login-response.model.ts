import {Response} from "@angular/http";

export class BackendLoginResponse {

  constructor(private _accessToken:string,
              private _tokenType:string,
              private _expiresIn:string,
              private _appName:string,
              private _username:string,
              private _role:string,
              private _firstName:string,
              private _lastName:string,
              private _fullName:string,
              private _regId:string,
              private _userId:string) {
  }

  public static fromBackAndJsonResponse(jsonResponseString:Response):BackendLoginResponse {
    let jsonResponseObject = jsonResponseString.json();
    return new BackendLoginResponse(
      jsonResponseObject.access_token,
      jsonResponseObject.token_type,
      jsonResponseObject.expires_in,
      jsonResponseObject.appName,
      jsonResponseObject.username,
      jsonResponseObject.role,
      jsonResponseObject.firstName,
      jsonResponseObject.lastName,
      jsonResponseObject.fullName,
      jsonResponseObject.regId,
      jsonResponseObject.userId
    );
  }

  get accessToken():string {
    return this._accessToken;
  }

  get tokenType():string {
    return this._tokenType;
  }

  get expiresIn():string {
    return this._expiresIn;
  }

  get appName():string {
    return this._appName;
  }

  get username():string {
    return this._username;
  }

  get role():string {
    return this._role;
  }

  get firstName():string {
    return this._firstName;
  }

  get lastName():string {
    return this._lastName;
  }

  get fullName():string {
    return this._fullName;
  }

  get regId():string {
    return this._regId;
  }

  get userId():string {
    return this._userId;
  }
}
