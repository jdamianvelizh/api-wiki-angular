import { Component } from '@angular/core';
import { Article, SearchService } from './pages/search/services/search.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  article$!: Observable<Article[]>
  
    constructor(private readonly SearchService: SearchService) {}

  onSearch(term: string): void {
    this.article$ = this.SearchService.search(term)

  }
}
