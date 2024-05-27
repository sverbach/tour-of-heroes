import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Hero } from "./hero";
import { HeroesDataService } from "./heroes-data.service";
import { Observable, map, of } from "rxjs";

export const resolveTopHeroes$: ResolveFn<Observable<Hero[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  // Hot observable
  return of(inject(HeroesDataService).heroes$.pipe(map(heroes => heroes.slice(1,5))));
};

export const resolveTopHeroes: ResolveFn<Hero[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  // Resolving cold observable
  return inject(HeroesDataService).heroes$.pipe(map(heroes => heroes.slice(1,5)));
};
