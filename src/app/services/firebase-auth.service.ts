import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  user: Observable<User | null>;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap((user: { uid: string; }) => {
        if (user) {
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  loginWithGoogle(): void {
    this.firebaseAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(t => {
        console.log(t);
        this.updateUserData(t.user)
      })
      .catch(e => {
        console.log(e);
      })
  }

  private updateUserData(user: User) {
    const docUser: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      profile: user.profile || ''
    };
    return docUser.set(data);
  }
}
