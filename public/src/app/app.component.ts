import { Component } from '@angular/core';

import { DataService } from './data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    artists: Array<any>;
    title = 'Art Fair';

    item: Item = {
        id: 1,
  	    name: 'Painting'
    };

    constructor(private dataService: DataService){

        this.dataService.getArtists()
            .subscribe(res => this.artists = res);
    }

}

export class Item {

	id: number;
	name: string;
}
