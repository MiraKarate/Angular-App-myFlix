
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

<img width="1490" alt="angular_myflix_movieview" src="https://github.com/MiraKarate/Angular-App-myFlix/assets/124045048/b5e9c7f8-b060-4f38-b999-99140c75c163">

### Details Movie View

- Displays detailed data (description, genre, director, image) about a single movie to the user.
- Allows users to add a movie to their list of favorites.

<img width="1304" alt="angular_myflix_genre" src="https://github.com/MiraKarate/Angular-App-myFlix/assets/124045048/218b3526-c3d1-4068-a47e-d8f55654c782">
<img width="1066" alt="angular_myflix_director" src="https://github.com/MiraKarate/Angular-App-myFlix/assets/124045048/def3539f-9b4f-4743-8af5-069606088442">
<img width="861" alt="angular_myflix_description" src="https://github.com/MiraKarate/Angular-App-myFlix/assets/124045048/9c70d808-cafd-430e-8ca1-51abb7d27831">
<img width="1010" alt="angular_myflix_favorites" src="https://github.com/MiraKarate/Angular-App-myFlix/assets/124045048/564639c8-7aee-4477-a4a1-c1da4a654ac6">

### Signup View

- Allows new users to register with their username, password, email, and date of birth.
  
<img width="1496" alt="Angular_myflix_welcome" src="https://github.com/MiraKarate/Angular-App-myFlix/assets/124045048/2e7fe2ca-998c-4030-8f47-a2caea1205c5">

### Login View

- Enables users to log in with a username and password.

<img width="739" alt="angular_myflix_login" src="https://github.com/MiraKarate/Angular-App-myFlix/assets/124045048/d3194eb2-2124-4f38-ab89-a917aec8db37">


### Profile View

- Displays user registration details.
- Allows users to update their info (username, password, email, date of birth).
- Shows favorite movies and allows users to remove a movie from their favorites.
- Permits existing users to deregister.

<img width="1486" alt="angular_myflix_profile" src="https://github.com/MiraKarate/Angular-App-myFlix/assets/124045048/6957d164-5b38-458a-8929-9640b6cbb244">


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


