import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Hero } from "./hero";
import { HeroesDataService } from "./heroes-data.service";
import { Observable, filter, of, skip } from "rxjs";

export const resolveHeroes$: ResolveFn<Observable<Hero[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  // Hot observable
  return of(inject(HeroesDataService).heroes$);
};

export const resolveHeroes: ResolveFn<Hero[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  // Resolving cold observable
  return inject(HeroesDataService).heroes$;
};
