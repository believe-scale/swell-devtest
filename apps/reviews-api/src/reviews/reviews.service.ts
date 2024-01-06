import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ReviewsService {
	constructor(private prisma: DatabaseService) {}

	async getReviewsCount() {
		try {
			return await this.prisma.review.count();
		} catch (error) {
			console.error('Error fetching review count:', error);
			throw new HttpException('Error fetching review count', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getReviews() {
		try {
			return await this.prisma.review.findMany({
				include: {
					company: true,
					user: true,
				},
				orderBy: {
					createdOn: 'desc',
				},
			});
		} catch (error) {
			console.error('Error fetching reviews:', error);
			throw new HttpException('Error fetching reviews', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
