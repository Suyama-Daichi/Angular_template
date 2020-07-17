import { Injectable } from '@angular/core';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import { environment } from 'src/environments/environment';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  private userPool: CognitoUserPool;
  private poolData: any;
  public cognitoCreds: AWS.CognitoIdentityCredentials;

  constructor(
    private store: StoreService
  ) {
    AWS.config.region = environment.aws.region;
    this.poolData = { UserPoolId: environment.aws.userPoolId, ClientId: environment.aws.clientId };
    this.userPool = new CognitoUserPool(this.poolData);
  }

  // ログイン処理
  login(username: string, password: string): Promise<any> {
    const userData = {
      Username: username,
      Pool: this.userPool,
      Storage: localStorage
    };
    const cognitoUser = new CognitoUser(userData);
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess(result) {
          console.log('id token + ' + result.getIdToken().getJwtToken());
          console.log('access token + ' + result.getAccessToken().getJwtToken());
          console.log('refresh token + ' + result.getRefreshToken().getToken());
          resolve(result);
        },
        onFailure(err) {
          console.log(err);
          reject(err);
        },
        newPasswordRequired(userAttributes, requiredAttributes) {
          delete userAttributes.email_verified;
          delete userAttributes.phone_number_verified;
          reject({ newPasswordRequired: cognitoUser['Session'] });
          // cognitoUser.completeNewPasswordChallenge('newPasswordHmkv', userAttributes, this);
        }
      });
    });
  }

  // ログイン済確認処理
  isAuthenticated(): Promise<any> {
    const cognitoUser = this.userPool.getCurrentUser();
    return new Promise((resolve, reject) => {
      if (cognitoUser === null) {
        // resolve(false);
        reject(cognitoUser);
      }
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err);
        } else {
          if (!session.isValid()) {
            reject(session);
          } else {
            resolve(session);
          }
        }
      });
    });
  }

  // IDトークン取得処理
  getCurrentUserIdToken(): any {
    const cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser != null) {
      return cognitoUser.getSession((err, session) => {
        if (err) {
          alert(err);
          return;
        } else {
          return session.idToken.jwtToken;
        }
      });
    }
  }

  // アクセストークン取得処理
  getCurrentAccessToken(): any {
    const cognitoUser = this.userPool.getCurrentUser();
    if (cognitoUser != null) {
      return cognitoUser.getSession((err, session) => {
        if (err) {
          alert(err);
          return;
        } else {
          return session.accessToken.jwtToken;
        }
      });
    }
  }

  // パスワード変更処理
  async changePassword(oldPw: string, newPw: string) {
    let cognitoUser = this.userPool.getCurrentUser();
    const userData = {
      Username: this.store.userId,
      Pool: this.userPool,
      Storage: localStorage
    };
    return new Promise<any>((resolve, err) => {
      if (cognitoUser) {
        cognitoUser.getSession((error, result) => {
          if (result) {
            cognitoUser.changePassword(oldPw, newPw, (error2, result2) => {
              resolve({ result2, error2 });
            });
          }
        });
      } else {
        cognitoUser = new CognitoUser(userData);
        cognitoUser['Session'] = this.store.session;
        cognitoUser.getSession(() => {
          cognitoUser.completeNewPasswordChallenge(newPw, null, {
            onSuccess(success) {
              resolve(success);
              console.log(success);
            },
            onFailure(error) {
              console.log(error);
            }
          });
        });
      }
    });
  }

  // ログアウト処理
  logout() {
    console.log('LogOut!');
    const currentUser = this.userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
    }
  }
}
