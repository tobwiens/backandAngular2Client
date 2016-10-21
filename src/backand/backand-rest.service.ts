import {Injectable} from "@angular/core";
import {Response, Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map"
import {UsersResponseBackand} from "./backand-rest.model";


@Injectable()
export class BackandRestService {


  constructor(private http:Http) {
  }

  getUsersFromDatabase():Observable<UsersResponseBackand[]> {
    let params:URLSearchParams = new URLSearchParams();
    params.set('pageSize', '20');
    params.set('pageNumber', '1');
    params.set('filter', '[]');
    params.set('sort', '');

    return this.http.get(
      'https://api.backand.com' + '/1/objects/users',
      {
        search: params
      }
    ).map(this.extractData);
  }

  private extractData(res:Response) {
    let body = res.json();
    return body || {};
  }
}
