import reducer, {
  incrementCounter,
  fetchData,
  loadPersistedData,
} from '../src/store/slices/homeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('homeSlice Redux tests', () => {
  const initialState = {
    counter: 0,
    items: [],
    loading: false,
  };

  it('should return initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should increment counter', () => {
    const newState = reducer(initialState, incrementCounter());
    expect(newState.counter).toBe(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('counter', '1');
  });

  it('should handle fetchData.pending', () => {
    const newState = reducer(initialState, { type: fetchData.pending.type });
    expect(newState.loading).toBe(true);
  });

  it('should handle fetchData.fulfilled', () => {
    const mockData = [{ id: 1, userId: 1, title: 'Test', body: 'Body' }];
    const newState = reducer(initialState, {
      type: fetchData.fulfilled.type,
      payload: mockData,
    });
    expect(newState.items).toEqual(mockData);
    expect(newState.loading).toBe(false);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'items',
      JSON.stringify(mockData),
    );
  });

  it('should load persisted data', () => {
    const mockData = {
      counter: 2,
      items: [{ id: 1, title: 'Item', body: 'Body', userId: 1 }],
    };
    const newState = reducer(initialState, {
      type: loadPersistedData.fulfilled.type,
      payload: mockData,
    });
    expect(newState.counter).toBe(2);
    expect(newState.items.length).toBe(1);
  });
});
