describe('Brochure Mode', () => {
  it('renders a minimal public header and no language switcher', () => {
    cy.visit('/');

    cy.get('[data-test="header"]').should('exist');

    cy.get('[data-test="language-switcher"]').should('not.exist');

    cy.get('[data-test="nav-home"]').should('exist');
    cy.get('[data-test="nav-services"]').should('exist');
    cy.get('[data-test="nav-contact"]').should('exist');

    cy.get('[data-test="cta-button"]').should('have.attr', 'href', '/offerte');
  });

  it('does not expose appointment booking links publicly', () => {
    cy.visit('/');

    cy.get('a[href="/appointments"]').should('not.exist');
    cy.contains(/afspraak/i).should('not.exist');
    cy.contains(/calendly/i).should('not.exist');
  });

  it('CTA navigates to offerte page', () => {
    cy.visit('/');

    cy.get('[data-test="cta-button"]').click();
    cy.url().should('include', '/offerte');
    cy.contains('h1', /offerte/i).should('be.visible');
  });
});
