import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';

// const ajax$ = ajax<any>('https://random-data-api.com/api/v2/users');
//
// ajax$.subscribe((data) => console.log('Sub 1:', data.response.first_name));
//
// ajax$.subscribe((data) => console.log('Sub 2:', data.response.first_name));
//
// ajax$.subscribe((data) => console.log('Sub 3:', data.response.first_name));

// random-data-api.com is the api we'll use
// this is a cold http observable - section 4.2 ^^

const helloButton = document.querySelector('button#hello');

const helloClick$ = new Observable<MouseEvent>((subscriber) => {
	helloButton.addEventListener('click', (event: MouseEvent) => {
		subscriber.next(event);
	});
});

helloClick$.subscribe((event) =>
	console.log('Sub 1:', event.type, event.x, event.y)
);

setTimeout(() => {
	console.log('Subscription 2 starts');
	helloClick$.subscribe((event) =>
		console.log('Sub 2:', event.type, event.x, event.y)
	);
}, 5000);

//hot observables - section 4.3 ^^
