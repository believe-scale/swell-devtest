import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import WebFont from 'webfontloader';
import Header from './components/header/header';
import ReviewsList from './components/reviews-list/reviews-list';
import { theme } from './theme';
import { useEffect, useState } from 'react';
import { Review, ReviewsFetchResponse } from './types/review';

WebFont.load({
	google: {
		families: ['Montserrat:500,600,700'],
	},
});

export function App() {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch('/api/reviews')
			.then((response) => response.json())
			.then((data: ReviewsFetchResponse) => {
				// NOTE: test error state if you want
				// throw new Error('Error: Toast some marshmallows.');

				setReviews(data.reviews);

				// add a wait time to mock the loading state
				setTimeout(() => {
					setLoading(false);
				}, 1000);
			})
			.catch((error: Error) => {
				setError(error.message);
			});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Header />
			<Container sx={{ mt: 2, typography: 'body1' }}>
				<ReviewsList reviews={reviews} loading={loading} error={error} />
			</Container>
		</ThemeProvider>
	);
}

export default App;
