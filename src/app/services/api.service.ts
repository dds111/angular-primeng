import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { MovieDetail, MovieSearchResult } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiKey = '44a30aebe858d93181f87a11475a2134';
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}


  // 🎬 Get details for one movie by ID
  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${movieId}`, {
      params: { api_key: this.apiKey }
    });
  }

  // 🎭 Get list of genres
  getGenres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/genre/movie/list`, {
      params: { api_key: this.apiKey }
    });
  }

  getPopularMovies(page: number = 1): Observable<any> {
  return this.http.get(`${this.apiUrl}/movie/popular`, {
    params: {
      api_key: this.apiKey,
      page
    }
  });
}

searchMovies(query: string, page: number = 1): Observable<any> {
  return this.http.get(`${this.apiUrl}/search/movie`, {
    params: {
      api_key: this.apiKey,
      query,
      page
    }
  });
}

discoverMovies(filters: { genreId?: string; year?: string; page?: number }): Observable<any> {
  const params: any = {
    api_key: this.apiKey,
    page: filters.page ?? 1,
    ...(filters.genreId && { with_genres: filters.genreId }),
    ...(filters.year && { year: filters.year })
  };

  return this.http.get(`${this.apiUrl}/discover/movie`, { params });
}

}
