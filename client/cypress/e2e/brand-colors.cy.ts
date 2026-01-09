describe('Brand Colors', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should use correct brand colors in header', () => {
    cy.checkBrandColors();
  });

  it('should use correct colors in interactive elements', () => {
    // Check CTA button
    cy.get('[data-test="cta-button"]')
      .should('have.class', 'bg-accent-400')
      .realHover()
      .should('have.class', 'hover:bg-accent-500');

    // Check hero buttons
    cy.get('[data-test="hero-cta"]')
      .should('have.class', 'bg-accent-400')
      .realHover()
      .should('have.class', 'hover:bg-accent-500');

    // Check links
    cy.get('[data-test="nav-link"]')
      .should('have.class', 'text-primary-100')
      .realHover()
      .should('have.class', 'hover:text-accent-400');
  });

  it('should maintain contrast ratios for accessibility', () => {
    cy.checkAccessibility();
  });

  it('should use correct colors in footer', () => {
    cy.get('[data-test="footer"]')
      .should('have.class', 'bg-primary-950')
      .should('exist');
    
    cy.get('[data-test="footer-link"]')
      .should('have.class', 'text-primary-200')
      .realHover()
      .should('have.class', 'hover:text-accent-400');
  });
});
