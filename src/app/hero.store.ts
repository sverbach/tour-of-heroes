import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Hero } from "./hero";

@Injectable({ providedIn: 'root' })
export class HeroStore {
  private readonly heroesSubject = new BehaviorSubject<Hero[]>([]);
  public readonly heroes$ = this.heroesSubject.asObservable();

  setHeroes(heroes: Hero[]) {
    this.heroesSubject.next(heroes);
  }
}
