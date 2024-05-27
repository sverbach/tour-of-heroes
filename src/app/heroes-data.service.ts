import { Injectable, inject } from '@angular/core';
import { HeroService } from './hero.service';
import { Observable, ReplaySubject, concatMap, merge, of, tap } from 'rxjs';
import { Hero } from './hero';
import { HeroStore } from './hero.store';

@Injectable({ providedIn: 'root' })
export class HeroesDataService {
  private readonly store = inject(HeroStore);
  private readonly heroService = inject(HeroService);
  private readonly refreshHeroeSubject = new ReplaySubject<void>(1);

  public readonly heroes$ = this.store.heroes$;

  constructor() {
    merge(of(true), this.refreshHeroeSubject.asObservable())
      .pipe(
        concatMap(() => this.heroService.getHeroes()),
        tap((heroes) => this.store.setHeroes(heroes))
      )
      .subscribe();
  }

  refreshHeroes(): void {
    this.refreshHeroeSubject.next();
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.heroService
      .addHero(hero)
      .pipe(tap(() => this.refreshHeroeSubject.next()));
  }

  deleteHero(id: number): Observable<Hero> {
    return this.heroService
      .deleteHero(id)
      .pipe(tap(() => this.refreshHeroeSubject.next()));
  }
}
