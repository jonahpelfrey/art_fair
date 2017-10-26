import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import { Artist, Volunteer } from './models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})


export class AppComponent {

    artists: Array<Artist>;
    title = 'Art Fair';


    constructor(private http: HttpClient, private dataService: DataService) {

        this.dataService.getArtists()
            .subscribe(
                res => this.artists = res,
                err => console.log(err)
            );

    }




}

