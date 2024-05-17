import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { ResolveData } from '../app-routing.module';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero2!: Hero;
  @Input() set hero(value: ResolveData<Hero>) {
    console.log(value);
    this.hero2 = value.initialValue;
  }

  constructor(
    private location: Location
  ) {
    console.log(this.hero2);
  }

  ngOnInit(): void {
    console.log(this.hero2);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      /*this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());*/
    }
  }
}
