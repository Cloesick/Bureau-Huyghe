import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CookieConsent from '../CookieConsent';
import { LanguageProvider } from '../../i18n/LanguageContext';

const renderCookieConsent = () => {
  return render(
    <BrowserRouter>
      <LanguageProvider>
        <CookieConsent />
      </LanguageProvider>
    </BrowserRouter>
  );
};

describe('CookieConsent', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should show cookie consent banner when not previously accepted', () => {
    renderCookieConsent();
    expect(screen.getByTestId('cookie-consent')).toBeInTheDocument();
  });

  it('should not show banner when cookies are already accepted', () => {
    localStorage.setItem('cookieConsent', 'true');
    renderCookieConsent();
    expect(screen.queryByTestId('cookie-consent')).not.toBeInTheDocument();
  });

  it('should save acceptance to localStorage and hide banner when accepted', () => {
    renderCookieConsent();
    fireEvent.click(screen.getByTestId('accept-cookies'));
    
    expect(localStorage.getItem('cookieConsent')).toBe('true');
    expect(screen.queryByTestId('cookie-consent')).not.toBeInTheDocument();
  });

  it('should save decline to localStorage and hide banner when declined', () => {
    renderCookieConsent();
    fireEvent.click(screen.getByTestId('decline-cookies'));
    
    expect(localStorage.getItem('cookieConsent')).toBe('false');
    expect(screen.queryByTestId('cookie-consent')).not.toBeInTheDocument();
  });

  it('should navigate to privacy policy when clicking more info', () => {
    renderCookieConsent();
    const privacyLink = screen.getByTestId('privacy-link');
    expect(privacyLink).toHaveAttribute('href', '/privacy');
  });
});
