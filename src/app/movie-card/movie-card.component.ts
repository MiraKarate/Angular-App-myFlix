// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
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
   * This method will get all movies from the database
   * @param void
   * @returns movies array
   * @memberof MovieCardComponent
   * @see FetchApiDataService.getAllMovies()
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;

      return this.movies;
    });
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: genre.Name,
        content: genre.Description,
      }
    })
  }

  openSynopsisDialog(synopsis: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: "Description",
        content: synopsis,
      }
    })
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: director.Name,
        content: director.Bio,
      }
    })
  }

  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {

      this.snackBar.open('Movie added to favorites.', 'OK', {
        duration: 2000
      });
    });
  }
  /**
   * 
   * @param id 
   * @memberof MovieCardComponent
   * @see FetchApiDataService.isFavoriteMovie()
   * @example isFavorite()
   * @example removeFavorite()
   */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites.', 'OK', {
        duration: 2000
      });
    });
  }
}