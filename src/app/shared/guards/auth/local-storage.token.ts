import { InjectionToken } from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken<Storage | undefined>('Local Storage', {
  providedIn: 'root',
  factory: () => typeof window !== 'undefined' ? localStorage : undefined
});