import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FetchApiDataService } from './fetch-api-data.service';

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

    // Benutzerdaten im lokalen Speicher vor jedem Test initialisieren
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', 'dummyToken');



    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FetchApiDataService],
    });
    service = TestBed.inject(FetchApiDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifiziere, dass keine unerwarteten HTTP-Anfragen offen sind
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all movies', () => {
    const mockMovies = [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }];

    service.getAllMovies().subscribe(movies => {
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne('https://myflix90.herokuapp.com/movies');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });


  it('should retrieve one genre by name', () => {
    const genreName = 'Science Fiction';

    service.getOneGenre(genreName).subscribe(genre => {
      expect(genre).toBeTruthy();
      // Weitere Erwartungen basierend auf der Antwort der API hinzufügen
    });

    const req = httpMock.expectOne('https://myflix90.herokuapp.com/movies/genre/' + genreName);
    expect(req.request.method).toBe('GET');
    req.flush({});
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

  it('should retrieve one movie by ID', () => {
    const movieId = 'Blade%20Runner'; // Titel des Films als ID
    service.getOneMovie(movieId).subscribe(movie => {
      expect(movie).toBeTruthy();
      // Weitere Erwartungen basierend auf der Antwort der API hinzufügen
    });

    const req = httpMock.expectOne(`https://myflix90.herokuapp.com/movies/${movieId}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should edit user information with new birthday', () => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const updatedUserInfo = {
        Username: user.Username,
        Password: 'password', // Neues Passwort
        Email: user.Email,
        Birthday: '1990-01-01' // Neues Geburtsdatum
      };

      // Fälschen von localStorage.getItem
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ Username: 'testuser', Password: 'oldPassword' }));

      // Fälschen von localStorage.setItem
      const setItemSpy = spyOn(localStorage, 'setItem');

      service.editUser(updatedUserInfo).subscribe(response => {
        expect(response).toBeTruthy();
        // Überprüfen, ob die Daten im lokalen Speicher aktualisiert wurden
        expect(setItemSpy).toHaveBeenCalledWith('user', JSON.stringify(updatedUserInfo));
      });

      const req = httpMock.expectOne('https://myflix90.herokuapp.com/users/testuser');
      expect(req.request.method).toBe('PUT');
      req.flush({});
    } else {
      fail('User data not found in local storage');
    }
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
    service.deleteUser().subscribe(() => {
      // Erwartungen an die gelöschte Benutzerkontenaktion hinzufügen
    });

    const req = httpMock.expectOne('https://myflix90.herokuapp.com/users/null');
    expect(req.request.method).toBe('DELETE');
    req.flush({}); // Dummy-Daten für die Antwort

    httpMock.verify(); // Stelle sicher, dass alle erwarteten Anfragen abgeschlossen wurden
  });


});