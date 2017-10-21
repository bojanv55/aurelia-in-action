import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class AuthService {
  constructor(http) {
    this.http = http;

    //not needed since global stuff is configured for this in app.js
    // const baseUrl = 'http://localhost:8333/api/';
    //
    // this.http.configure(config => {
    //   config.withBaseUrl(baseUrl);
    // });
  }

  get tokenInterceptor() {
    let auth = this;
    return {
      request(request) {
        let token = auth.getToken();
        if (token) {
          request.headers.append('authorization', `bearer ${token}`);
        }
        return request;
      }
    };
  }

  isLoggedIn(){
    let token  = this.getToken();

    if(token) return true;
    return false;
  }

  getToken(){
    return window.localStorage.getItem("token");
  }

  login(username, password) {
    return this.http.fetch('token', {
      method: 'post',
      body: json({username: username, passowrd: password})
    })
      .then(res => res.json())
      .then(tokRes => {
        if (tokRes.success){
          window.localStorage.setItem('token', tokRes.token);
        }
        return tokRes;
      })
      .catch(err => console.log('Token error'));
  }

  logout(){
    window.localStorage.removeItem('token');
  }
}
