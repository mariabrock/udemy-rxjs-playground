import { name$, storeDataOnServer, storeDataOnServerError } from './external';

name$.subscribe((value) => console.log(value));

storeDataOnServer('this value').subscribe({
  next: (value) => console.log(value)
});

storeDataOnServerError('that value').subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log('Error when saving:', err.message),
});

// section 1.3 warm-up
