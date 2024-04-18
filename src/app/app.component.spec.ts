import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
//import { NavigationComponent } from './navigation/navigation.component';


describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, AppComponent, RouterOutlet]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'myFlix-Angular-client'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('myFlix-Angular-client');
  });

  //it('should render title', () => {
  // const fixture = TestBed.createComponent(AppComponent);
  // fixture.detectChanges();
  // const compiled = fixture.nativeElement as HTMLElement;
  // expect(compiled.querySelector('app-root')?.textContent).toContain('myFlix-Angular-client app is running!');
  //});
});
