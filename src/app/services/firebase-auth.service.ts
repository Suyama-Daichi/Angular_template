import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import * as admin from 'firebase-admin';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserFull } from '../models/foursquare/foursquare-user';
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  user: Observable<User | null>;
  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private http: HttpClient
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

  /**
   * Foursquareでログイン
   * @param token ユーザートークン
   * @param userData Foursquareから取得したユーザー情報
   */
  loginWithFoursquare(token: string, userData: UserFull): Promise<boolean> {
    console.log(token)
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithCustomToken(token)
        .then(t => {
          t.user.updateEmail(userData.contact.email);
          this.updateUserData(t.user)
          resolve(true);
          console.log(t)
        })
        .catch(e => {
          reject(false);
          console.log(e)
        })
    });
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

  /** Foursquareのログインページに遷移 */
  toFoursquareAuthPage() {
    console.log(`${environment.foursquare.authenticateURL}?client_id=${environment.foursquare.clientId}&redirect_uri=${environment.foursquare.redirectUrl}&response_type=code`);
    location.href = `${environment.foursquare.authenticateURL}?client_id=${environment.foursquare.clientId}&redirect_uri=${environment.foursquare.redirectUrl}&response_type=code`;
  }

  /**
   * ユーザートークンをFirebaseのアクセストークンに変換
   * @param fsUserToken Foursquareから取得したユーザートークン
   */
  ExchangeCustomToken(fsUserToken: string) {
    return this.http.post<CustumToken>(environment.backEndApi + '/token', { fsUserToken: fsUserToken });
  }

  /** ログアウト */
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

export interface CustumToken {
  token: string;
}
