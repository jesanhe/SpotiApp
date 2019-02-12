import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  // token =
  //   'Bearer BQAlkT6FIiw-MhoFaA_dvNtnSUwjEZh10HpqZJLy9m4xd-OrFEIiU_bGfvmBvaH1AGNKM4eR9fNcmZxlAsk';

  constructor(private http: HttpClient) {
    console.log('Spotify Service Ready');
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQDmv3LcNb7ICjL0txRlpR4nSTwg2KpFvdhnpBOd5M8jV1F7tUj3fou7WBI4xzEpQAyAh5xNrDPkXUqZP1c',
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    // const headers = new HttpHeaders({
    //   Authorization: this.token,
    // });

    return this.getQuery('browse/new-releases?limit=20').pipe(
      map((data) => {
        return data['albums'].items;
      }),
    );

    // this.http
    //   .get('https://api.spotify.com/v1/browse/new-releases?limit=20', {
    //     headers,
    //   })
    //   .pipe(
    //     map((data) => {
    //       return data['albums'].items;
    //     }),
    //   );
  }

  getArtists(termino: string) {
    // const headers = new HttpHeaders({
    //   Authorization: this.token,
    // });

    return this.getQuery(
      `search?q=${termino.trim()}&type=artist&market=ES`,
    ).pipe(map((data) => data['artists'].items));

    // this.http
    //   .get(
    //     `https://api.spotify.com/v1/search?q=${termino}&type=artist&market=ES`,
    //     {
    //       headers,
    //     },
    //   )
    //   .pipe(map((data) => data['artists'].items));
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`);
    // .pipe(
    //   map((data) => data['artists'].items),
    // );
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=ES`).pipe(
      map((data) => data['tracks']),
    );
  }

  getToken() {
    const body = {
      grant_type: 'client_credentials',
      client_id: '9ebafbf77ae84234ada1d8eccf30d208',
      client_secret: '9deb2f52061e4724848a3ec0601ce798',
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    this.http
      .post('https://accounts.spotify.com/api/token', body, { headers })
      .subscribe((token) => console.log(token));
  }
}
