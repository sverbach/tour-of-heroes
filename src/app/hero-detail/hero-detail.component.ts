import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Hero } from '../hero';
import { DataStream } from '../data-loading/data-stream';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero2!: Hero;
  @Input() set hero(value: DataStream<Hero>) {
    console.log(value);
    this.hero2 = value.initialValue!;
    value.refresh();
    value.refresh();
    value.refresh();
    value.refresh();
    value.stream.subscribe(console.log);
  }

  constructor(
    private location: Location,
    router: Router
  ) {
    console.log(this.hero2);
    console.log(router.config);
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
