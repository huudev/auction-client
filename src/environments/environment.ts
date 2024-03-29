// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server_port: 3000,
  get server_url() { return `http://${window.location.hostname}:${this.server_port}/`; },
  get server_ws_url() { return `ws://${window.location.hostname}:${this.server_port}/`; }
};

// export const environment = {
//   production: false,
//   server_url: 'http://localhost:3000/',
//   server_ws_url: 'ws://localhost:3000/graphql'
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
