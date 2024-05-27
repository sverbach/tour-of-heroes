import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Hero } from "./hero";
import { HeroesDataService } from "./heroes-data.service";
import { Observable, filter, of } from "rxjs";

export const resolveHeroes: ResolveFn<Observable<Hero[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  // I'm not too sure it makes sense to use data resolvers...
  // Need to wrap the whole thing in a cold-observable in order to get the inner hot-observable.
  return of(inject(HeroesDataService).heroes$);
};
