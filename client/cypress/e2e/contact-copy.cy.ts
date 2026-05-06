describe('Contact Page Copy (Brochure Mode)', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('does not claim GDPR compliance in UI copy', () => {
    cy.contains(/gdpr/i).should('not.exist');
  });

  it('does not promise a 24-hour response in UI copy', () => {
    cy.contains(/24\s*uur/i).should('not.exist');
    cy.contains(/within\s*24\s*hours/i).should('not.exist');
  });

  it('does not show appointment booking CTA', () => {
    cy.get('a[href="/appointments"]').should('not.exist');
    cy.contains(/afspraak/i).should('not.exist');
    cy.contains(/calendly/i).should('not.exist');
  });
});
