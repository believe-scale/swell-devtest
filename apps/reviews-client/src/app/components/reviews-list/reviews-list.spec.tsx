import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { Review } from '../../types/review';
import { empty } from 'rxjs';

const mockReviews: Review[] = [
	{
		id: '1',
		reviewerId: '1',
		companyId: '1',
		reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		rating: 5,
		createdOn: '2023-01-05',
		company: {
			id: '1',
			name: 'Test Company',
		},
		user: {
			id: '1',
			firstName: 'John',
			lastName: 'Doe',
			email: 'john.doe@gmail.com',
		},
	},
];

const emptyMockReviews: Review[] = [];

describe('ReviewsList', () => {
	it('should render successfully', () => {
		const { baseElement } = render(
			<ReviewsList reviews={mockReviews} loading={false} error={null} />,
		);

		expect(baseElement).toBeTruthy();
	});

	it('should render list of reviews', () => {
		render(<ReviewsList reviews={mockReviews} loading={false} error={null} />);

		expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
	});

	it('should display message if no reviews are found', async () => {
		render(<ReviewsList reviews={emptyMockReviews} loading={false} error={null} />);

		expect(await screen.findByText('No reviews found')).toBeInTheDocument();
	});

	it('should display all required fields', async () => {
		render(<ReviewsList reviews={mockReviews} loading={false} error={null} />);

		// full reviewer name
		expect(await screen.findByText('John Doe')).toBeInTheDocument();

		// company name
		expect(await screen.findByText('Test Company')).toBeInTheDocument();

		// rating
		expect(await screen.findByText('5')).toBeInTheDocument();

		// review text
		expect(
			await screen.findByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
		).toBeInTheDocument();
	});

	it('should display loading indicator', async () => {
		render(<ReviewsList reviews={emptyMockReviews} loading={true} error={null} />);

		// Check for the CircularProgress component - MUI uses aria-label progressbar to identify it
		expect(screen.getByRole('progressbar')).toBeInTheDocument();
	});

	it('should display error message', async () => {
		render(<ReviewsList reviews={emptyMockReviews} loading={false} error={'Test Error'} />);

		// Check if it displays the error message
		expect(await screen.findByText('Test Error')).toBeInTheDocument();
	});
});
