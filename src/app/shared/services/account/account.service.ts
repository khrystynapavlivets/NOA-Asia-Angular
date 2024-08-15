import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ILogin, IUser, IUserFullRequest } from '../../interfaces/account/account.interface';
import { Firestore, doc, docData, updateDoc } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public isUserLogin$ = new Subject<boolean>();
  public userData$ = new Subject<boolean>();
  private url = environment.BACKEND_URL;
  private api = { auth: `${this.url}/auth` };

  constructor(private http: HttpClient, private afs: Firestore) { }

  login(credential: ILogin): Observable<any> {
    return this.http.get(`${this.api.auth}?email=${credential.email}&password=${credential.password}`)
  }
  updateUserFirebase(userInfo: IUser, id: string) {
    return updateDoc(doc(this.afs, `users/${id}`), { ...userInfo });
  }
  getOneFirebase(id: string): Observable<IUserFullRequest>  {
    const productDocumentReferense = doc(this.afs, `users/${id}`);
    return docData(productDocumentReferense, { idField: 'id' });
  }

}