
import { Injectable } from '@angular/core';
import { catchError, map, tap, } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { AuthInterceptor } from './interceptors/auth.interceptor'; // Import des Interceptors

import { User } from '../interfaces/user.interface';
import { ApiResponse } from '../interfaces/api-response.interface';
import { Director } from '../interfaces/director.interface';
import { Genre } from '../interfaces/genre.interface';
import { Movie } from '../interfaces/movie.interface';


//Declaring the api url that will provide data for the client app
const apiUrl = "https://myflix90.herokuapp.com/";

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  apiUrl = "https://myflix90.herokuapp.com/";
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: User): Observable<ApiResponse> {
    if (!userDetails.Username || !userDetails.Password) {
      return throwError(() => new Error('Invalid username or password'));
    }
    console.log('User-Daten vor dem POST:', userDetails);
    return this.http.post<ApiResponse>(this.apiUrl + 'users', userDetails).pipe(
      tap((responseData) => {
        console.log('Antwort der API:', responseData);
      }), catchError(this.handleError)
    );
  }

  // User Login
  public userLogin(loginDetails: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(apiUrl + 'login', loginDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Get All Movies
  getAllMovies(): Observable<Movie[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('User is not logged in'));
    }
    return this.http.get<Movie[]>(apiUrl + 'movies').pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get One Movie
  getOneMovie(movieId: string): Observable<Movie> {
    const token = localStorage.getItem('token');
    return this.http.get<Movie>(apiUrl + 'movies/' + movieId).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // Get One Director Endpoint
  getOneDirector(directorName: string): Observable<Director> {
    const token = localStorage.getItem('token');
    const encodedDirectorName = encodeURIComponent(directorName); // Leerzeichen codieren
    return this.http.get<Director>(apiUrl + 'movies/director/' + encodedDirectorName).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get One Genre Endpoint
  getOneGenre(genreName: string): Observable<Genre> {
    const token = localStorage.getItem('token');
    return this.http.get<Genre>(apiUrl + 'movies/genre/' + genreName).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Get One User Endpoint
  //Making the api call for the get one user endpoint
  getOneUser(): Observable<User> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  // Edit User Endpoint
  // Making the api call for the edit user endpoint
  editUser(updatedUser: any): Observable<ApiResponse> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    if (!user || !user.Username || !updatedUser.Username || !updatedUser.Password) {
      return throwError(() => new Error('Invalid user data provided'));
    }

    // Send the request to update user data on the server
    return this.http.put<ApiResponse>(apiUrl + 'users/' + user.Username, updatedUser).pipe(
      // Process the server response
      tap((responseData) => {
        // Update the user data in local storage
        const updatedUserData = { ...user, ...updatedUser };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
      }),
      catchError(this.handleError)
    );
  }

  // Delete User Endpoint
  deleteUser(): Observable<void> {
    const userid = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + userid).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  addFavoriteMovie(movieId: string): Observable<ApiResponse> {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.FavoriteMovies) {
      user.FavoriteMovies = [];
    }
    user.FavoriteMovies.push(movieId);
    localStorage.setItem('user', JSON.stringify(user));

    const token = localStorage.getItem('token');
    return this.http.post<ApiResponse>(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.FavoriteMovies.indexOf(movieId) >= 0;
  }

  deleteFavoriteMovie(movieId: string): Observable<ApiResponse> {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.FavoriteMovies) {
      user.FavoriteMovies = [];
    }
    const index = user.FavoriteMovies.indexOf(movieId);
    if (index > -1) {
      user.FavoriteMovies.splice(index, 1);
    }
    localStorage.setItem('user', JSON.stringify(user));

    const token = localStorage.getItem('token');
    return this.http.delete<ApiResponse>(apiUrl + 'users/' + user.Username + '/movies/' + movieId).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.log(error);
      console.log(error.error);
      console.error('Some error occurred:', error.error.message);
    } else {
      console.log(error);
      console.log(error.error);
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    if (error.status === 409) {
      // Wenn der Fehlercode 409 (Konflikt) ist, bedeutet dies, dass der Benutzername bereits existiert
      return throwError(() => new Error('Username already exists'));
    } else {
      // Andernfalls behandeln Sie den Fehler allgemein
      return throwError(() =>
        new Error('Something bad happened; please try again later.')
      );
    }
  }
}