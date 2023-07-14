import { Component } from '@angular/core';
import { SearchService } from './pages/search/services/search.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly SearchService: SearchService) {}

  onSearch(term: string): void {
    this.SearchService.search(term)
      .pipe(tap((res) => console.log(res)))
      .subscribe();
  }
}
