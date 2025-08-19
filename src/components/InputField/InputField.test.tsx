import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import InputField from './InputField';

describe('InputField', () => {
  it('renders with label and placeholder', () => {
    render(
      <InputField 
        label="Email" 
        placeholder="Enter your email" 
      />
    );
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('displays error message when invalid', () => {
    render(
      <InputField 
        label="Email" 
        invalid 
        errorMessage="Email is required" 
      />
    );
    
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows clear button when enabled and has value', async () => {
    const user = userEvent.setup();
    const onChangeMock = jest.fn();
    
    render(
      <InputField 
        value="test value"
        onChange={onChangeMock}
        showClearButton 
      />
    );
    
    const clearButton = screen.getByLabelText('Clear input');
    expect(clearButton).toBeInTheDocument();
    
    await user.click(clearButton);
    expect(onChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { value: '' }
      })
    );
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    
    render(
      <InputField 
        type="password"
        showPasswordToggle
        value="password123"
      />
    );
    
    const input = screen.getByDisplayValue('password123');
    const toggleButton = screen.getByLabelText('Show password');
    
    expect(input).toHaveAttribute('type', 'password');
    
    await user.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
  });

  it('disables input when disabled prop is true', () => {
    render(<InputField disabled label="Disabled Input" />);
    
    expect(screen.getByLabelText('Disabled Input')).toBeDisabled();
  });

  it('shows loading spinner when loading', () => {
    render(<InputField loading />);
    
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });
});