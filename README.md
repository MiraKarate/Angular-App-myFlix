
# MyFlix Angular App (Client-Side) 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.3.

## About the MyFlix Angular App

The MyFlix Angular App is a client-side application for managing and browsing movie data. It interacts with a server-side application, which provides a RESTful API for managing and retrieving movie data. It is designed to provide an intuitive and user-friendly interface for users interested in movies. The client-side of the myFlix app includes several interface views that will handle data through the (previously defined) REST API endpoints.    

## Essential Views & Features:

### Main View

- Returns a list of all movies to the user, each movie item with an image, title, and description.
- Provides a search feature to filter the list of movies.
- Allows users to select a movie for more details.
- Enables users to log out and navigate to the Profile view.

### Single Movie View

- Displays detailed data (description, genre, director, image) about a single movie to the user.
- Allows users to add a movie to their list of favorites.

### Signup View

- Allows new users to register with their username, password, email, and date of birth.

### Login View

- Enables users to log in with a username and password.

### Profile View

- Displays user registration details.
- Allows users to update their info (username, password, email, date of birth).
- Shows favorite movies and allows users to remove a movie from their favorites.
- Permits existing users to deregister.

## About Angular 
MyFlix App is a client-side application built using Angular. Angular is a powerful JavaScript framework for building web applications with dynamic and interactive user interfaces. It's widely used for creating single-page applications (SPAs) and is designed for large-scale, complex projects.

If you're new to Angular, you may find it helpful to explore the Angular documentation to gain a better understanding of how this client-side application is structured and how components are used to build the user interface.

For more information and resources about Angular, visit the official Angular website.

## Development Server

To run the development server, follow these steps:

1. Clone this repository to your local machine:

2. Navigate to the project directory:

3. Install project dependencies:

 ```bash
npm install
```

4. Start the development server:

 ```bash
ng serve
```

5. Open your web browser and go to http://localhost:4200 to access the application.

Explore the application's features, interact with it, and customize it to your specific project requirements.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Contributions
Contributions to this project are welcome. You can contribute by submitting pull requests, reporting issues, or improving the codebase. Please follow the established guidelines for contributing.


