import { ApplicationConfig, importProvidersFrom, ModuleWithProviders, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { withFetch } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  importProvidersFrom(BrowserModule),
  importProvidersFrom(BrowserAnimationsModule),
  provideAnimations(),
  provideClientHydration(),
  provideHttpClient(withFetch()),
  importProvidersFrom(AngularFireStorageModule),
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideStorage(() => getStorage()),
  provideFirestore(() => getFirestore()),
  provideAnimationsAsync(),
  provideAuth(() => getAuth()),
  importProvidersFrom(ToastrModule.forRoot() as ModuleWithProviders<ToastrModule>),
  provideFirebaseApp(() => initializeApp({ "projectId": "noa-project-59103", "appId": "1:146487629824:web:362d4ddc54da3241cf20e5", "storageBucket": "noa-project-59103.appspot.com", "apiKey": "AIzaSyDK59fTBIxg6wbkoU2BKVvTNZwV-7JqPtA", "authDomain": "noa-project-59103.firebaseapp.com", "messagingSenderId": "146487629824", "measurementId": "G-84P0M9F9XD" })),

  ]
};
