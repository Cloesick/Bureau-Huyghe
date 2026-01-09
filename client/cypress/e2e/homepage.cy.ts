describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the main navigation', () => {
    cy.get('[data-test="nav-property-survey"]').should('be.visible');
    cy.get('[data-test="nav-construction-survey"]').should('be.visible');
    cy.get('[data-test="nav-technical-documentation"]').should('be.visible');
    cy.get('[data-test="nav-legal-services"]').should('be.visible');
  });

  it('shows cookie consent banner', () => {
    cy.get('[data-test="cookie-consent"]').should('be.visible');
    cy.get('[data-test="accept-cookies"]').click();
    cy.get('[data-test="cookie-consent"]').should('not.exist');
  });

  it('switches language', () => {
    // Test Dutch
    cy.contains('button', 'NL').click();
    cy.get('[data-test="cta-button"]').should('contain', 'Offerte Aanvragen');

    // Test French
    cy.contains('button', 'FR').click();
    cy.get('[data-test="cta-button"]').should('contain', 'Demander un Devis');

    // Test English
    cy.contains('button', 'EN').click();
    cy.get('[data-test="cta-button"]').should('contain', 'Request Quote');
  });

  it('navigates to contact page from CTA', () => {
    cy.get('[data-test="cta-button"]').click();
    cy.url().should('include', '/contact');
  });

  it('displays service cards', () => {
    cy.get('[data-test="service-card"]').should('have.length', 4);
    cy.get('[data-test="service-card"]').first().should('contain', 'Landmeting');
  });

  it('shows mobile menu on small screens', () => {
    cy.viewport('iphone-x');
    cy.get('[data-test="mobile-menu-button"]').should('be.visible').click();
    cy.get('[data-test="mobile-nav"]').should('be.visible');
    cy.get('[data-test="mobile-nav"]').find('a').should('have.length.at.least', 4);
  });

  it('loads and displays hero section', () => {
    cy.get('[data-test="hero-section"]').should('be.visible');
    cy.get('[data-test="hero-title"]').should('not.be.empty');
    cy.get('[data-test="hero-description"]').should('not.be.empty');
  });

  it('displays contact information in header', () => {
    cy.get('[data-test="header-email"]').should('contain', 'info@bureau-huyghe.be');
    cy.get('[data-test="header-phone"]').should('contain', '050/00 00 00');
  });

  it('has working footer links', () => {
    cy.get('footer').within(() => {
      cy.get('a[href="/privacy"]').should('exist');
      cy.get('a[href="/terms"]').should('exist');
      cy.get('a[href="/contact"]').should('exist');
    });
  });
});
