import { render } from '@testing-library/react';
import App from './app';

describe('App', () => {
	it('should render successfully', () => {
		global.fetch = jest.fn(
			() =>
				Promise.resolve({
					json: () =>
						Promise.resolve({
							reviews: [],
						}),
					status: 200,
				}) as Promise<Response>,
		);

		const { baseElement } = render(<App />);

		expect(baseElement).toBeTruthy();
	});
});
