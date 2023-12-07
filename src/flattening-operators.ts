// -----------------------------------------------------
// 				Flattening Operators
// -----------------------------------------------------

//these are pipeable operators that operate like catchError BUT
// they operate for each emitted value, each next notification
// example: we want to query a server each time user changes the input values

// -----------------------------------------------------
// 				Static Example
// -----------------------------------------------------

//create on OBS that will emit two values that are spread in time

// import { Observable, of } from 'rxjs';
// import { concatMap } from 'rxjs/operators';
//
// // then concatMap will emit these values into another observable
// const source$ = new Observable((subscriber) => {
// 	setTimeout(() => subscriber.next('A'), 2000);
// 	setTimeout(() => subscriber.next('B'), 5000);
// });
//
// // console.log('App has started.');
// // source$.subscribe((value) => console.log(value));
//
// // now we map the emitted values into another observable
// console.log('App has started.');
// source$
// 	.pipe(concatMap((value) => of(1, 2)))
// 	.subscribe((value) => console.log(value));

// -----------------------------------------------------
// 				Dynamic HTTP Request
// -----------------------------------------------------

// import { fromEvent } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
// import { map, concatMap } from 'rxjs/operators';
//
// const endpointInput: HTMLInputElement =
// 	document.querySelector('input#endpoint');
// const fetchButton = document.querySelector('button#fetch');
//
// // want the http requests triggered by a click (fromEvent)
// // map through to get value of each event,
// // fromEvent(fetchButton, 'click')
// //   .pipe(map(() => endpointInput.value))
// //   .subscribe((value) => console.log(value));
//
// // now we use concatMap to turn our values into http requests
// // we create an OBS with ajax
// fromEvent(fetchButton, 'click')
// 	.pipe(
// 		map(() => endpointInput.value),
// 		concatMap((value) =>
// 			ajax(`https://random-data-api.com/api/${value}/random_${value}`)
// 		)
// 	)
// 	.subscribe((value) => console.log(value));

// -----------------------------------------------------
// 	    	Error Handling - First Solution
// -----------------------------------------------------

// import { EMPTY, fromEvent } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
// import { map, concatMap, catchError } from 'rxjs/operators';

// const endpointInput: HTMLInputElement =
// 	document.querySelector('input#endpoint');
// const fetchButton = document.querySelector('button#fetch');

// want the http requests triggered by a click (fromEvent)
// map through to get value of each event,
// fromEvent(fetchButton, 'click')
//   .pipe(map(() => endpointInput.value))
//   .subscribe((value) => console.log(value));

// now we use concatMap to turn our values into http requests
// we create an OBS with ajax
// fromEvent(fetchButton, 'click')
//   .pipe(
//     map(() => endpointInput.value),
//     concatMap((value) =>
//       ajax(`https://random-data-api.com/api/${value}/random_${value}`)
//     )
//   )
//   .subscribe((value) => console.log(value));

// lets add an error handler
// fromEvent(fetchButton, 'click')
//   .pipe(
//     map(() => endpointInput.value),
//     concatMap((value) =>
//       ajax(`https://random-data-api.com/api/${value}/random_${value}`)
//     )
//   )
//   .subscribe({
//     next: (value) => console.log(value),
//     error: (err) => console.log(err),
//   });

// now apply catchError to prevent our error from reaching our observer
// this isn't the correct approach however, because it doesn't give us any indication that something is happening
// fromEvent(fetchButton, 'click')
//   .pipe(
//     map(() => endpointInput.value),
//     concatMap((value) =>
//       ajax(`https://random-data-api.com/api/${value}/random_${value}`)
//     ),
//     catchError(() => EMPTY)
//   )
//   .subscribe({
//     next: (value) => console.log(value),
//     error: (err) => console.log(err),
//   });

//now we add the complete to let us know whaat's going on
//we've converted the error into a complete that lets us know that the subscription ended
// fromEvent(fetchButton, 'click')
// 	.pipe(
// 		map(() => endpointInput.value),
// 		concatMap((value) =>
// 			ajax(`https://random-data-api.com/api/${value}/random_${value}`)
// 		),
// 		catchError(() => EMPTY)
// 	)
// 	.subscribe({
// 		next: (value) => console.log(value),
// 		error: (err) => console.log(err),
// 		complete: () => console.log('Completed'),
// 	});

// -----------------------------------------------------
// 	    	Error Handling - Second Solution
// -----------------------------------------------------

// import { EMPTY, fromEvent } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
// import { catchError, concatMap, map } from 'rxjs/operators';
//
// const endpointInput: HTMLInputElement =
// 	document.querySelector('input#endpoint');
// const fetchButton = document.querySelector('button#fetch');

// like as before
// fromEvent(fetchButton, 'click').pipe(
//   map(() => endpointInput.value),œ
//   concatMap(value =>
//     ajax(`https://random-data-api.com/api/${value}/random_${value}`)
//   ),
//   catchError(() => EMPTY)
// ).subscribe({
//   next: value => console.log(value),
//   error: err => console.log('Error:', err),
//   complete: () => console.log('Completed')
// });

// we need to move the catchError to the inner observable
// this happens via the .pipe()

// fromEvent(fetchButton, 'click')
// 	.pipe(
// 		map(() => endpointInput.value),
// 		concatMap((value) =>
// 			ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(
// 				catchError((error) => of(`Could not fetch data: ${error}`))
// 			)
// 		)
// 	)
// 	.subscribe({
// 		next: (value) => console.log(value),
// 		error: (err) => console.log('Error:', err),
// 		complete: () => console.log('Completed'),
// 	});


// -----------------------------------------------------
// 	    	Subjects - Multicasting
// -----------------------------------------------------

// import { fromEvent, Subject } from 'rxjs';
// import { map } from 'rxjs/operators';
//
// const emitButton = document.querySelector('button#emit');
// const inputElement: HTMLInputElement = document.querySelector('#value-input');
// const subscribeButton = document.querySelector('button#subscribe');
//
// // using a subject to multicast values to all subscr
// const value$ = new Subject<string>();
//
// // use next, etc or create new observers
// // fromEvent(emitButton, 'click').subscribe(() => value$.next(inputElement.value));
//
// // we pipe and map the click event and instead of the handler we pass our subject directly. this emits in the same way
// fromEvent(emitButton, 'click')
// 	.pipe(map(() => inputElement.value))
// 	.subscribe(value$);
//
// fromEvent(subscribeButton, 'click').subscribe(() => {
// 	console.log('New Subscription');
// 	value$.subscribe((value) => console.log(value));
// });

// -----------------------------------------------------
// 	    	        Behavior Subject
// -----------------------------------------------------

// import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
// import { withLatestFrom } from 'rxjs/operators';
//
// const loggedInSpan: HTMLElement = document.querySelector('span#logged-in');
// const loginButton: HTMLElement = document.querySelector('button#login');
// const logoutButton: HTMLElement = document.querySelector('button#logout');
// const printStateButton: HTMLElement =
// 	document.querySelector('button#print-state');
//
// // a regular subject
// // const isLoggedIn$ = new Subject<boolean>();
//
// // a behavior subject
// //dont forget, it has an initial memory and needs a value
// // this is our inital state on app refresh
// const isLoggedIn$ = new BehaviorSubject<boolean>(false);
//
// // make out buttons transmit either true or false based on whta they should do
// fromEvent(loginButton, 'click').subscribe(() => isLoggedIn$.next(true));
// fromEvent(logoutButton, 'click').subscribe(() => isLoggedIn$.next(false));
//
// // now we subscribe to our subject and update  our spann so it displays the correct value
// // effectively our nav bar (like in a separate component of code)
// isLoggedIn$.subscribe(
// 	(isLoggedIn) => (loggedInSpan.innerText = isLoggedIn.toString())
// );
//
// // buttons - we make them appear or disappear depending on the state of the isLoggedIn$ subject
// // the issue: if you refresh you see both buttons and no state
// // a subject doesn't have the memory to store the latest value, therefore a behavior subject would work much beetter here
// isLoggedIn$.subscribe((isLoggedIn) => {
// 	logoutButton.style.display = isLoggedIn ? 'block' : 'none';
// 	loginButton.style.display = !isLoggedIn ? 'block' : 'none';
// });
//
// // print state to console
// // fromEvent(printStateButton, 'click').subscribe(() =>
// //   console.log('User is logged in:', isLoggedIn$.value)
// // );
//
// // print state to console in a more reactive way using .pipe()
// // whenever a click is emitted withLatestFrom will create an array with the latest value from the BS, so in the handler we have an array of event and boolean which we see iun the console
// fromEvent(printStateButton, 'click')
// 	.pipe(withLatestFrom(isLoggedIn$))
// 	.subscribe(() => console.log('User is logged in:', isLoggedIn$.value));
