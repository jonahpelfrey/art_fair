import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Artist, Volunteer, Buyer, Order } from './models';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';


@Injectable()
export class DataService {

	private _artists: BehaviorSubject<Artist[]> = new BehaviorSubject([]);
	artistList: Artist[];

	buyers: Observable<Buyer[]>;
	private _buyers: BehaviorSubject<Buyer[]>;

	volunteers: Observable<Volunteer[]>;
	private _volunteers: BehaviorSubject<Volunteer[]>;

	orders: Observable<Order[]>;
	private _orders: BehaviorSubject<Order[]>;

	private dataStore: {
		artists: Artist[];
		buyers: Buyer[];
		volunteers: Volunteer[];
		orders: Order[];
	}

	constructor(private http: HttpClient) {

		this.dataStore = { artists: [], buyers: [], volunteers: [], orders: [] };
	}

	get artists() {
        return this._artists.asObservable();
    }

	getArtists() {
		this.http.get<Artist[]>('/api/artists').subscribe(res => {
			this.artistList = res;
			this._artists.next(this.artistList);
		}, err => this.handleError);
	}

	addArtist(artist: Artist) {
		this.http.post<Artist>('/api/artists', artist).subscribe(res => {
			this.artistList.push(artist);
			this._artists.next(this.artistList);
		}, err => this.handleError);
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

 	private handleError(error: Response) {
    	return Observable.throw(error.statusText);
 	}

}
