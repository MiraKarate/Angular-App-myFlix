import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: WelcomePageComponent }, // Default route
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }