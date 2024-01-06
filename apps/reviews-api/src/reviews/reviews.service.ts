import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ReviewsResponse } from './reviews.types';

@Injectable()
export class ReviewsService {
	constructor(private prisma: DatabaseService) {}

	getReviewsCount() {
		return this.prisma.review.count();
	}

	getReviews() {
		// NOTE: prisma ORM uses include for joins
		return this.prisma.review.findMany({
			include: {
				company: true,
				user: true,
			},
			orderBy: {
				createdOn: 'desc',
			},
		});
	}
}
