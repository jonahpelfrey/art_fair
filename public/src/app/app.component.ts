import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import { Artist, Volunteer, Buyer, Order } from './models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    artistForm: any = {};
    artists: Observable<Artist[]>;
    buyers: Observable<Buyer[]>;
    orders: Observable<Order[]>;
    volunteers: Observable<Volunteer[]>;
    
    title = 'Art Fair';

    constructor(private http: HttpClient, private dataService: DataService) {}

    ngOnInit() {

        this.artists = this.dataService.artists;
        this.buyers = this.dataService.buyers;
        this.orders = this.dataService.orders;
        this.volunteers = this.dataService.volunteers;

        this.dataService.loadAll();
    }

    addArtist() {
        this.dataService.addArtist(this.artistForm);
    }

    removeArtist(i: number, artist: any) {
        this.dataService.removeArtist(i, artist);
    }

}

