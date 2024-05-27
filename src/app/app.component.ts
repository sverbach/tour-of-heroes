import { Component, inject } from '@angular/core';
import { HeroesDataService } from './heroes-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public readonly heroesDataService = inject(HeroesDataService);

  title = 'Tour of Heroes';
}
