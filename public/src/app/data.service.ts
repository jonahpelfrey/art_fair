import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Artist, Volunteer, Buyer, Order } from './models';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';


@Injectable()
export class DataService {

	constructor(private http: HttpClient) { }

	getArtists(): Observable<Artist[]> {
		return this.http.get<Artist[]>('/api/artists')
			.map(data => data)
			.catch(this.handleError);
	}

	getVolunteers(): Observable<Volunteer[]> {
		return this.http.get<Volunteer[]>('/api/volunteers')
			.map(data => data)
			.catch(this.handleError);
	}

	getBuyers(): Observable<Buyer[]> {
		return this.http.get<Buyer[]>('/api/buyers')
			.map(data => data)
			.catch(this.handleError);
	}

	getOrders(): Observable<Order[]> {
		return this.http.get<Order[]>('/api/orders')
			.map(data => data)
			.catch(this.handleError);
	}

	addArtist(artist: Artist): Observable<Artist> {
		return this.http.post('/api/artists', artist)
			.map((data: Artist) => data)
			.catch(this.handleError);
	}

 	private handleError(error: Response) {
    	return Observable.throw(error.statusText);
 	}

}
