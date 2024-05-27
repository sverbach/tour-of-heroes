import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Hero } from '../hero';
import { HeroesDataService } from '../heroes-data.service';
import { Observable, of } from 'rxjs';
import { HeroesMobXStore } from '../heroes.mobx.store';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent {
  private readonly heroesDataService = inject(HeroesDataService);
  public readonly mobxStore = inject(HeroesMobXStore);

  @Input()
  heroes$: Observable<Hero[]> = of([]);

  @Input()
  heroes: Hero[] = [];


  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.heroesDataService.addHero({ name } as Hero).subscribe();
  }

  delete(hero: Hero): void {
    this.heroesDataService.deleteHero(hero.id).subscribe();
  }
}
