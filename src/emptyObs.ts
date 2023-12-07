import { observable, Observable, of } from "rxjs";
import { source$, fetchSomeDataError } from './external';

// const observable$ = new Observable(subscr => {
// 	console.log('Observable executed');
// });
//
// console.log('Before subscribe');
// observable$.subscribe();
// console.log('After subscribe');

// section 3.3 empty observable ^^


// const observable$ = new Observable((subscriber) => {
// 	console.log('Observable executed');
// 	subscriber.next('Alice');
// });
//
// console.log('Before subscribe');
// observable$.subscribe((value) => console.log(value));
// console.log('After subscribe');

// the value is handed to the subscriber in a syncronous way
// section 3.4 next handler ^^


// const observable$ = new Observable((subscriber) => {
// 	console.log('Observable executed');
// 	subscriber.next('Alice');
// 	subscriber.next('Ben');
//
// 	setTimeout(() => {
// 		subscriber.next('Charlie');
// 	}, 2000);
// });
//
// console.log('Before subscribe');
// observable$.subscribe((value) => console.log(value));
// console.log('After subscribe');

// the delayed value Charlie is handed to the subscriber in an asyncronous way
// section 3.5 asyncronous emission ^^


// const observable$ = new Observable((subscriber) => {
// 	console.log('Observable executed');
// 	subscriber.next('Alice');
// 	subscriber.next('Ben');
//
// 	setTimeout(() => {
// 		subscriber.next('Charlie');
// 		subscriber.complete();
// 	}, 2000);
//
// 	return () => {
// 		console.log('Teardown');
// 	};
// });
//
// console.log('Before subscribe');
// observable$.subscribe({
// 	next: (value) => console.log(value),
// 	complete: () => console.log('Complete'),
// });
// console.log('After subscribe');

// completion & teardown
// section 3.6 ^^


// const observable$ = new Observable((subscriber) => {
// 	console.log('Observable executed');
// 	subscriber.next('Alice');
// 	subscriber.next('Ben');
//
// 	setTimeout(() => {
// 		subscriber.next('Charlie');
// 	}, 2000);
//
// 	setTimeout(() => subscriber.error(new Error('Failed')), 4000);
//
// 	return () => {
// 		console.log('Teardown');
// 	};
// });
//
// console.log('Before subscribe');
// observable$.subscribe({
// 	next: (value) => console.log(value),
// 	complete: () => console.log('Complete'),
// 	error: (err) => console.log(err.message),
// });
// console.log('After subscribe');

// error notification - section 3.7 ^^


// const observable$ = new Observable((subscriber) => {
// 	console.log('Observable executed');
// 	subscriber.next('Alice');
// 	subscriber.next('Ben');
//
// 	setTimeout(() => subscriber.error(new Error('Failed')), 2000);
//
// 	setTimeout(() => {
// 		subscriber.next('Charlie');
// 		subscriber.complete();
// 	}, 4000);
//
//
//
// 	return () => {
// 		console.log('Teardown');
// 	};
// });
//
// console.log('Before subscribe');
// observable$.subscribe({
// 	next: (value) => console.log(value),
// 	complete: () => console.log('Complete'),
// 	error: (err) => console.log(err.message),
// });
// console.log('After subscribe');

// changing up notification order - section 3.7 ^^
// doesn't work
