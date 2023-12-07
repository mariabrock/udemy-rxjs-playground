import { Observable, of } from "rxjs";

export const name$ = of('Alice', 'Ben', 'Charlie');

export function storeDataOnServer(data: string): Observable<string> {
	return new Observable(subscriber => {
		setTimeout(() => {
			subscriber.next(`Saved successfully: ${data}`);
			subscriber.complete();
		}, 5000);
	});
}

export function storeDataOnServerError(data: string): Observable<string> {
	return new Observable(subscriber => {
		setTimeout(() => {
			subscriber.error(new Error('Failure!'));
		}, 5000);
	});
}

// section 1.3 warm-up


interface FetchConfig {
	hasError?: boolean;
}

export const source$ = of('Alice', 'Ben', 'Charlie');

export function fetchSomeData(config?: FetchConfig): Observable<string> {
	return new Observable(subscriber => {
		// Random time 1-5 seconds;
		const randomTimeout = 1000 + Math.random() * 3000;

		setTimeout(() => {
			if (config?.hasError) {
				subscriber.error(new Error('Failure!'));
			} else {
				subscriber.next('OK!');
				subscriber.complete();
			}
		}, randomTimeout);
	});
}

export function fetchSomeDataError() {
	return fetchSomeData({hasError: true});
}

// section 3.3 Observables
