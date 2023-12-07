import { Observable, of } from 'rxjs';
import { from } from 'rxjs';

// of('Alice', 'Ben', 'Charlie').subscribe({
// 	next: (value) => console.log(value),
// 	complete: () => console.log('Completed'),
// });
// this is the creation function

// ourOwnOf('Alice', 'Ben', 'Charlie').subscribe({
// 	next: (value) => console.log(value),
// 	complete: () => console.log('Completed'),
// });
// this is using the of func we created

// const names$ = new Observable<string>((subscriber) => {
//   subscriber.next('Alice');
//   subscriber.next('Ben');
//   subscriber.next('Charlie');
//   subscriber.complete();
// });
// //this is us creating the obs manually

// names$.subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log('Completed'),
// });
// this is us subscribing to the obs or creation func

// function ourOwnOf(...args: string[]): Observable<string> {
// 	return new Observable<string>((subscriber) => {
// 		for (let i = 0; i < args.length; i++) {
// 			subscriber.next(args[i]);
// 		}
// 		subscriber.complete();
// 	});
// }
// we can write a function that acts like the of func does

// of creation function - section 5.2 ^^

// ------------------------------------------------------------

// from(['Alice', 'Ben', 'Charlie']).subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log('Completed'),
// });
//the from() creation function

// ------------------------------------------------------------

// const somePromise = new Promise((resolve, reject) => {
// 	// resolve('Resolved!');
// 	reject('Rejected!');
// });
//
// const obsFromPromise$ = from(somePromise);
//
// obsFromPromise$.subscribe({
// 	next: (value) => console.log(value),
// 	error: (err) => console.log('Error:', err),
// 	complete: () => console.log('Completed'),
// });
// a promise becomes an obs
// useful when we already have existing code as a promise, and we want to use it in the obs world

//from creation function - section 5.3 ^^

// ------------------------------------------------------------

const triggerButton = document.querySelector('button#trigger');

// const subscription = fromEvent<MouseEvent>(triggerButton, 'click').subscribe({
//   next: (event) => console.log(event.type, event.x, event.y),
// });
// the fromEvent creation function()

// const triggerClick$ = new Observable<MouseEvent>((subscriber) => {
// 	const clickHandlerFunc = (event) => {
// 		console.log('Event callback executed');
// 		subscriber.next(event);
// 	};
// 	triggerButton.addEventListener('click', clickHandlerFunc);
// 	return () => {
// 		triggerButton.removeEventListener('click', clickHandlerFunc);
// 	};
// });
// // our own fromEvent() function
//
// const subscription = triggerClick$.subscribe((event) =>
// 	console.log(event.type, event.x, event.y)
// );
// // subscription to the func
//
// setTimeout(() => {
// 	console.log('Unsubscribe');
// 	subscription.unsubscribe();
// }, 5000);

//fromEvent() creation function - section 5.5 ^^

// ------------------------------------------------------------

// console.log('App started');
//
// const timer$ = new Observable<number>((subscriber) => {
// 	const timeoutId = setTimeout(() => {
// 		console.log('Timeout!');
// 		subscriber.next(0);
// 		subscriber.complete();
// 	}, 2000);
//
// 	return () => clearTimeout(timeoutId);
// 	//clears out anything leftover after unsubscribe: the teardown
// });
// // our obs that mimics the timer func
//
// const subscription = timer$.subscribe({
// 	next: (value) => console.log(value),
// 	complete: () => console.log('Completed!'),
// });
// // the subscription
//
// // const subscription = timer(2000).subscribe({
// //   next: (value) => console.log(value),
// //   complete: () => console.log('Completed!'),
// // });
// // timer creation function
//
// setTimeout(() => {
// 	subscription.unsubscribe();
// 	console.log('Unsubscribed!');
// });

//timer() creation function - section 5.6 ^^

// ------------------------------------------------------------

// console.log('App started');
//
// const interval$ = new Observable<number>((subscriber) => {
// 	let counter = 0;
//
// 	const intervalId = setInterval(() => {
// 		subscriber.next(counter++);
// 	}, 1000);
//
// 	return () => clearInterval(intervalId);
// 	//clears out anything leftover after unsubscribe: the teardown
// });
// our obs that mimics the timer func

// const subscription = interval$.subscribe({
// 	next: (value) => console.log(value),
// 	complete: () => console.log('Completed!'),
// });
// // the subscription

// const subscription = interval(1000).subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log('Completed!'),
// });
// interval creation function
//
// setTimeout(() => {
// 	subscription.unsubscribe();
// 	console.log('Unsubscribed!');
// }, 5000);

//interval() creation function - section 5.7 ^^

// ------------------------------------------------------------


// https://random-data-api.com/api/v2/users - name
// https://random-data-api.com/api/nation/random_nation - nation
// https://random-data-api.com/api/food/random_food -food

// Mike is from New Dheli and likes to eat Tacos!

// import { forkJoin } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
//
// const randomName$ = ajax('https://random-data-api.com/api/v2/users');
// const randomNation$ = ajax(
// 	'https://random-data-api.com/api/nation/random_nation'
// );
// const randomFood$ = ajax('https://random-data-api.com/api/food/random_food');

// randomName$.subscribe((ajaxResponse) =>
//   console.log(ajaxResponse.response.first_name)
// );
// randomNation$.subscribe((ajaxResponse) =>
//   console.log(ajaxResponse.response.capital)
// );
// randomFood$.subscribe((ajaxResponse) =>
//   console.log(ajaxResponse.response.dish)
// );

// forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
// 	([nameAjax, nationAjax, foodAjax]) =>
// 		console.log(
// 			`${nameAjax.response.first_name} is from ${nationAjax.response.capital} and likes ${foodAjax.response.dish}.`
// 		)
// array destructuring is available here
// );

//forkJoin() creation function - section 5.9 ^^

// ------------------------------------------------------------

// import { forkJoin, Observable } from 'rxjs';
//
// const a$ = new Observable((subscriber) => {
// 	setTimeout(() => {
// 		subscriber.next('A');
// 		subscriber.complete();
// 	}, 5000);
//
// 	return () => console.log('A Teardown');
// });
//
// const b$ = new Observable((subscriber) => {
// 	setTimeout(() => {
// 		subscriber.error('Fail!');
// 	}, 3000);
//
// 	return () => console.log('B Teardown');
// });
//
// forkJoin([a$, b$]).subscribe({
// 	next: (value) => console.log(value),
// 	error: (err) => console.log('Error: ', err),
// });


//forkJoin() error scenario - section 5.10 ^^

// ------------------------------------------------------------

// import { combineLatest, fromEvent } from 'rxjs';
//
// const temperatureInput = document.getElementById('temperature-input');
// const conversionDropdown = document.getElementById('conversion-dropdown');
// const resultText = document.getElementById('result-text');
//
// const temperatureInputEvent$ = fromEvent(temperatureInput, 'input');
// const conversionInputEvent$ = fromEvent(conversionDropdown, 'input');
//
// combineLatest([temperatureInputEvent$, conversionInputEvent$]).subscribe(
// 	([temperatureInputEvent, conversionInputEvent]) => {
// 		const temperature = Number(temperatureInputEvent.target['value']);
// 		const conversion = conversionInputEvent.target['value'];
//
// 		let result: number;
// 		if (conversion === 'f-to-c') {
// 			result = ((temperature - 32) * 5) / 9;
// 		} else if (conversion === 'c-to-f') {
// 			result = (temperature * 9) / 5 + 32;
// 		}
//
// 		resultText.innerText = String(result);

		// console.log(
		//   temperatureInputEvent.target['value'],
		//   conversionInputEvent.target['value']
		// );
	// }
	// array destructuring used again
// );

//combineLatest() creation function - section 5.11 ^^
