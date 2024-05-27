import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DataResolver } from './data-loading/data-stream';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes/heroes.component';
import { resolveTopHeroes, resolveTopHeroes$ } from './top-heroes.resolver';
import { resolveHeroes, resolveHeroes$ } from './heroes.resolver';

// REFERENCE: Expose Data Stream via resolverFn
const resolveHero: ResolveFn<DataResolver<Hero>> = (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot
): DataResolver<Hero> => {
  const heroService = inject(HeroService);
  const id = parseInt(route.paramMap.get('id')!, 10);

  return new DataResolver(heroService.getHero(id));
};

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: {
      heroes$: resolveTopHeroes$,
      heroes: resolveTopHeroes
    },
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent,
    resolve: { hero: resolveHero },
  },
  {
    path: 'heroes',
    component: HeroesComponent,
    resolve: {
      heroes$: resolveHeroes$,
      heroes: resolveHeroes
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
