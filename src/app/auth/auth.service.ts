import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { User } from './user.model';

export interface AuthResponseData {
	kind: string,
	idToken: string,
	email: string,
	refreshToken: string,
	expiresIn: string,
	localId: string,
	registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
	// user = new Subject<User>();
	user = new BehaviorSubject<User>(null);
	private tokenExpirationTimer: any;

	constructor(private http: HttpClient, private router: Router) {}

	signUp(email: string, password: string) {
		return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIkey, {
			email: email, 
			password: password,
			returnSecureToken: true
		}).pipe(catchError(errorRes => {
			return this.handleError(errorRes);
		}), tap(resData => {
			this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
		}));
	}

	login(email: string, password: string) {
		return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIkey, {
			email: email, 
			password: password,
			returnSecureToken: true
		}).pipe(catchError(this.handleError), tap(resData => {
			this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
		}));
	}

	autoLogin() {
		const userData = JSON.parse(localStorage.getItem('userData'));
		if(!userData) {
			return;
		}

		const laodedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

		if(laodedUser.token) {
			this.user.next(laodedUser);
			const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
			this.autoLogout(expirationDuration);
		}
	}

	logout() {
		this.user.next(null);
		this.router.navigate(['/auth']);
		localStorage.removeItem('userData');
		if(this.tokenExpirationTimer) {
			clearTimeout(this.tokenExpirationTimer);
		}
		this.tokenExpirationTimer = null;
	}

	autoLogout(expirationDuration: number) {
		this.tokenExpirationTimer = setTimeout(() => {
			this.logout();
		}, expirationDuration);
	}

	private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
		const expirationDate: Date = new Date(new Date().getTime() + (expiresIn)*1000 )
		const user = new User(email, userId, token, expirationDate);
		this.user.next(user);
		this.autoLogout(expiresIn * 1000);
		localStorage.setItem('userData', JSON.stringify(user));
	}

	private handleError(errorRes: HttpErrorResponse) {
		return throwError(errorRes.error.error.message ? errorRes.error.error.message : 'An Error Occured!');
	}
}