import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";
import {Http} from "@angular/http";
import {async, inject, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";
import "rxjs/add/observable/of";
import {Observable} from "rxjs/Observable";
import {BackandRestService} from "../../src/backand/backand-rest.service";

let backandRestServiceUnderTest, mockedHttpService, spyHttpServiceRequestMethod;

beforeEach(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    .configureTestingModule({
      declarations: [],
      providers: [BackandRestService],
      imports: [HttpModule]
    });

  backandRestServiceUnderTest = TestBed.get(BackandRestService);

    // TwainService actually injected into the component
  mockedHttpService = TestBed.get(Http);

  // Setup spy on the `getQuote` method
  spyHttpServiceRequestMethod = spyOn(mockedHttpService, 'get')
    .and.returnValue(Observable.of('awesome'));
});

it('should get some data', async(inject([], () => {
  mockedHttpService.get('data.json').subscribe((res) => {
    expect(res).toBe('awesome');
  });
})));

