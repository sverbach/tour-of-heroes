import { Component, Input, inject } from '@angular/core';
import { Hero } from '../hero';
import { HeroesDataService } from '../heroes-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  private readonly heroesDataService = inject(HeroesDataService);

  @Input()
  heroes$!: Observable<Hero[]>

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.heroesDataService.addHero({ name } as Hero).subscribe();
  }

  delete(hero: Hero): void {
    this.heroesDataService.deleteHero(hero.id).subscribe();
  }
}
