import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {TestBed} from "@angular/core/testing";
import "rxjs/add/observable/of";
import {HttpModule, Http, Response, ResponseOptions, RequestOptionsArgs} from "@angular/http";
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";
import {BackandLoginService} from "../../../src/backand/login/backand-login-service";
import {BackendLoginResponse} from "../../../src/backand/login/model/backand-login-response.model";

let mockedHttpService, spyHttpServiceRequestMethod, backandRestServiceUnderTest:BackandLoginService;


beforeEach(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    .configureTestingModule({
      declarations: [],
      providers: [BackandLoginService],
      imports: [HttpModule]
    });

  backandRestServiceUnderTest = TestBed.get(BackandLoginService);

  // TwainService actually injected into the component
  mockedHttpService = TestBed.get(Http);


});

it('Call of signIn returns an observable', () => {
  // Setup spy on the `getQuote` method
  spyHttpServiceRequestMethod = spyOn(mockedHttpService, 'get')
    .and.returnValue(Observable.of("awesome"));
  expect(backandRestServiceUnderTest.signIn("user", "password")).toEqual(jasmine.any(Observable));
});

it('AccessToken is set to BackandLoginResponse', () => {
  let mockedResponseOptions:ResponseOptions = new ResponseOptions({
    body: {access_token: 'testAccessToken'}
  });
  let mockedHttpResponse:Response = new Response(mockedResponseOptions);
  // Setup spy on the method
  spyHttpServiceRequestMethod = spyOn(mockedHttpService, 'post')
    .and.returnValue(Observable.of(mockedHttpResponse));
  let response:BackendLoginResponse;
  backandRestServiceUnderTest.signIn("user", "password").subscribe((serviceResponse) => response = serviceResponse);
  expect(response.accessToken).toBe("testAccessToken");
});

it('Expect all values to be set in BackandLoginResponse', () => {
  let mockedResponseOptions:ResponseOptions = new ResponseOptions({
    body: {
      access_token: 'testAccessToken',
      token_type: 'testTokenType',
      expires_in: 'testExpiresIn',
      appName: 'testAppName',
      username: 'testUsername',
      role: 'testRole',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      fullName: 'testFullName',
      regId: 'testRegId',
      userId: 'testUserId'
    }
  });
  let mockedHttpResponse:Response = new Response(mockedResponseOptions);
  // Setup spy on the method
  spyHttpServiceRequestMethod = spyOn(mockedHttpService, 'post')
    .and.returnValue(Observable.of(mockedHttpResponse));
  let response:BackendLoginResponse;
  backandRestServiceUnderTest.signIn("user", "password").subscribe((serviceResponse) => response = serviceResponse);
  expect(response.accessToken).toBe("testAccessToken");
  expect(response.tokenType).toBe("testTokenType");
  expect(response.expiresIn).toBe("testExpiresIn");
  expect(response.appName).toBe("testAppName");
  expect(response.username).toBe("testUsername");
  expect(response.role).toBe("testRole");
  expect(response.firstName).toBe("testFirstName");
  expect(response.lastName).toBe("testLastName");
  expect(response.fullName).toBe("testFullName");
  expect(response.regId).toBe("testRegId");
  expect(response.userId).toBe("testUserId");
});

it('AccessToken is undefined if not set to BackandLoginResponse', () => {
  let mockedResponseOptions:ResponseOptions = new ResponseOptions({
    body: {}
  });
  let mockedHttpResponse:Response = new Response(mockedResponseOptions);
  // Setup spy on the method
  spyHttpServiceRequestMethod = spyOn(mockedHttpService, 'post')
    .and.returnValue(Observable.of(mockedHttpResponse));
  let response:BackendLoginResponse;
  backandRestServiceUnderTest.signIn("user", "password").subscribe((serviceResponse) => response = serviceResponse);
  expect(response.accessToken).toBeUndefined()
});

it('Login Header Content-Type is application/x-www-form-urlencoded', () => {
  let mockedResponseOptions:ResponseOptions = new ResponseOptions({
    body: {}
  });
  let mockedHttpResponse:Response = new Response(mockedResponseOptions);

  let extractedContentType:string;
  // Setup spy on the method
  spyHttpServiceRequestMethod = spyOn(mockedHttpService, 'post')
    .and
    .callFake((url:string, credentials:string, requestOptions:RequestOptionsArgs) => {
      extractedContentType = requestOptions.headers.get('Content-Type');
      return Observable.of(mockedHttpResponse);
    });
  backandRestServiceUnderTest.signIn("user", "password");

  expect(extractedContentType).toBe('application/x-www-form-urlencoded')
});

it('Credentials contain provided username', () => {
  let mockedResponseOptions:ResponseOptions = new ResponseOptions({
    body: {}
  });
  let mockedHttpResponse:Response = new Response(mockedResponseOptions);

  let extractedCredentials:string;
  // Setup spy on the method
  spyHttpServiceRequestMethod = spyOn(mockedHttpService, 'post')
    .and
    .callFake((url:string, credentials:string, requestOptions:RequestOptionsArgs) => {
      extractedCredentials = credentials;
      return Observable.of(mockedHttpResponse);
    });
  backandRestServiceUnderTest.signIn("user8465gjSecret", "password");

  expect(extractedCredentials).toContain("user8465gjSecret")
});

it('Credentials contain provided AppName', () => {
  let mockedResponseOptions:ResponseOptions = new ResponseOptions({
    body: {}
  });
  let mockedHttpResponse:Response = new Response(mockedResponseOptions);

  let extractedCredentials:string;
  // Setup spy on the method
  spyHttpServiceRequestMethod = spyOn(mockedHttpService, 'post')
    .and
    .callFake((url:string, credentials:string, requestOptions:RequestOptionsArgs) => {
      extractedCredentials = credentials;
      return Observable.of(mockedHttpResponse);
    });
  backandRestServiceUnderTest.signIn("user8465gjSecret", "password");

  expect(extractedCredentials).toContain("user8465gjSecret")
});

it('Credentials contain provided password', () => {
  let mockedResponseOptions:ResponseOptions = new ResponseOptions({
    body: {}
  });
  let mockedHttpResponse:Response = new Response(mockedResponseOptions);

  let extractedCredentials:string;
  // Setup spy on the method
  spyHttpServiceRequestMethod = spyOn(mockedHttpService, 'post')
    .and
    .callFake((url:string, credentials:string, requestOptions:RequestOptionsArgs) => {
      extractedCredentials = credentials;
      return Observable.of(mockedHttpResponse);
    });
  backandRestServiceUnderTest.signIn("user8465gjSecret", "password456jnd423fs78Se3278");

  expect(extractedCredentials).toContain("password456jnd423fs78Se3278")
});

it('Credentials contain grant_type password', () => {
  let mockedResponseOptions:ResponseOptions = new ResponseOptions({
    body: {}
  });
  let mockedHttpResponse:Response = new Response(mockedResponseOptions);

  let extractedCredentials:string;
  // Setup spy on the method
  spyHttpServiceRequestMethod = spyOn(mockedHttpService, 'post')
    .and
    .callFake((url:string, credentials:string, requestOptions:RequestOptionsArgs) => {
      extractedCredentials = credentials;
      return Observable.of(mockedHttpResponse);
    });
  backandRestServiceUnderTest.signIn("user", "pass");

  expect(extractedCredentials).toContain("grant_type=password")
});

it('Throw and forward error to caller', () => {
  let mockedResponseOptions:ResponseOptions = new ResponseOptions({
    body: {}
  });
  let mockedHttpResponse:Response = new Response(mockedResponseOptions);
  // Setup spy on the method
  spyHttpServiceRequestMethod = spyOn(mockedHttpService, 'post')
    .and.returnValue(Observable.throw("Test threw error"));
  let httpError;
  let response:BackendLoginResponse;

  try {
    backandRestServiceUnderTest.signIn("user", "password")
      .subscribe((serviceResponse) => response = serviceResponse);
  } catch (error) {
    httpError = error;
  }
  expect(httpError).toBe("Test threw error");
});


it('Write simple message if error is thrown but undefined', () => {
  let mockedResponseOptions:ResponseOptions = new ResponseOptions({
    body: {}
  });
  let mockedHttpResponse:Response = new Response(mockedResponseOptions);
  // Setup spy on the method
  spyHttpServiceRequestMethod = spyOn(mockedHttpService, 'post')
    .and.returnValue(Observable.throw(undefined));
  let httpError;
  let response:BackendLoginResponse;

  try {
    backandRestServiceUnderTest.signIn("user", "password")
      .subscribe((serviceResponse) => response = serviceResponse);
  } catch (error) {
    httpError = error;
  }
  expect(httpError).toBe("Server error");
});

