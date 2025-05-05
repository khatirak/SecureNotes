import React, { useContext } from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { AuthProvider, AuthContext } from './AuthContext';
import '@testing-library/jest-dom'; // Import for toHaveTextContent matcher

// Mock API and localStorage
jest.mock('../api', () => ({
  login: jest.fn()
}));

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => { store[key] = value.toString(); }),
    removeItem: jest.fn((key: string) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; })
  };
})();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// Simple test component
const TestComponent = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  
  return (
    <div>
      <div data-testid="authenticated">{isAuthenticated.toString()}</div>
      <button onClick={() => login('testuser', 'password123')}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('handles authentication flow', async () => {
    const { login } = require('../api');
    
    // Mock successful login
    login.mockResolvedValue({
      token: 'fake-token'
    });
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    // Initial state should be unauthenticated
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    
    // Perform login
    act(() => {
      screen.getByText(/login/i).click();
    });
    
    // Verify authenticated state after login
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
    });
    
    // Perform logout
    act(() => {
      screen.getByText(/logout/i).click();
    });
    
    // Verify unauthenticated state after logout
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    });
  });
});