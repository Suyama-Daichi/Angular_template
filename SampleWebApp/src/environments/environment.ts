// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  aws: {
    region: 'ap-northeast-1',
    userPoolId: 'ap-northeast-1_NZL25qkFw', // User Pools の画面から取得できる User Pools ID。
    clientId: '3ugracmfnno0i43lp7g7th8hfe',  // User Pools で発行したクライアントアプリケーションのID。
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
