import { Injectable, inject } from '@angular/core';
import { HeroService } from './hero.service';
import { Observable, ReplaySubject, concatMap, merge, of, tap } from 'rxjs';
import { Hero } from './hero';
import { HeroesStore } from './heroes.store';
import { HeroesMobXStore } from './heroes.mobx.store';

@Injectable({ providedIn: 'root' })
export class HeroesDataService {
  private readonly mobxStore = inject(HeroesMobXStore);
  private readonly store = inject(HeroesStore);
  private readonly heroService = inject(HeroService);
  private readonly refreshHeroeSubject = new ReplaySubject<void>(1);

  public readonly heroes$ = this.store.heroes$;

  constructor() {
    // this might be further abstracted into some "heroes store sync"-service.
    merge(of(true), this.refreshHeroeSubject.asObservable())
      .pipe(
        concatMap(() => this.heroService.getHeroes()),
        tap((heroes) => this.store.setHeroes([...heroes])),
        tap((heroes) => this.mobxStore.setHeroes([...heroes])),
      )
      .subscribe();
  }

  // in case we need to manually sync. ideally we don't need that.
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
