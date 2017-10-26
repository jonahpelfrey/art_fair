import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

	artists: any;
	volunteers: any;
	buyers: any;
	orders: any; 

  	constructor(private http: Http) { }

  	getArtists(){
	    return this.http.get("/api/artists")
	    	.map(result => this.artists = result.json());
  	}

  	getVolunteers(){
  		return this.http.get("/api/volunteers")
  			.map(result => this.volunteers = result.json());
  	}

  	getBuyers(){
  		return this.http.get("/api/buyers")
  			.map(result => this.buyers = result.json());
  	}

  	getOrders(){
  		return this.http.get("/api/orders")
  			.map(result => this.orders = result.json());
  	}

}
