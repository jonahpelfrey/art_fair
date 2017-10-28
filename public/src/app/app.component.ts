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

    artist: Artist;
    // artists: Observable<Artist[]>;
    volunteers: Array<Volunteer>;
    buyers: Array<Buyer>;
    orders: Array<Order>;

    title = 'Art Fair';

    constructor(private http: HttpClient, private dataService: DataService) {}

    ngOnInit() {

        // this.artists = this.dataService.artists;
        this.dataService.getArtists();

        this.dataService.getVolunteers()
            .subscribe(
                res => this.volunteers = res,
                err => console.log(err)
            );

        this.dataService.getBuyers()
            .subscribe(
                res => this.buyers = res,
                err => console.log(err)
            );

        this.dataService.getOrders()
            .subscribe(
                res => this.orders = res,
                err => console.log(err)
            );
    }

    addArtist() {
        this.artist = {
            firstName: "IT",
            lastName: "WORKED"
        }

        this.dataService.addArtist(this.artist);
    }

}

