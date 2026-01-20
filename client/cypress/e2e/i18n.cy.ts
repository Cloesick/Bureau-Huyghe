describe('Internationalization (i18n)', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        (win as Window).localStorage.setItem('language', 'nl');
      },
    });
  });

  it('does not render a language switcher in brochure-mode', () => {
    cy.get('[data-test="language-switcher"]').should('not.exist');
  });

  it('renders the header CTA', () => {
    cy.get('[data-test="cta-button"]').should('contain', 'Offerte');
  });
});
