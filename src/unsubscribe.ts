import { Observable } from "rxjs";

const interval$ = new Observable<number>((subscriber) => {
	let counter = 1;
	const intervalId = setInterval(() => {
		console.log('Emitted', counter);
		subscriber.next(counter++);
	}, 2000);

	return () => {
		clearInterval(intervalId);
	};
	// clear interval so it will not count after subscription done
});

const subscription = interval$.subscribe((value) => console.log(value));

setTimeout(() => {
	console.log('Unsubscribed');
	subscription.unsubscribe();
}, 7000);

// section 3.10 interval with unsubscribe
