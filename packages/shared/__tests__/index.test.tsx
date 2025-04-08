import { configureStore } from '@reduxjs/toolkit';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ModalQueue } from '../modules/modal-queue';
import modalReducer, { Modal, ModalState } from '../redux/slices/modal-slice';

const TEST_CONTENT: Modal[] = [
  {
    id: '1',
    title: "It's a Casino Day",
    description: '100% bonus up to €500 cash',
    subDescription: 'Brand Casino A, EN Content',
    buttonText: 'Close',
  },
  {
    id: '2',
    title: "It's a Casino Day",
    description: '100% bonus up to €500 cash',
    subDescription: 'Brand Casino A, EN Content',
    buttonText: 'Close',
  },
];

// Utility function to render component with a test Redux store.
const renderWithStore = (preloadedState: { modal: ModalState }) => {
  const store = configureStore({
    reducer: { modal: modalReducer },
    preloadedState,
  });
  return {
    store,
    ...render(
      <Provider store={store}>
        <ModalQueue />
      </Provider>,
    ),
  };
};

describe('ModalQueue Component - Unit and Integration Tests', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('renders nothing when no modals exist', () => {
    renderWithStore({ modal: { queue: [] } });
    // Expect nothing to be rendered
    expect(screen.queryByText(/Close/i)).toBeNull();
  });

  test('renders modal if one exists and auto removes after 5 seconds', async () => {
    const TEST_DATE = TEST_CONTENT[0]!;
    // Preload state with one modal.
    renderWithStore({
      modal: {
        queue: [TEST_DATE],
      },
    });

    // The modal message and the close button should be rendered.
    expect(screen.getByText(TEST_DATE.title)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument();

    // Find and click the "Close" button.
    const closeButton = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeButton);

    // Advance timers by 5 seconds.
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Wait for the modal to be removed.
    expect(screen.queryByText(TEST_DATE.title)).toBeNull();
  });

  test('allows manual dismissal of modal', async () => {
    const TEST_DATE = TEST_CONTENT[1]!;
    const { store } = renderWithStore({
      modal: {
        queue: [TEST_DATE],
      },
    });

    // Ensure modal is visible.
    expect(screen.getByText(TEST_DATE.buttonText)).toBeInTheDocument();

    // Find and click the "Close" button.
    const closeButton = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeButton);

    // After clicking, the modal should be removed.
    // We can also check the store state if needed.
    expect(screen.queryByText(TEST_DATE.buttonText)).toBeNull();

    // Optionally, assert that the state is updated.
    const state = store.getState();
    expect(state.modal.queue.length).toBe(0);
  });
});
