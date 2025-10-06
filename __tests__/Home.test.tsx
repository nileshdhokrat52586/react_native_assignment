import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import Home from '../src/screens/Home';
import * as homeApi from '../src/api/homeApi';

jest.mock('../src/api/homeApi');

describe('HomeScreen UI tests', () => {
  const mockPosts = [
    { id: 1, userId: 1, title: 'Post 1', body: 'Content 1' },
    { id: 2, userId: 1, title: 'Post 2', body: 'Content 2' },
  ];

  beforeEach(() => {
    (homeApi.getPosts as jest.Mock).mockResolvedValue(mockPosts);
  });

  it('renders Fetch Data button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(getByText('Fetch Data')).toBeTruthy();
  });

  it('increments counter and fetches data on button press', async () => {
    const { getByText, findByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const button = getByText('Fetch Data');
    fireEvent.press(button);

    // Wait for data rendering
    await waitFor(() => expect(findByText('Post 1')).resolves.toBeTruthy());
    expect(getByText('Post 1')).toBeTruthy();
    expect(getByText('Post 2')).toBeTruthy();
  });
});
