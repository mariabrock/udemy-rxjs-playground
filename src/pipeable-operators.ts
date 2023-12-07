
// -----------------------------------------------------
// 				filter operator
// -----------------------------------------------------

// import { Observable } from 'rxjs';
// import { filter } from 'rxjs/operators';
//
// // model of news item
// interface NewsItem {
// 	category: 'Business' | 'Sports';
// 	content: string;
// }
//
// // the observable
// const newsFeed$ = new Observable<NewsItem>((subscriber) => {
// 	setTimeout(
// 		() => subscriber.next({ category: 'Business', content: 'A' }),
// 		1000
// 	);
// 	setTimeout(() => subscriber.next({ category: 'Sports', content: 'B' }), 3000);
// 	setTimeout(
// 		() => subscriber.next({ category: 'Business', content: 'C' }),
// 		4000
// 	);
// 	setTimeout(() => subscriber.next({ category: 'Sports', content: 'D' }), 6000);
// 	setTimeout(
// 		() => subscriber.next({ category: 'Business', content: 'E' }),
// 		7000
// 	);
// });
//
// // can make the filter it's own thing
// const sportsNewsfeed$ = newsFeed$.pipe(
// 	filter((item) => item.category === 'Sports')
// );
//
// // subscribe to it
// newsFeed$.subscribe((item) => console.log(item));
//
// // with the filter operator
// // newsFeed$
// //   .pipe(filter((item) => item.category === 'Sports'))
// //   .subscribe((item) => console.log(item));


// -----------------------------------------------------
// 				map operator
// -----------------------------------------------------

// ***we are now using the code from the forkJoin() example***

// import { forkJoin } from 'rxjs';
// // Mike is from New Delhi and likes to eat pasta.
//
// import { ajax } from 'rxjs/ajax';
// import { map } from 'rxjs/operators';
//
// const randomFirstName$ = ajax<any>(
// 	'https://random-data-api.com/api/name/random_name'
// ).pipe(map((ajaxResponse) => ajaxResponse.response.first_name));
//
// const randomCapital$ = ajax<any>(
// 	'https://random-data-api.com/api/nation/random_nation'
// ).pipe(map((ajaxResponse) => ajaxResponse.response.capital));
//
// const randomDish$ = ajax<any>(
// 	'https://random-data-api.com/api/food/random_food'
// ).pipe(map((ajaxResponse) => ajaxResponse.response.dish));
//
// // this is the basic ajax call & response
// // randomFirstName$.subscribe((value) => console.log(value));
// // randomCapital$.subscribe((value) => console.log(value));
// // randomDish$.subscribe((value) => console.log(value));
//
// forkJoin([randomFirstName$, randomCapital$, randomDish$]).subscribe(
// 	([firstName, capital, dish]) =>
// 		console.log(`${firstName} is from ${capital} and likes to eat ${dish}.`)
// );
//this code is not much more condense, easier to read & work with


// -----------------------------------------------------
// 				tap operator
// -----------------------------------------------------

// this operator allows us to see what's going on in the middle of an operator pipeline
// the values are passed directly through, but we are allowed to act on them to see the notifications within the pipeline

// import { of } from 'rxjs';
// import { filter, map, tap } from 'rxjs/operators';

// we create an observable, all numbers emitted immediately
// of(1, 7, 3, 6, 2).subscribe((value) => console.log('Output:', value));

// now, we want to pass values that are greater than 5, and then multiply them by 2 before they reach our Observer/subscriber to be consoled out
// of(1, 7, 3, 6, 2)
//   .pipe(
//     map((value) => value * 2),
//     filter((value) => value > 5)
//   )
//   .subscribe((value) => console.log('Output:', value));
// this illustrates what happend when you mix up the order of oeprators.
// we get 3 printed values with two of them multipled. What we really want are two nukbers, both of them multipled

//here we will investigate:
// of(1, 7, 3, 6, 2)
//   .pipe(
//     // tap((value) => console.log('Spy:', value)),
//     //this gives us a print out of what the obs is emitting
//     map((value) => value * 2),
//     // tap((value) => console.log('Spy:', value)),
//     // at this step we discover that our values have already been multiplied instead of being filtered
//     filter((value) => value > 5)
//   )
//   .subscribe((value) => console.log('Output:', value));

// lets put our filter first with a tap in the middle followed by map
// this way we can see what the filter operator provides up before it moves on to map
// of(1, 7, 3, 6, 2)
// 	.pipe(
// 		filter((value) => value > 5),
// 		tap((value) => console.log('Spy:', value)),
// 		map((value) => value * 2)
// 	)
// 	.subscribe((value) => console.log('Output:', value));
// we see that the filter is giving us the two numbers we want, and only then are the values being multiplied


// -----------------------------------------------------
// 				debounceTime operator
// -----------------------------------------------------

// import { fromEvent } from 'rxjs';
// import { map, debounceTime } from 'rxjs/operators';
//
// const sliderInput = document.querySelector('input#slider');
//
// // observable that will emit a value each time the slide is used
// // fromEvent(sliderInput, 'input').subscribe((value) => console.log(value));
//
// // now we will map each event to extract the value of the slider
// // then use debounce to wait for emissions to settle, then emit the final value
// fromEvent(sliderInput, 'input')
// 	.pipe(
// 		debounceTime(2000),
// 		map((event) => event.target['value'])
// 	)
// 	.subscribe((value) => console.log(value));

// -----------------------------------------------------
// 				catchError operator
// -----------------------------------------------------

// simulate a failed http request, and use catchError to provide afallback Obs

// import { EMPTY, Observable, of } from 'rxjs';
// import { catchError } from 'rxjs/operators';
//
// // the observable
// const failingHttpRequest$ = new Observable((subscriber) => {
// 	setTimeout(() => {
// 		subscriber.error(new Error('Timeout'));
// 	}, 3000);
// });
// console.log('App started.');
//
// //subscribe to our observable
// // failingHttpRequest$.subscribe((value) => console.log(value));
//
// // we aren't interested in handling this error, so we want to hide it from the observer by providing a fallback --> 'Fallback Value' is logged instead of the error
// // failingHttpRequest$
// //   .pipe(catchError((error) => of('Fallback Value')))
// //   .subscribe((value) => console.log(value));
//
// //perhaps we want to catch the error but not show anything at all
// failingHttpRequest$.pipe(catchError((error) => EMPTY)).subscribe({
// 	next: (value) => console.log(value),
// 	complete: () => console.log('Complete'),
// });
