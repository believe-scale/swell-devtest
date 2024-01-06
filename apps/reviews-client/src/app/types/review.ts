export interface Review {
	id: string;
	reviewerId: string;
	companyId: string;
	reviewText: string;
	rating: number;
	createdOn: string;
	company: {
		id: string;
		name: string;
	};
	user: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
}

export interface ReviewsFetchResponse {
	reviews: Review[];
}
