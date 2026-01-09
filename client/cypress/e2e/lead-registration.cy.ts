describe('Lead Registration Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should complete lead registration process', () => {
    // Start registration
    cy.get('[data-test="register-button"]').click();

    // Step 1: Personal Information
    cy.get('[data-test="first-name"]').type('John');
    cy.get('[data-test="last-name"]').type('Doe');
    cy.get('[data-test="email"]').type('john.doe@example.com');
    cy.get('[data-test="phone"]').type('0470123456');
    cy.get('[data-test="next-button"]').click();

    // Step 2: Project Details
    cy.get('[data-test="project-type-property"]').click();
    cy.get('[data-test="project-address"]')
      .type('Koningin Astridlaan 134, Brugge');
    cy.get('[data-test="project-description"]')
      .type('Perceelafbakening nodig voor nieuwbouwproject');
    cy.get('[data-test="next-button"]').click();

    // Step 3: Account Creation
    cy.get('[data-test="password"]').type('SecurePass123!');
    cy.get('[data-test="confirm-password"]').type('SecurePass123!');
    cy.get('[data-test="complete-registration"]').click();

    // Verify success
    cy.url().should('include', '/dashboard');
    cy.get('[data-test="welcome-message"]')
      .should('contain', 'John');
  });

  it('should show validation errors for required fields', () => {
    cy.get('[data-test="register-button"]').click();
    cy.get('[data-test="next-button"]').click();

    cy.get('[data-test="first-name-error"]')
      .should('contain', 'Naam is verplicht');
    cy.get('[data-test="email-error"]')
      .should('contain', 'Email is verplicht');
  });

  it('should validate email format', () => {
    cy.get('[data-test="register-button"]').click();
    cy.get('[data-test="email"]').type('invalid-email');
    cy.get('[data-test="next-button"]').click();

    cy.get('[data-test="email-error"]')
      .should('contain', 'Ongeldig email adres');
  });
});
