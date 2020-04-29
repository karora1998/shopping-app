import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
	kind: string,
	idToken: string,
	email: string,
	refreshToken: string,
	expiresIn: string,
	localId: string
}

@Injectable({providedIn: 'root'})
export class AuthService {
	constructor(private http: HttpClient) {}

	signUp(email: string, password: string) {
		return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8LHcLZQU2LtomSgdDfVxgNpyNjIe741A', {
			email: email, 
			password: password,
			returnSecureToken: true
		}).pipe(catchError(errorRes => {
			return throwError(errorRes.error.error.message);
		}));
	}
}