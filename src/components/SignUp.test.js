import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp from './SignUp';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import "@testing-library/jest-dom";
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/auth';
import premiumReducer from '../store/theme';
import expenseReducer from '../store/expense';

// Mock the fetch API
global.fetch = jest.fn();

const renderWithProviders = (ui) => {
    const store = configureStore({
        reducer: {
            auth: authReducer,
            premium: premiumReducer,
            expense: expenseReducer,
        },
    });
    return render(
        <Provider store={store}>
            <Router>
                {ui}
            </Router>
        </Provider>
    );
};

describe('SignUp Component', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('renders sign-up form text by default', () => {
        renderWithProviders(<SignUp />);
        expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    });

    test('renders login form text after toggle', async () => {
        renderWithProviders(<SignUp />);
        fireEvent.click(screen.getByRole('button', { name: /already have an account\?login/i }));
        expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Confirm Password')).toBeNull();
    });

    test('renders sign-up form text after toggling back', async () => {
        renderWithProviders(<SignUp />);
        fireEvent.click(screen.getByRole('button', { name: /already have an account\?login/i }));
        fireEvent.click(screen.getByRole('button', { name: /new user\? sign up/i }));
        expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    });

    test('clicking "Sign Up" button triggers fetch', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ idToken: 'fake-token' }),
        });

        renderWithProviders(<SignUp />);
        userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
        userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
        userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'password123');
        userEvent.click(screen.getByRole('button', { name: /sign up/i }));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('signUp'), expect.any(Object));
        });
    });

    test('clicking "Login" button triggers fetch', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ idToken: 'fake-token' }),
        });

        renderWithProviders(<SignUp />);
        userEvent.click(screen.getByRole('button', { name: /already have an account\?login/i }));
        userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
        userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
        userEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('signInWithPassword'), expect.any(Object));
        });
    });
});

