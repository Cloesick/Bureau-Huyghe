describe('Bureau Huyghe Website', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Header Component', () => {
    it('should display the logo', () => {
      cy.get('[data-test="header"]')
        .find('img')
        .should('have.attr', 'src', '/logo Bureau Huyghe.png')
        .should('have.attr', 'alt', 'Bureau Huyghe - Logo');
    });

    it('should have correct navigation links', () => {
      const navItems = [
        { text: 'Landmeting', href: '/landmeting' },
        { text: 'Bouwmeting', href: '/bouwmeting' },
        { text: 'Technische Documentatie', href: '/technische-documentatie' },
        { text: 'Juridisch', href: '/juridisch' }
      ];

      navItems.forEach(item => {
        cy.get('[data-test="header"]')
          .find('nav')
          .contains(item.text)
          .should('have.attr', 'href', item.href);
      });
    });

    it('should have a CTA button for quote requests', () => {
      cy.get('[data-test="cta-button"]')
        .should('contain', 'Offerte Aanvragen')
        .should('have.attr', 'href', '/offerte')
        .should('have.class', 'bg-accent-400');
    });

    it('should show mobile menu on button click', () => {
      cy.viewport('iphone-x');
      cy.get('[aria-label="Menu openen"]').click();
      cy.get('[data-test="header"]')
        .find('nav')
        .should('be.visible')
        .contains('Landmeting')
        .should('be.visible');
    });
  });

  describe('Footer Component', () => {
    it('should display contact information', () => {
      cy.get('[data-test="footer"]')
        .should('contain', 'info@bureau-huyghe.be')
        .should('contain', 'T. +32 (0)50 00 00 00')
        .should('contain', '8200 Brugge');
    });

    it('should have navigation links', () => {
      const footerLinks = [
        'Home',
        'Landmeting',
        'Bouwmeting',
        'Technische Documentatie',
        'Juridisch',
        'Offerte'
      ];

      footerLinks.forEach(link => {
        cy.get('[data-test="footer-link"]')
          .contains(link)
          .should('exist');
      });
    });

    it('should display copyright and legal links', () => {
      cy.get('[data-test="footer"]')
        .should('contain', '© 2025 Bureau Huyghe')
        .should('contain', 'Cookies')
        .should('contain', 'Privacyverklaring')
        .should('contain', 'GDPR-compliant');
    });
  });

  describe('Color Scheme', () => {
    it('should use correct brand colors', () => {
      // Primary color (green)
      cy.get('[data-test="header"]')
        .should('have.class', 'bg-primary-500');

      // Accent color (gold)
      cy.get('[data-test="cta-button"]')
        .should('have.class', 'bg-accent-400');
    });
  });
});
