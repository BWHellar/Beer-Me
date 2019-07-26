import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { discoverLocalRefs } from '@angular/core/src/render3/context_discovery';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(private authService: AuthService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  onLogin(){
    this.isLoading = true;
    this.authService.login();
    this.loadingCtrl
    .create({keyboardClose: true, message: 'Logging in...'})
    .then(loadingEl => {
      loadingEl.present();
      setTimeout(() =>{
        this.isLoading = false;
        loadingEl.dismiss();
        this.router.navigateByUrl('/beer/tabs/discover');
      }, 1000);
    });
  }

  onSwitchAuthMode() {
    this.isLogin =!this.isLogin;
  }

  onSubmit(form: NgForm){
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);

    if(this.isLogin) {
      //Server Stuff
    } else {
      //Server Stuff
    }
  }
}
