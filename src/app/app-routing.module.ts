import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';

import { Observable, ReplaySubject, Subject, buffer, bufferCount, bufferWhen, map, switchMap, take } from 'rxjs';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes/heroes.component';

export type ResolveData<T> = {
  initialValue: T;
  stream: Hot<T>;
  // update: () => void;
}

export class Hot<T> {
  public readonly stream: ReplaySubject<T>;

  constructor(private coldObservable: Observable<T>) {
    this.stream = new ReplaySubject<T>();
    this.refresh();
  }

  public refresh(): void {
    this.coldObservable.subscribe(value => this.stream.next(value));
  }

  public resolve(): Observable<ResolveData<T>> {
    return this.stream.pipe(
      map(value => ({
        initialValue: value,
        stream: this
      })),
      take(1)
    );
  }
}

const resolveHero: ResolveFn<Observable<ResolveData<Hero>>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolveData<Hero>> => {
  const heroService = inject(HeroService);
  const id = parseInt(route.paramMap.get('id')!, 10);

  const hotHeroObservable = new Hot(heroService.getHero(id));

  return hotHeroObservable.resolve();
}

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent, resolve: { hero: resolveHero } },
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    bindToComponentInputs: true
  }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
