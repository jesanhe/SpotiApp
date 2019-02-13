import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  albums: any[] = [];
  loading: boolean;

  error: boolean;
  errorMessage: string;

  constructor(private spotify: SpotifyService) {
    this.loading = true;
    this.error = false;
    this.errorMessage = '';

    this.spotify.getNewReleases().subscribe(
      (data: any) => {
        console.log(data);
        this.albums = data;
        this.loading = false;
      },
      (err) => {
        this.error = true;
        this.loading = false;
        this.errorMessage = err.error.error.message;
        console.log(err);
        console.log(this.errorMessage);
      },
    );
  }

  ngOnInit() {}
}
