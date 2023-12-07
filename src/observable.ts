import { Observable } from "rxjs";

// const observable$ = new Observable<string>((sub) => {
// 	console.log('Observable executed.');
// 	sub.next('Alice');
// 	setTimeout(() => sub.next('Ben'), 2000);
// 	setTimeout(() => sub.next('Charlie'), 4000);
// });
//
// const subscription = observable$.subscribe({
// 	next: (value) => console.log(value),
// });
//
// setTimeout(() => {
// 	console.log('Unsubscribed.');
// 	subscription.unsubscribe();
// }, 3000);

// section 2.10 warm-up ^^

const observable$ = new Observable<string>((sub) => {
	console.log('Observable executed.');
	sub.next('Alice');
	setTimeout(() => sub.next('Ben'), 2000);
	setTimeout(() => sub.next('Charlie'), 4000);
});

console.log('Sub1 starts');
observable$.subscribe({
	next: (value) => console.log('Subscription 1:', value),
});

setTimeout(() => {
	console.log('Sub2 starts');
	observable$.subscribe({
		next: (value) => console.log('Subscription 2:', value),
	});
}, 1000);

// section 2.1 warm-up ^^
