import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist, Volunteer, Buyer, Order } from './models';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';


@Injectable()
export class DataService {

	constructor(private http: HttpClient) { }

	getArtists(){
		return this.http.get<Artist[]>('/api/artists')
			.map(data => data);
	}

	getVolunteers(){
		return this.http.get<Volunteer[]>('/api/volunteers')
			.map(data => data);
	}

	getBuyers(){
		return this.http.get<Buyer[]>('/api/buyers')
			.map(data => data);
	}

	getOrders(){
		return this.http.get<Order[]>('/api/orders')
			.map(data => data);
	}

}
