
import { Injectable } from '@angular/core';
import { catchError, map, tap, } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { AuthInterceptor } from './interceptors/auth.interceptor'; // Import des Interceptors

interface User {
  Username?: string;
  Password?: string;
  Email?: string;
  Birthday?: string;
}

interface ApiResponse {
  user: User;
  token: string;
}


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
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies').pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get One Movie
  getOneMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + movieId).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // Get One Director Endpoint
  getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    const encodedDirectorName = encodeURIComponent(directorName); // Leerzeichen codieren
    return this.http.get(apiUrl + 'movies/director/' + encodedDirectorName).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get One Genre Endpoint
  getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName).pipe(
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
  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    // Führe die Aktualisierung der Benutzerdaten auf dem Server durch
    return this.http.put(apiUrl + 'users/' + user.Username, updatedUser).pipe(
      // Verarbeite die Antwort des Servers
      tap((responseData) => {
        // Aktualisiere die Benutzerdaten im lokalen Speicher
        const updatedUserData = { ...user, ...updatedUser };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
      }),
      catchError(this.handleError)
    );
  }


  // Delete User Endpoint
  deleteUser(): Observable<any> {
    const userid = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + userid).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }



  addFavoriteMovie(movieId: string): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.FavoriteMovies) {
      user.FavoriteMovies = [];
    }
    user.FavoriteMovies.push(movieId);
    localStorage.setItem('user', JSON.stringify(user));

    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {}, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
      responseType: "text"
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.FavoriteMovies.indexOf(movieId) >= 0;
  }

  deleteFavoriteMovie(movieId: string): Observable<any> {
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
    return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
      responseType: "text"
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
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
    return throwError(() =>
      new Error('Something bad happened; please try again later.'));
  }
}