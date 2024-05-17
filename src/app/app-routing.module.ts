import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';

import { Observable, Subject, buffer, bufferCount, bufferWhen, map, switchMap } from 'rxjs';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes/heroes.component';

export type ResolveData<T> = {
  initialValue: T;
  stream: Observable<T>;
  // update: () => void;
}

const resolveHero: ResolveFn<Observable<ResolveData<Hero>>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolveData<Hero>> => {
  const heroService = inject(HeroService);
  const id = parseInt(route.paramMap.get('id')!, 10);

  const coldHeroObservable = heroService.getHero(id);

  return coldHeroObservable.pipe(
    bufferCount(1),
    map(hero => ({
      initialValue: hero[0],
      stream: coldHeroObservable
    }))
  );
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
