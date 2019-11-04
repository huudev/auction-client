
export const environment = {
  production: true,
  server_port: 3000,
  get server_url() { return `http://${window.location.hostname}:${this.server_port}/`; },
  get server_ws_url() { return `ws://${window.location.hostname}:${this.server_port}/`; }
};
