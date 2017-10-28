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

	private artistList: Artist[];
	private _artists: BehaviorSubject<Artist[]> = new BehaviorSubject([]);
	public readonly artists: Observable<Artist[]> = this._artists.asObservable();
	
	private buyerList: Buyer[];
	private _buyers: BehaviorSubject<Buyer[]> = new BehaviorSubject([]);
	public readonly buyers: Observable<Buyer[]> = this._buyers.asObservable();

	private orderList: Order[];
	private _orders: BehaviorSubject<Order[]> = new BehaviorSubject([]);
	public readonly orders: Observable<Order[]> = this._orders.asObservable();

	private volunteerList: Volunteer[];
	private _volunteers: BehaviorSubject<Volunteer[]> = new BehaviorSubject([]);
	public readonly volunteers: Observable<Volunteer[]> = this._volunteers.asObservable();

	constructor(private http: HttpClient) {}

	addArtist(artist: Artist) {
		this.http.post('/api/artists', artist).subscribe((res: any) => {
			this.artistList.push(res.result);
			this._artists.next(this.artistList);
		}, err => this.handleError);
	}

	getArtists() {
		this.http.get<Artist[]>('/api/artists').subscribe(res => {
			this.artistList = res;
			this._artists.next(this.artistList);
		}, err => this.handleError);
	}

	getBuyers() {
		this.http.get<Buyer[]>('/api/buyers').subscribe(res => {
			this.buyerList = res;
			this._buyers.next(this.buyerList);
		}, err => this.handleError);
	}

	getOrders() {
		this.http.get<Order[]>('/api/orders').subscribe(res => {
			this.orderList = res;
			this._orders.next(this.orderList);
		}, err => this.handleError);
	}

	getVolunteers() {
		this.http.get<Artist[]>('/api/volunteers').subscribe(res => {
			this.volunteerList = res;
			this._volunteers.next(this.volunteerList);
		}, err => this.handleError);
	}

	removeArtist(index: number, artist: any) {
		this.http.delete('/api/artists/' + artist._id).subscribe((res: any) => {
			this.artistList.splice(index, 1);
			this._artists.next(this.artistList);
		}, err => this.handleError);
	}

	loadAll() {
		this.getArtists();
		this.getBuyers();
		this.getOrders();
		this.getVolunteers();
	}

 	private handleError(error: Response) {
    	return Observable.throw(error.statusText);
 	}

}
