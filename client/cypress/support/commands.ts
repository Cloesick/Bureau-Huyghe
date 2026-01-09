Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-test="email-input"]').type(email);
  cy.get('[data-test="password-input"]').type(password);
  cy.get('[data-test="login-button"]').click();
  cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('uploadDocument', (filePath: string, type: string) => {
  cy.visit('/dashboard/documents');
  cy.get('[data-test="upload-button"]').click();
  cy.get('[data-test="file-input"]').attachFile(filePath);
  cy.get('[data-test="document-type-select"]').select(type);
  cy.get('[data-test="upload-submit"]').click();
  cy.contains('Document succesvol geüpload').should('be.visible');
});

Cypress.Commands.add('fillContactForm', (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  serviceType?: string;
  files?: string[];
}) => {
  cy.visit('/contact');
  cy.get('[data-test="name-input"]').type(data.name);
  cy.get('[data-test="email-input"]').type(data.email);
  if (data.phone) {
    cy.get('[data-test="phone-input"]').type(data.phone);
  }
  if (data.serviceType) {
    cy.get('[data-test="service-select"]').select(data.serviceType);
  }
  cy.get('[data-test="message-input"]').type(data.message);

  if (data.files) {
    data.files.forEach(file => {
      cy.get('[data-test="file-input"]').attachFile(file);
    });
  }
});

Cypress.Commands.add('checkBrandColors', () => {
  cy.fixture('colors.json').then((colors: { primary: { [key: string]: string }, accent: { [key: string]: string } }) => {
    // Check primary colors
    cy.get('[data-test="header"]')
      .invoke('css', 'background-color')
      .then((color: string) => {
        expect(color).to.eq(colors.primary['500']);
      });

    // Check accent colors
    cy.get('[data-test="cta-button"]')
      .invoke('css', 'background-color')
      .then((color: string) => {
        expect(color).to.eq(colors.accent['400']);
      });

    // Check hover states
    cy.get('[data-test="nav-link"]')
      .first()
      .realHover()
      .invoke('css', 'background-color')
      .then((color: string) => {
        expect(color).to.eq(colors.primary['600']);
      });
  });
});

Cypress.Commands.add('checkAccessibility', () => {
  cy.injectAxe();
  cy.checkA11y();
});
