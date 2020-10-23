import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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
  loginWithFoursquare(token: string, userData: UserFull, fsToken: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithCustomToken(token)
        .then(t => {
          t.user.updateEmail(userData.contact.email);
          const model = {
            uid: userData.id,
            email: userData.contact.email,
            displayName: userData.lastName + userData.firstName || '',
            photoURL: userData.photo.prefix + '200x200' + userData.photo.suffix || '',
            profile: userData?.bio || '',
            accessToken: fsToken
          }
          this.updateUserData(model)
          resolve(true);
          console.log(t)
        })
        .catch(e => {
          reject(false);
          console.log(e)
        })
    });
  }

  linkProvider(provider: auth.AuthProvider) {
    this.afAuth.currentUser
      .then(t => {
        t.linkWithPopup(provider)
        console.log(t)
      })
  }

  login(provider: auth.AuthProvider) {
    this.afAuth.signInWithPopup(provider)
      .then(t => {
        console.log(t)
        this.router.navigateByUrl('/dashboard');
      })
      .catch(e => {
        console.log(e);
      })
  }

  /**
   * ユーザーIDをFirebaseのアクセストークンに変換
   * @param fsUserId Foursquareから取得したユーザートークン
   */
  ExchangeCustomToken(fsUserId: string) {
    return this.http.post<CustumToken>(environment.backEndApi + '/token', { fsUserId: fsUserId });
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
  private updateUserData(user: any) {
    const docUser: AngularFirestoreDocument = this.afStore.doc(`users/${user.uid ? user.uid : user.id}`);
    return docUser.set(user);
  }
}

export interface CustumToken {
  token: string;
}
