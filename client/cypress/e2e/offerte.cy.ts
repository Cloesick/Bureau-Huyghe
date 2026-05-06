describe('Offerte Page (Brochure Mode)', () => {
  beforeEach(() => {
    cy.visit('/offerte');
  });

  it('provides mailto as the primary offerte path', () => {
    cy.get('a[href^="mailto:info@bureau-huyghe.be"]').should('exist');
  });

  it('provides a phone link as an alternative', () => {
    cy.get('a[href^="tel:+3250000000"]').should('exist');
  });

  it('does not contain appointment booking or calculators', () => {
    cy.get('a[href="/appointments"]').should('not.exist');
    cy.contains(/calendly/i).should('not.exist');
    cy.contains(/calculator/i).should('not.exist');
    cy.contains(/snelle offerte/i).should('not.exist');
  });
});
