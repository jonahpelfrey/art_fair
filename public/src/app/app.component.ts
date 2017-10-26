import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Art Fair';

  item: Item = {
  	id: 1,
  	name: 'Painting'
  };

}

export class Item {

	id: number;
	name: string;
}
