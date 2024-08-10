import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from './Header';
import authReducer, { authActions } from '../store/auth';
import premiumReducer, { premiumActions } from '../store/theme';
import expenseReducer from '../store/expense';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch:jest.fn(),
}));

const renderWithState = (initialState) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      premium: premiumReducer,
      expense: expenseReducer,
    },
    preloadedState: initialState,
  });

  return render(
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
    </Provider>
  );
};

describe('Header Component', () => {
  let mockDispatch;
  beforeEach(() => {
    mockDispatch=jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

    test('renders without crashing', () => {
      renderWithState({});
      expect(screen.getByText(/Expense Traker/i)).toBeInTheDocument();
    });
  
    test('displays "Switch to dark theme" button when authenticated, premium, and totalExpense >= 1000', () => {
      renderWithState({
        auth: { isAuthenticated: true },
        premium: { ispremium: true, theme: true },
        expense: { expense: 1000 },
      });
  
      expect(screen.getByText(/Switch to dark Theme/i)).toBeInTheDocument();
    });
  
    test('displays "Switch to light theme" button when authenticated, premium, and totalExpense >= 1000 with light theme', () => {
      renderWithState({
        auth: { isAuthenticated: true },
        premium: { ispremium: true, theme: false },
        expense: { expense: 1000 },
      });
  
      expect(screen.getByText(/Switch to light Theme/i)).toBeInTheDocument();
    });
  
    test('does not display theme button if not authenticated', () => {
      renderWithState({
        auth: { isAuthenticated: false },
        premium: { ispremium: true },
        expense: { expense: 1001 },
      });
  
      expect(screen.queryByText(/Switch to dark theme/i)).toBeNull();
    });
  
    test('does not display theme button if not premium', () => {
      renderWithState({
        auth: { isAuthenticated: true },
        premium: { ispremium: false },
        expense: { expense: 1001 },
      });
  
      expect(screen.queryByText(/Switch to dark theme/i)).toBeNull();
    });
  
    test('does not display theme button if totalExpense < 1000', () => {
      renderWithState({
        auth: { isAuthenticated: true },
        premium: { ispremium: true },
        expense: { expense: 999 },
      });
  
      expect(screen.queryByText(/Switch to dark theme/i)).toBeNull();
    });
  
    test('displays Logout button when authenticated', () => {
      renderWithState({
        auth: { isAuthenticated: true },
      });
  
      expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    });
  
    test('does not display Logout button when not authenticated', () => {
      renderWithState({
        auth: { isAuthenticated: false },
      });
  
      expect(screen.queryByText(/Logout/i)).toBeNull();
    });
  
    test('handles Logout button click', () => {
  
      renderWithState({
        auth: { isAuthenticated: true },
      });
  
      fireEvent.click(screen.getByText(/Logout/i));
      expect(mockDispatch).toHaveBeenCalledWith(authActions.logout()); // Adjust based on your setup
    });
  
    test('handles Theme button click', () => {
  
      renderWithState({
        auth: { isAuthenticated: true },
        premium: { ispremium: true, theme: true },
        expense: { expense: 1000 },
      });
      fireEvent.click(screen.getByText(/Switch to dark theme/i));
      expect(mockDispatch).toHaveBeenCalledWith(premiumActions.change()); // Adjust based on your setup
    });
  });