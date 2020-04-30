import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoggingService {    //Just a demo service to check instances of services
	lastlog: string;

	printLog(message: string) {
		console.log(message);
		console.log(this.lastlog);
		this.lastlog = message;
	}
}