import { Observable, ReplaySubject, map, take, tap } from "rxjs";

export class DataStream<T> extends Observable<DataStream<T>> {
  public initialValue: T | null = null;
  public readonly stream: ReplaySubject<T> = new ReplaySubject<T>();

  constructor(private coldObservable: Observable<T>) {
    super(subscriber => {
      this.refresh();

      this.stream
        .pipe(
          tap(value => this.initialValue = value),
          map(_ => this),
          take(1)
        ).subscribe((observerOrNext) => {
          subscriber.next(observerOrNext);
          subscriber.complete();
        });
      });
  }

  public refresh(): void {
    this.coldObservable.subscribe(value => this.stream.next(value));
  }
}