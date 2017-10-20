import {inject} from 'aurelia-framework';
import {AuthService} from '../../services/auth-service';
import {Router} from 'aurelia-router';

@inject(Router, AuthService)
export class Login {
  constructor(router, authService) {
    this.router = router;
    this.authService = authService;
  }

  login() {
    this.authService.login(this.username, this.password)
      .then(tokRes => {
        if(tokRes.success){
          this.errorMessage = '';
          this.router.navigateToRoute('home');
        }
        else {
          this.errorMessage = tokRes.message;
        }
      });
  }
}
