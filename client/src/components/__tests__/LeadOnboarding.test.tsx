import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { server } from '../../mocks/server';
import LeadOnboarding from '../LeadOnboarding';

const renderLeadOnboarding = () => {
  return render(
    <BrowserRouter>
      <LeadOnboarding />
    </BrowserRouter>
  );
};

describe('LeadOnboarding', () => {
  test('renders all onboarding steps', () => {
    renderLeadOnboarding();

    // Check for step indicators
    expect(screen.getByText(/stap 1/i)).toBeInTheDocument();
    expect(screen.getByText(/stap 2/i)).toBeInTheDocument();
    expect(screen.getByText(/stap 3/i)).toBeInTheDocument();
  });

  test('validates contact information in first step', async () => {
    renderLeadOnboarding();

    // Try to proceed without filling required fields
    fireEvent.click(screen.getByText(/volgende/i));

    await waitFor(() => {
      expect(screen.getByText(/naam is verplicht/i)).toBeInTheDocument();
      expect(screen.getByText(/email is verplicht/i)).toBeInTheDocument();
    });

    // Fill in required fields
    fireEvent.change(screen.getByLabelText(/naam/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    });

    // Proceed to next step
    fireEvent.click(screen.getByText(/volgende/i));

    // Check if we moved to step 2
    await waitFor(() => {
      expect(screen.getByText(/project details/i)).toBeInTheDocument();
    });
  });

  test('validates project information in second step', async () => {
    renderLeadOnboarding();

    // Fill first step and proceed
    fireEvent.change(screen.getByLabelText(/naam/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.click(screen.getByText(/volgende/i));

    // Try to proceed without selecting project type
    fireEvent.click(screen.getByText(/volgende/i));

    await waitFor(() => {
      expect(screen.getByText(/selecteer een type project/i)).toBeInTheDocument();
    });

    // Select project type
    fireEvent.click(screen.getByText(/landmeten & afpaling/i));

    // Fill project details
    fireEvent.change(screen.getByLabelText(/adres/i), {
      target: { value: 'Test Street 123' }
    });

    // Proceed to next step
    fireEvent.click(screen.getByText(/volgende/i));

    // Check if we moved to step 3
    await waitFor(() => {
      expect(screen.getByText(/account aanmaken/i)).toBeInTheDocument();
    });
  });

  test('completes registration in final step', async () => {
    renderLeadOnboarding();

    // Complete first step
    fireEvent.change(screen.getByLabelText(/naam/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.click(screen.getByText(/volgende/i));

    // Complete second step
    fireEvent.click(screen.getByText(/landmeten & afpaling/i));
    fireEvent.change(screen.getByLabelText(/adres/i), {
      target: { value: 'Test Street 123' }
    });
    fireEvent.click(screen.getByText(/volgende/i));

    // Fill in password
    fireEvent.change(screen.getByLabelText(/wachtwoord/i), {
      target: { value: 'SecurePass123!' }
    });
    fireEvent.change(screen.getByLabelText(/bevestig wachtwoord/i), {
      target: { value: 'SecurePass123!' }
    });

    // Complete registration
    fireEvent.click(screen.getByText(/account aanmaken/i));

    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/account succesvol aangemaakt/i)).toBeInTheDocument();
    });
  });

  test('handles registration error gracefully', async () => {
    // Mock registration failure
    server.use(
      rest.post('http://localhost:3001/api/auth/register', (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({ message: 'Email already exists' })
        );
      })
    );

    renderLeadOnboarding();

    // Complete all steps
    fireEvent.change(screen.getByLabelText(/naam/i), {
      target: { value: 'John Doe' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.click(screen.getByText(/volgende/i));

    fireEvent.click(screen.getByText(/landmeten & afpaling/i));
    fireEvent.change(screen.getByLabelText(/adres/i), {
      target: { value: 'Test Street 123' }
    });
    fireEvent.click(screen.getByText(/volgende/i));

    fireEvent.change(screen.getByLabelText(/wachtwoord/i), {
      target: { value: 'SecurePass123!' }
    });
    fireEvent.change(screen.getByLabelText(/bevestig wachtwoord/i), {
      target: { value: 'SecurePass123!' }
    });

    fireEvent.click(screen.getByText(/account aanmaken/i));

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/email bestaat al/i)).toBeInTheDocument();
    });
  });
});
