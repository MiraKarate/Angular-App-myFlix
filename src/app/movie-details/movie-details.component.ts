import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog component for displaying movie details
 */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})

/**
   * @constructor is used to set dependencies
   * @param data - specific movie data, received from moviecard via MAT_DIALOG_DATA
   * @property {string} title - movie title
   * @property {string} content - description of the movie
   */

export class MovieDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string,
      content: string,
    }
  ) { }

  /** this function implements OnInit when the component is initialized */
  ngOnInit(): void { }

}