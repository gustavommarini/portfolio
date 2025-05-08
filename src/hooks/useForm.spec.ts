import { renderHook, act } from '@testing-library/react';
import { useForm } from './useForm';

describe('useForm', () => {
  test('should initialize with empty form data and no errors', () => {
    const { result } = renderHook(() => useForm());

    expect(result.current.formData).toEqual({
      email: '',
      name: '',
      message: '',
    });

    expect(result.current.formErrors).toEqual({
      email: false,
      name: false,
      message: false,
    });
  });

  test('should update form data on handleChange', () => {
    const { result } = renderHook(() => useForm());
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
        persist: () => {},
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.formData.name).toBe('John Doe');
    expect(result.current.formErrors.name).toBe(false);
  });

  test('should validate email format', () => {
    const { result } = renderHook(() => useForm());
    // Test invalid email
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'invalid-email' },
        persist: () => {},
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.formErrors.email).toBe(true);
    // Test valid email
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'valid@email.com' },
        persist: () => {},
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.formErrors.email).toBe(false);
  });

  test('should validate name and message length', () => {
    const { result } = renderHook(() => useForm());
    // Test short name
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John' },
        persist: () => {},
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.formErrors.name).toBe(true);
    // Test valid name
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
        persist: () => {},
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.formErrors.name).toBe(false);
  });

  test('should reset form data and errors', () => {
    const { result } = renderHook(() => useForm());
    // Fill form with data
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'John Doe' },
        persist: () => {},
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.handleChange({
        target: { name: 'email', value: 'john@example.com' },
        persist: () => {},
      } as React.ChangeEvent<HTMLInputElement>);
    });
    // Reset form
    act(() => {
      result.current.resetFormStates();
    });
    expect(result.current.formData).toEqual({
      email: '',
      name: '',
      message: '',
    });
    expect(result.current.formErrors).toEqual({
      email: false,
      name: false,
      message: false,
    });
  });
});
