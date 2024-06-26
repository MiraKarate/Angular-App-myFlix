import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FetchApiDataService } from './fetch-api-data.service';
import { Movie } from 'src/interfaces/movie.interface';
import { Genre } from 'src/interfaces/genre.interface';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule


describe('FetchApiDataService', () => {
  let service: FetchApiDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    const userData = {
      Username: 'username',
      Password: 'password',
      Email: 'test@example.com',
      Birthday: '1990-09-09'
      // Weitere Eigenschaften, falls erforderlich
    };


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [FetchApiDataService],
    });
    service = TestBed.inject(FetchApiDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  afterEach(() => {
    // Verifiziere, dass keine unerwarteten HTTP-Anfragen offen sind
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle user registration', () => {
    const userData = {
      Username: 'newuser',
      Password: 'newpassword',
      Email: 'newuser@example.com',
      Birthday: '1995-05-05'
    };

    service.userRegistration(userData).subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.user.Username).toBe('newuser');
      expect(response.token).toBeTruthy();
    });

    const req = httpMock.expectOne('https://myflix90.herokuapp.com/users');
    expect(req.request.method).toBe('POST');
    req.flush({ user: userData, token: 'dummyToken' });
  });

  it('should handle user registration error', () => {
    const userData = {
      Username: 'newuser',
      Password: 'newpassword',
      Email: 'newuser@example.com',
      Birthday: '1995-05-05'
    };

    service.userRegistration(userData).subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    const req = httpMock.expectOne('https://myflix90.herokuapp.com/users');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Internal Server Error'));
  });

  it('should handle user registration with empty username or password', () => {
    // Vorbereitung: Bereinige das localStorage
    localStorage.clear();

    // Definiere leere Benutzerdaten
    const emptyUserData = {
      Username: '',
      Password: '',
      Email: 'test@example.com',
      Birthday: '1990-09-09'
    };

    // Führe die Benutzerregistrierung mit leeren Benutzerdaten aus und überwache die Fehlermeldung
    service.userRegistration(emptyUserData).subscribe({
      error: (err) => {
        // Überprüfe, ob der Fehler ordnungsgemäß behandelt wurde und die erwartete Fehlermeldung zurückgegeben wurde
        expect(err).toBeTruthy();
        expect(err.message).toBe('Invalid username or password'); // Erwartete Fehlermeldung für ungültige Benutzerdaten
      }
    });

    // Überprüfe, ob eine HTTP-Anfrage an die Registrierungs-URL gesendet wurde (erwartet wird keine Anfrage)
    const req = httpMock.expectNone('https://myflix90.herokuapp.com/users');
  });


  it('should handle user registration with existing username', () => {
    const existingUser = {
      Username: 'existinguser',
      Password: 'password',
      Email: 'existinguser@example.com',
      Birthday: '1990-01-01'
    };

    // Fügen Sie den vorhandenen Benutzer vor dem Testfall in den lokalen Speicher ein
    localStorage.setItem('user', JSON.stringify(existingUser));
    localStorage.setItem('token', 'dummyToken');

    const newUser = {
      Username: 'existinguser', // Verwenden Sie denselben Benutzernamen wie beim vorhandenen Benutzer
      Password: 'newpassword',
      Email: 'newuser@example.com',
      Birthday: '1995-05-05'
    };

    service.userRegistration(newUser).subscribe({
      error: (err) => {
        // Überprüfen Sie, ob der Fehler ordnungsgemäß behandelt wurde und die erwartete Fehlermeldung zurückgegeben wurde
        expect(err).toBeTruthy();
        expect(err.message).toBe('Username already exists'); // Erwartete Fehlermeldung
      }
    });

    const req = httpMock.expectOne('https://myflix90.herokuapp.com/users');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Conflict'), { status: 409 }); // Simulieren Sie einen Konfliktfehler (Benutzername bereits vorhanden)
  });


  it('should handle user login', () => {
    const loginData = {
      Username: 'username',
      Password: 'password'
    };

    service.userLogin(loginData).subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.user.Username).toBe('username');
      expect(response.token).toBeTruthy();
    });

    const req = httpMock.expectOne('https://myflix90.herokuapp.com/login');
    expect(req.request.method).toBe('POST');
    req.flush({ user: { Username: 'username' }, token: 'dummyToken' });
  });


  it('should handle user login error', () => {
    const loginData = {
      Username: 'username',
      Password: 'password'
    };

    service.userLogin(loginData).subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    const req = httpMock.expectOne('https://myflix90.herokuapp.com/login');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Unauthorized'));
  });



  it('should retrieve all movies', () => {
    const mockMovies: Movie[] = [
      { id: '1', Title: 'Movie 1', Description: 'Description 1', Director: 'Director 1', Genre: 'Genre 1' },
      { id: '2', Title: 'Movie 2', Description: 'Description 2', Director: 'Director 2', Genre: 'Genre 2' }
    ];

    // Fälschen von localStorage.getItem
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ Username: 'testuser' }));


    service.getAllMovies().subscribe(movies => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne('https://myflix90.herokuapp.com/movies');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });


  it('should handle no token provided', () => {
    localStorage.removeItem('token'); // Simuliere, dass kein Token vorhanden ist

    service.getAllMovies().subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
        expect(err.message).toBe('User is not logged in');
      }
    });
  });

  it('should retrieve one genre by name', () => {
    const genreName = 'Science Fiction';
    const mockGenre: Genre = {
      Name: genreName,
      Description: 'Description of Science Fiction genre',
      Movies: [
        { id: '1', Title: 'Movie 1', Description: 'Description 1', Director: 'Director 1', Genre: 'Science Fiction' },
        { id: '2', Title: 'Movie 2', Description: 'Description 2', Director: 'Director 2', Genre: 'Science Fiction' }
      ]
    };

    service.getOneGenre(genreName).subscribe(genre => {
      expect(genre).toEqual(mockGenre);
      expect(genre.Movies.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne('https://myflix90.herokuapp.com/movies/genre/' + genreName);
    expect(req.request.method).toBe('GET');
    req.flush(mockGenre);
  });

  it('should handle empty response when retrieving a genre', () => {
    const genreName = 'Science Fiction';

    service.getOneGenre(genreName).subscribe(genre => {
      expect(genre).toBeTruthy(); // Erwartet, dass die Antwort truthy ist, wenn sie nicht leer ist
      // Weitere Erwartungen basierend auf der Antwort hinzufügen
    });

    const req = httpMock.expectOne('https://myflix90.herokuapp.com/movies/genre/' + genreName);
    expect(req.request.method).toBe('GET');
    req.flush([]); // Simulieren Sie eine leere Serverantwort, indem Sie ein leeres Array zurückschicken
  });

  it('should handle error when retrieving a genre', () => {
    const genreName = 'Non-existent Genre';

    service.getOneGenre(genreName).subscribe({
      error: (err) => {
        expect(err).toBeTruthy(); // Erwartet einen Fehler
      }
    });

    const req = httpMock.expectOne('https://myflix90.herokuapp.com/movies/genre/' + genreName);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Internal Server Error')); // Simulieren Sie einen Fehler bei der Serverantwort
  });


  it('should add a favorite movie to user', () => {
    const movieId = '12345'; // Beispiel-ID für einen Film

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ Username: 'testuser' }));
    spyOn(localStorage, 'setItem');

    service.addFavoriteMovie(movieId).subscribe(response => {
      expect(response).toBeTruthy();
      // Weitere Erwartungen basierend auf der Antwort der API hinzufügen
    });

    const req = httpMock.expectOne('https://myflix90.herokuapp.com/users/testuser/movies/' + movieId);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should add a favorite movie to user when user has no favorite movies', () => {
    // Simulate the case where the user has no favorite movies
    localStorage.setItem('user', JSON.stringify({ Username: 'testuser' }));

    const movieId = '12345';

    service.addFavoriteMovie(movieId).subscribe(response => {
      expect(response).toBeTruthy();
      // Additional expectations based on the API response
    });

    const req = httpMock.expectOne(`https://myflix90.herokuapp.com/users/testuser/movies/${movieId}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should return true if movie is already a favorite', () => {
    const movieId = '12345'; // Beispiel-ID für einen Film

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ FavoriteMovies: [movieId] }));

    const isFavorite = service.isFavoriteMovie(movieId);
    expect(isFavorite).toBe(true);
  });

  it('should delete a favorite movie from user', () => {
    const movieId = '12345'; // Beispiel-ID für einen Film

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ Username: 'testuser' }));
    spyOn(localStorage, 'setItem');

    service.deleteFavoriteMovie(movieId).subscribe(response => {
      expect(response).toBeTruthy();
      // Weitere Erwartungen basierend auf der Antwort der API hinzufügen
    });

    const req = httpMock.expectOne('https://myflix90.herokuapp.com/users/testuser/movies/' + movieId);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should retrieve movie details successfully', () => {
    const movieId = 'Blade%20Runner';
    const mockMovieData: Movie = {
      id: 'Blade Runner',
      Title: 'Blade Runner',
      Description: 'Description of Blade Runner',
      Director: 'Ridley Scott',
      Genre: 'Science Fiction'
    };

    service.getOneMovie(movieId).subscribe(movie => {
      expect(movie).toEqual(mockMovieData);
    });

    const req = httpMock.expectOne(`https://myflix90.herokuapp.com/movies/${movieId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovieData);
  });

  it('should not retrieve movies if user is not logged in', () => {
    // Simuliere den nicht eingeloggten Zustand
    localStorage.removeItem('token');

    // Versuche, auf die Seite /movies zuzugreifen
    service.getAllMovies().subscribe({
      error: (err) => {
        // Erwarte einen Fehler, da der Benutzer nicht eingeloggt ist
        expect(err).toBeTruthy();
      }
    });

    // Überprüfe, ob keine HTTP-Anfrage gesendet wird
    const req = httpMock.expectNone('https://myflix90.herokuapp.com/movies');
  });


  it('should edit user information with new birthday', () => {
    // Fälschen von localStorage.getItem
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ Username: 'testuser', Password: 'oldPassword' }));

    const updatedUserInfo = {
      Username: 'testuser',
      Password: 'password', // Neues Passwort
      Birthday: '1990-01-01' // Neues Geburtsdatum
    };

    service.editUser(updatedUserInfo).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('https://myflix90.herokuapp.com/users/testuser');
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should retrieve one director by name', () => {
    service.getOneDirector('Sir Ridley Scott').subscribe(() => {
      // Erwartungen an die erhaltene Antwort hinzufügen
    });

    const req = httpMock.expectOne('https://myflix90.herokuapp.com/movies/director/Sir%20Ridley%20Scott');
    expect(req.request.method).toBe('GET');
    req.flush({}); // Dummy-Daten für die Antwort
  });


  it('should delete user account', () => {
    service.deleteUser().subscribe(response => {
      expect(response).toBeTruthy(); // Wir erwarten keine Rückgabe, deshalb prüfen wir nur, ob die Anfrage erfolgreich war
    });

    const req = httpMock.expectOne('https://myflix90.herokuapp.com/users/null');
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'User successfully deleted' }); // Hier erwarten wir eine Nachricht, dass der Benutzer erfolgreich gelöscht wurde

    httpMock.verify(); // Stelle sicher, dass alle erwarteten HTTP-Anfragen abgeschlossen wurden
  });

  it('should return an error when user data is missing in local storage while trying to edit user information', () => {
    // Simulate the case where user data is missing in local storage
    localStorage.removeItem('user');

    // Calling the editUser function should return an error
    service.editUser({}).subscribe({
      error: (err) => {
        // Expect an error since user data is missing in local storage
        expect(err).toBeTruthy();
      }
    });

    // Verify that no HTTP request is sent
    const req = httpMock.expectNone('*');
  });

  it('should return an error for invalid user data during user information update', () => {
    const invalidUserData = {
      Username: '', // Invalid username
      Password: 'password',
      Email: 'test@example.com',
      Birthday: '1990-09-09'
    };

    service.editUser(invalidUserData).subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
        expect(err.message).toBe('Invalid user data provided');
      }
    });

    // Verify that no HTTP request is sent
    const req = httpMock.expectNone('*');
  });


});