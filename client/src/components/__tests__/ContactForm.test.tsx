import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../../i18n/LanguageContext';
import ContactForm from '../ContactForm';

const renderContactForm = () => {
  return render(
    <BrowserRouter>
      <LanguageProvider>
        <ContactForm />
      </LanguageProvider>
    </BrowserRouter>
  );
};

describe('ContactForm', () => {
  test('renders all required fields', () => {
    renderContactForm();

    expect(screen.getByLabelText(/naam/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefoon/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bedrijf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/adres/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bericht/i)).toBeInTheDocument();
  });

  test('shows service-specific fields when a service is selected', async () => {
    renderContactForm();

    // Click on Property Survey service
    fireEvent.click(screen.getByText(/landmeten & afpaling/i));

    // Check if service-specific fields appear
    await waitFor(() => {
      expect(screen.getByLabelText(/perceelgrootte/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/kadastrale gegevens/i)).toBeInTheDocument();
    });
  });

  test('validates required fields before submission', async () => {
    renderContactForm();

    // Try to submit without required fields
    fireEvent.click(screen.getByText(/verstuur aanvraag/i));

    await waitFor(() => {
      expect(screen.getByText(/naam is verplicht/i)).toBeInTheDocument();
      expect(screen.getByText(/email is verplicht/i)).toBeInTheDocument();
      expect(screen.getByText(/bericht is verplicht/i)).toBeInTheDocument();
    });
  });

  test('successfully submits form with valid data', async () => {
    renderContactForm();

    // Fill in required fields
    fireEvent.change(screen.getByLabelText(/naam/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/bericht/i), {
      target: { value: 'Test message' },
    });

    // Submit form
    fireEvent.click(screen.getByText(/verstuur aanvraag/i));

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/aanvraag succesvol verzonden/i)).toBeInTheDocument();
    });
  });

  test('handles server errors gracefully', async () => {
    // Mock a server error for this test
    server.use(
      rest.post('http://localhost:3001/api/contact', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: 'Internal server error' })
        );
      })
    );

    renderContactForm();

    // Fill in and submit form
    fireEvent.change(screen.getByLabelText(/naam/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/bericht/i), {
      target: { value: 'Test message' },
    });

    fireEvent.click(screen.getByText(/verstuur aanvraag/i));

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/er is een fout opgetreden/i)).toBeInTheDocument();
    });
  });
});
