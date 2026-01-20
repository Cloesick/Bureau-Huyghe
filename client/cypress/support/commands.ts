Cypress.Commands.add('login', (email: string, _password: string) => {
  cy.visit('/');
  cy.window().then((win) => {
    const w = win as unknown as Window;
    // Zustand persist format: { state: ..., version: 0 }
    w.localStorage.setItem(
      'bureau-huyghe-auth',
      JSON.stringify({
        state: {
          user: {
            id: 'test-user',
            email,
            firstName: 'John',
            lastName: 'Doe',
          },
          token: 'test-token',
          isAuthenticated: true,
        },
        version: 0,
      })
    );
  });

  cy.visit('/portal');
  cy.url().should('include', '/portal');
});

Cypress.Commands.add('uploadDocument', (filePath: string, type: string) => {
  cy.visit('/portal/documents');
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
}) => {
  cy.visit('/contact');
  cy.get('[data-test="name-input"]').type(data.name);
  cy.get('[data-test="email-input"]').type(data.email);
  if (data.phone) {
    cy.get('[data-test="phone-input"]').type(data.phone);
  }
  if (data.serviceType) {
    cy.get('[data-test="service-select"]').select(data.serviceType);

    // Fill minimal required dynamic subfields so the submit button is enabled
    if (data.serviceType === 'property') {
      cy.get('[data-test="field-eigendomType"]').select(1);
      cy.get('[data-test="field-oppervlakte"]').select(1);
      cy.get('[data-test="field-redenAfpaling"]').select(1);
      cy.get('[data-test="field-metingType"]').select(1);
      cy.get('[data-test="field-urgentie"]').select(1);
    }

    if (data.serviceType === 'construction') {
      cy.get('[data-test="field-projectType"]').select(1);
      cy.get('[data-test="field-projectFase"]').select(1);
      cy.get('[data-test="field-dienstType"]').select(1);
      cy.get('[data-test="field-urgentie"]').select(1);
    }

    if (data.serviceType === 'technical') {
      cy.get('[data-test="field-documentType"]').select(1);
      cy.get('[data-test="field-objectType"]').select(1);
      cy.get('[data-test="field-doel"]').select(1);
      cy.get('[data-test="field-urgentie"]').select(1);
    }

    if (data.serviceType === 'legal') {
      cy.get('[data-test="field-juridischType"]').select(1);
      cy.get('[data-test="field-doel"]').select(1);
      cy.get('[data-test="field-eigendomType"]').select(1);
      cy.get('[data-test="field-urgentie"]').select(1);
    }

    if (data.serviceType === 'other') {
      cy.get('[data-test="field-subject"]').type('Algemene vraag');
      cy.get('[data-test="field-gerelateerd"]').select(1);
      cy.get('[data-test="field-urgentie"]').select(1);
    }
  }
  cy.get('[data-test="message-input"]').type(data.message);
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
    cy.get('.nav-link')
      .first()
      .realHover()
      .invoke('css', 'background-color')
      .then((color: string) => {
        expect(color).to.eq(colors.primary['800']);
      });
  });
});

Cypress.Commands.add('checkAccessibility', () => {
  cy.injectAxe();
  cy.checkA11y();
});
