export interface Artist {

	firstName: string;
	lastName: string;
}

export interface Volunteer {
	
	firstName: string;
	lastName: string;
}

export interface Buyer {

	firstName: string;
	lastName: string;
	address: {
		street: string;
		city: string;
		state: string;
		zip: number;
	};
	phoneNumber: number;
	email: string;
}

export interface Order {

	refKey: number;
	artist: string;
	volunteer: string;
	buyer: string;
	date: string;
	description: string;
	price: number;
	shipping: number;
}
