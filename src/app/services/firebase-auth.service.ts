import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  user: Observable<User | null>;
  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
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

  /** Googleログイン */
  loginWithGoogle(): void {
    this.login(new auth.GoogleAuthProvider());
  }

  login(provider: auth.AuthProvider) {
    this.afAuth.signInWithPopup(provider)
      .then(t => {
        console.log(t);
        this.updateUserData(t.user)
      })
      .catch(e => {
        console.log(e);
      })
  }

  /** Foursquareでログイン */
  loginWithFoursquare() {
    console.log(`${environment.foursquare.authenticateURL}?client_id=${environment.foursquare.clientId}&redirect_uri=${environment.foursquare.redirectUrl}&response_type=code`);
    location.href = `${environment.foursquare.authenticateURL}?client_id=${environment.foursquare.clientId}&redirect_uri=${environment.foursquare.redirectUrl}&response_type=code`;
  }
  logout() {
    this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      });
  }

  /**
   * Firestoreにユーザー情報を保存
   * @param user ユーザーデータ
   */
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
