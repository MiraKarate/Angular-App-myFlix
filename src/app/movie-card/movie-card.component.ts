// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';

/**
 * defines movie card componenet
 */
@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss'],
    standalone: true,
    imports: [NgFor, MatCardModule, MatButtonModule, NgIf, MatIconModule]
})
export class MovieCardComponent implements OnInit {
  /**
   * below variables will manage the data received from the API calls 
   * @movies stores the movies array from the database 
   */
  movies: any[] = [];


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (!user) {
      this.router.navigate(['welcome']);
      return;
    }

    this.getMovies();
  }

  /**
   * Fetches all movies using the API call fetchApiData.getAllMovies()
   * @function getMovies
   * @param void
   * @returns an object array of all movies
   * @memberof MovieCardComponent
   * @see FetchApiDataService.getAllMovies()
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;

      return this.movies;
    });
  }

  /**
    * Opens dialog to display genre details
    * @param name of specfic Genre
    * @param description of specific Genre
    */
  openGenreDialog(genre: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: genre.Name,
        content: genre.Description,
      }
    })
  }

  /**
     * Opens dialog to display movie details
     * @param title of movie
     * @param content of movie
     */
  openSynopsisDialog(synopsis: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: "Description",
        content: synopsis,
      }
    })
  }

  /**
    * Opens dialog to display director details
    * @param name of director
    * @param bio of director
    */
  openDirectorDialog(director: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: director.Name,
        content: director.Bio,
      }
    })
  }

  /**
    * Adds movie to user's favorite movies list using the API call fetchApiData.addFavMovie()
    * @function addFavorite
    * @param id of movie, type: string
    */
  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {

      this.snackBar.open('Movie added to favorites.', 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * Determines if a movie id is in the user's favorites list or not
   * @param id of movie, type: string
   * @returns boolean showing movie id is true or false
   * @memberof MovieCardComponent
   * @see FetchApiDataService.isFavoriteMovie()
   */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

  /**
   * Removes movie from user's favorite movies list using the API call fetchApiData.deleteFavMovie()
   * @function removeFavorite
   * @param id of movie, type: string
   */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites.', 'OK', {
        duration: 2000
      });
    });
  }
}