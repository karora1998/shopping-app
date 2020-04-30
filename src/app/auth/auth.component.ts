import { Component, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html'
})
export class AuthComponent {
	isLoginMode = true;
	isLoading = false;
	error: string = null;

	constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}

	onSubmit(form: NgForm) {
		// console.log(form.value);
		const email = form.value.email;
		const password = form.value.password;

		let authObs: Observable<AuthResponseData>

		this.isLoading = true;
		if(this.isLoginMode) {
			authObs = this.authService.login(email, password);
		} else {
			authObs = this.authService.signUp(email, password);
		}

		authObs.subscribe(resData => {
			console.log(resData);
			this.isLoading = false;
			this.error = null;
			this.router.navigate(['/recipes']);
			}, errorMsg => {
			// console.log(errorRes);
			this.error = errorMsg;
			this.showErrorAlert(errorMsg);
			this.isLoading = false;
		});

		form.reset();
	}

	onHenadleError() {
		this.error = null;
	}

	private showErrorAlert(message: string) {
		const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
	
	}
}