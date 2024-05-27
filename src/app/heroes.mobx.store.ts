import { Injectable } from "@angular/core";
import { action, computed, makeObservable, observable } from "mobx";
import { Hero } from "./hero";

@Injectable({ providedIn: "root" })
export class HeroesMobXStore {
  @observable.shallow public heroes: Hero[] = [];

  constructor() {
    makeObservable(this);
  }

  @action
  public setHeroes(heroes: Hero[]) {
    this.heroes = heroes;
  }
}
