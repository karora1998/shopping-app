import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

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

	constructor(private http: HttpClient, private router: Router) {}

	signUp(email: string, password: string) {
		return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8LHcLZQU2LtomSgdDfVxgNpyNjIe741A', {
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
		return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8LHcLZQU2LtomSgdDfVxgNpyNjIe741A', {
			email: email, 
			password: password,
			returnSecureToken: true
		}).pipe(catchError(this.handleError), tap(resData => {
			this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
		}));
	}

	logout() {
		this.user.next(null);
		this.router.navigate(['/auth']);
	}

	private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
		const expirationDate: Date = new Date(new Date().getTime() + (expiresIn)*1000 )
		const user = new User(email, userId, token, expirationDate);
		this.user.next(user);
	}

	private handleError(errorRes: HttpErrorResponse) {
		return throwError(errorRes.error.error.message ? errorRes.error.error.message : 'An Error Occured!');
	}
}