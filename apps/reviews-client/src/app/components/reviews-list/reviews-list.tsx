import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	CircularProgress,
	Alert,
} from '@mui/material';
import { Review } from '../../types/review';

/* eslint-disable-next-line */
export interface ReviewsListProps {
	reviews: Review[];
	loading: boolean;
	error: string | null;
}

export function ReviewsList({ reviews, loading, error }: ReviewsListProps) {
	if (loading) {
		return <CircularProgress />;
	}

	if (error) {
		return <Alert severity="error">{error}</Alert>;
	}

	return (
		<TableContainer component={Paper} style={{ maxHeight: 400 }} data-testid="reviews-list">
			<Table stickyHeader aria-label="Customer Reviews Table">
				<TableHead>
					<TableRow>
						<TableCell align="right">Reviewer</TableCell>
						<TableCell>Company</TableCell>
						<TableCell align="right">Created On</TableCell>
						<TableCell align="right">Review Text</TableCell>
						<TableCell align="right">Rating</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{reviews.length > 0 ? (
						reviews.map((review) => (
							<TableRow key={review.id}>
								<TableCell>{`${review.user.firstName} ${review.user.lastName}`}</TableCell>
								<TableCell align="right">{review.company.name}</TableCell>
								<TableCell align="right">{review.rating}</TableCell>
								<TableCell align="right">{review.reviewText}</TableCell>
								<TableCell align="right">
									{new Date(review.createdOn).toLocaleDateString()}
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={5} align="center">
								<Typography variant="subtitle1" color="textSecondary">
									No reviews found
								</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default ReviewsList;
