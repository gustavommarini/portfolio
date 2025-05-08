import {
  render,
  screen,
  fireEvent,
  renderHook,
  act,
} from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import '@/test-utils/envMock';
import { PageWrapper } from '@/test-utils';
import { contactConfig } from '@/services';
import emailjs from '@emailjs/browser';
import Contact from './Contact';

// Mock emailjs
jest.mock('@emailjs/browser', () => ({
  send: jest.fn(),
}));

describe('Contact', () => {
  const mockSend = emailjs.send as jest.Mock;

  beforeEach(() => {
    mockSend.mockClear();
  });

  const renderContact = () => {
    return render(
      <PageWrapper>
        <Contact />
      </PageWrapper>
    );
  };

  test('renders main sections', () => {
    const t = renderHook(() => useTranslation(['contact']));
    renderContact();

    // Check title and subtitle
    expect(
      screen.getByText(t.result.current.t('contact:title'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t.result.current.t('contact:subtitle'))
    ).toBeInTheDocument();

    // Check body title
    expect(
      screen.getByText(t.result.current.t('contact:body_title'))
    ).toBeInTheDocument();
  });

  test('renders contact information', () => {
    renderContact();

    // Check email
    const emailLink = screen.getByText(contactConfig.email);
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.closest('a')).toHaveAttribute(
      'href',
      `mailto:${contactConfig.email}`
    );

    // Check phone
    const phoneLink = screen.getByText(contactConfig.phone_formated);
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink.closest('a')).toHaveAttribute(
      'href',
      `tel:${contactConfig.phone}`
    );
  });

  test('renders contact form with all fields', () => {
    const t = renderHook(() => useTranslation(['contact']));
    renderContact();

    // Check form fields
    expect(
      screen.getByPlaceholderText(t.result.current.t('contact:form.name'))
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(t.result.current.t('contact:form.email'))
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(t.result.current.t('contact:form.message'))
    ).toBeInTheDocument();

    // Check submit button
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('validates form fields', async () => {
    const t = renderHook(() => useTranslation(['contact']));
    renderContact();

    const nameInput = screen.getByPlaceholderText(
      t.result.current.t('contact:form.name')
    );
    const emailInput = screen.getByPlaceholderText(
      t.result.current.t('contact:form.email')
    );
    const messageInput = screen.getByPlaceholderText(
      t.result.current.t('contact:form.message')
    );

    // Test invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    expect(
      screen.getByText(t.result.current.t('contact:error.email'))
    ).toBeInTheDocument();

    // Test short name
    fireEvent.change(nameInput, { target: { value: 'Jo' } });
    expect(
      screen.getByText(t.result.current.t('contact:error.name'))
    ).toBeInTheDocument();

    // Test short message
    fireEvent.change(messageInput, { target: { value: 'Hi' } });
    expect(
      screen.getByText(t.result.current.t('contact:error.message'))
    ).toBeInTheDocument();
  });

  //   test('handles form submission', async () => {
  //     const t = renderHook(() => useTranslation(['contact']));
  //     act(() => {
  //       mockSend.mockResolvedValueOnce({});
  //     });
  //     renderContact();

  //     // Fill form with valid data
  //     fireEvent.change(
  //       screen.getByPlaceholderText(t.result.current.t('contact:form.name')),
  //       {
  //         target: { value: 'John Doe' },
  //       }
  //     );
  //     fireEvent.change(
  //       screen.getByPlaceholderText(t.result.current.t('contact:form.email')),
  //       {
  //         target: { value: 'john@example.com' },
  //       }
  //     );
  //     fireEvent.change(
  //       screen.getByPlaceholderText(t.result.current.t('contact:form.message')),
  //       {
  //         target: { value: 'Hello, this is a test message.' },
  //       }
  //     );

  //     // Submit form
  //     fireEvent.click(screen.getByRole('button'));

  //     // Check if emailjs.send was called with correct parameters
  //     act(() => {
  //       /* fire events that update state */
  //       expect(mockSend).toHaveBeenCalledWith(
  //         expect.any(String),
  //         expect.any(String),
  //         {
  //           email: 'john@example.com',
  //           name: 'John Doe',
  //           message: 'Hello, this is a test message.',
  //         },
  //         {
  //           publicKey: expect.any(String),
  //         }
  //       );
  //     });
  //   });

  test('shows success toast on successful submission', async () => {
    const t = renderHook(() => useTranslation(['contact']));
    act(() => {
      /* fire events that update state */
      mockSend.mockResolvedValueOnce({});
    });
    renderContact();

    // Fill and submit form
    fireEvent.change(
      screen.getByPlaceholderText(t.result.current.t('contact:form.name')),
      {
        target: { value: 'John Doe' },
      }
    );
    fireEvent.change(
      screen.getByPlaceholderText(t.result.current.t('contact:form.email')),
      {
        target: { value: 'john@example.com' },
      }
    );
    fireEvent.change(
      screen.getByPlaceholderText(t.result.current.t('contact:form.message')),
      {
        target: { value: 'Hello, this is a test message.' },
      }
    );
    fireEvent.click(screen.getByRole('button'));

    // Check success message
    expect(
      await screen.findByText(t.result.current.t('contact:messages.success'))
    ).toBeInTheDocument();
  });

  test('shows error toast on failed submission', async () => {
    const t = renderHook(() => useTranslation(['contact']));
    act(() => {
      /* fire events that update state */
      mockSend.mockRejectedValueOnce(new Error('Failed to send'));
    });
    renderContact();

    // Fill and submit form
    fireEvent.change(
      screen.getByPlaceholderText(t.result.current.t('contact:form.name')),
      {
        target: { value: 'John Doe' },
      }
    );
    fireEvent.change(
      screen.getByPlaceholderText(t.result.current.t('contact:form.email')),
      {
        target: { value: 'john@example.com' },
      }
    );
    fireEvent.change(
      screen.getByPlaceholderText(t.result.current.t('contact:form.message')),
      {
        target: { value: 'Hello, this is a test message.' },
      }
    );
    fireEvent.click(screen.getByRole('button'));

    // Check error message
    expect(
      await screen.findByText(t.result.current.t('contact:messages.error'))
    ).toBeInTheDocument();
  });
});
