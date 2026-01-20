describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the main navigation', () => {
    cy.get('[data-test="nav-home"]').should('be.visible');
    cy.get('[data-test="nav-services"]').should('be.visible');
    cy.get('[data-test="nav-contact"]').should('be.visible');
  });

  it('shows cookie consent banner', () => {
    cy.get('[data-test="cookie-consent"]').should('not.exist');
  });

  it('navigates to offerte page from CTA', () => {
    cy.get('[data-test="cta-button"]').click();
    cy.url().should('include', '/offerte');
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
    cy.get('[data-test="header-phone"]').should('contain', '+32');
  });

  it('has working footer links', () => {
    cy.get('footer').within(() => {
      cy.get('a[href="/privacy"]').should('exist');
      cy.get('a[href="/voorwaarden"]').should('exist');
      cy.get('a[href="/contact"]').should('exist');
    });
  });
});
