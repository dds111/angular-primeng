import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { PaginatorModule } from 'primeng/paginator';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, ToolbarModule, InputTextModule, FormsModule, CommonModule, CardModule, RouterModule, DropdownModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private api = inject(ApiService);
  movies = signal<any[]>([]);
  pagedMovies = signal<any[]>([]);

  query: string = '';
  selectedGenreId?: string;
  selectedYear?: string;
  totalRecords = 0;

  genres: { id: string; name: string }[] = [];
  yearOptions: { label: string; value: string }[] = [];

  pageSize = 20;
  first = 0;

  onPageChange(event: any) {
    this.first = event.first;
    this.pageSize = event.rows;
    const page = event.page + 1; // PrimeNG uses 0-based, TMDb uses 1-based

    this.loadData(page);
  }

  updatePagedMovies() {
    const start = this.first;
    const end = this.first + this.pageSize;
    this.pagedMovies.set(this.movies().slice(start, end));
  }

  constructor() { }

  ngOnInit() {
    this.loadGenres();
    this.loadYearOptions();
    this.loadData(1); // initial page
  }

  loadGenres() {
    this.api.getGenres().subscribe(data => {
      this.genres = data.genres;
    });
  }

  loadYearOptions() {
    const currentYear = new Date().getFullYear();
    this.yearOptions = Array.from({ length: 50 }, (_, i) => {
      const year = currentYear - i;
      return { label: year.toString(), value: year.toString() };
    });
  }

  loadData(page: number = 1) {
    if (page === 1) {
      this.first = 0; // ⬅️ resets paginator to the first page
    }
    if (this.query.trim()) {
      this.api.searchMovies(this.query, page).subscribe(data => {
        this.movies.set(data.results ?? []);
        this.totalRecords = data.total_results;
      });
    } else {
      this.api.discoverMovies({
        genreId: this.selectedGenreId?.toString(),
        year: this.selectedYear,
        page
      }).subscribe(data => {
        this.movies.set(data.results ?? []);
        this.totalRecords = data.total_results;
      });
    }
  }
}
