import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { DataService } from '../data.service';

import { Artist } from '../models';

@Component({
	selector: 'app-artist-table',
  	templateUrl: './artist-table.component.html',
  	styleUrls: ['./artist-table.component.css']
})

export class ArtistTableComponent implements OnInit {

	//MEMBER VARIABLES ===================================================
	
	public rows: Array<any> = [];
	public columns: Array<any> = [
		{
			title: 'First Name', 
			name: 'firstName', 
			filtering: {
				filterString: '', 
				placeholder: 'Filter by first name'
			}
		},
		{
			title: 'Last Name',
			name: 'lastName',
			sort: false,
			filtering: {
				filterString: '',
				placeholder: 'Filter by position'
			}
		},
		{
			title: 'ID',
			name: 'id',
			sort: false,
			filtering: {
				filterString: '',
				placeholder: 'Filter by id'
			}
		},	
	];

	public page:number = 1;
  	public itemsPerPage:number = 10;
  	public maxSize:number = 5;
  	public numPages:number = 1;
  	public length:number = 0;

  	public config:any = {
    	paging: true,
    	sorting: {columns: this.columns},
    	filtering: {filterString: ''},
    	className: ['table-striped', 'table-bordered']
  	};

  	private data: Observable<Artist[]>;

  	//MEMBER VARIABLES ===================================================

	//PUBLIC FUNCTIONS ===================================================

	public constructor(private http: HttpClient, private dataService: DataService) { }

  	public ngOnInit(): void {
  		this.data = this.dataService.artists;
  		this.dataService.getArtists();
  	}

  	//PUBLIC FUNCTIONS ===================================================

}
 