import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {BackandAuthTokenHolderService} from "./backand-login-holder-service.ts";

@Injectable()
export class BackendLoginGuardService implements CanActivate {
  constructor(private backendAuthTokenHolderService:BackandAuthTokenHolderService) {
  }

  canActivate(): boolean {
    return this.backendAuthTokenHolderService.isLoggedIn;
  }
}
