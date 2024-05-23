import { Observable, map, tap } from "rxjs";

export class DataResolver<T> extends Observable<DataStream<T>> {

  constructor(private coldObservable: Observable<T>) {
    super(subscriber => {
      this.coldObservable
        .pipe(
          map(value => new DataStream(value, coldObservable)),
        ).subscribe((observerOrNext) => {
          subscriber.next(observerOrNext);
          subscriber.complete();
        });
      });
  }
}

export class DataStream<T> extends Observable<DataStream<T>> {

  constructor(
    public currentValue: T,
    private readonly hotObservable: Observable<T>) {
      super(subscriber => {
        this.hotObservable
          .pipe(
            tap(value => this.currentValue = value),
            map(_ => this),
          ).subscribe((observerOrNext) => {
            subscriber.next(observerOrNext);
          });
        });
      }
}
