import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: [],
})
export class ArtistComponent implements OnInit {
  artist: any = {};
  TopTracks: any = [];
  loading = false;
  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {
    this.loading = true;
    this.router.params.subscribe((params) => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  ngOnInit() {}

  getArtista(id: string) {
    this.spotify.getArtist(id).subscribe((artista) => {
      this.artist = artista;
      this.loading = false;
    });
  }

  getTopTracks(id: string) {
    this.spotify.getTopTracks(id).subscribe((tracks) => {
      console.log(tracks);
      this.TopTracks = tracks;
    });
  }
}
