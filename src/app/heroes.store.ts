import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { Hero } from "./hero";

@Injectable({ providedIn: 'root' })
export class HeroesStore {
  private readonly heroesSubject = new ReplaySubject<Hero[]>(1);
  public readonly heroes$ = this.heroesSubject.asObservable();

  setHeroes(heroes: Hero[]) {
    this.heroesSubject.next(heroes);
  }
}
