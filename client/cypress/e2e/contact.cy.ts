describe('Contact Form', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  describe('Form Submission', () => {
    it('should submit contact form successfully', () => {
      // Fill out form
      cy.fillContactForm({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '0470123456',
        message: 'Test message',
        serviceType: 'landmeting',
        files: ['test-files/plan.pdf']
      });

      // Verify file upload
      cy.get('[data-test="file-preview"]')
        .should('contain', 'plan.pdf');

      // Submit form and intercept any API calls
      cy.intercept('POST', '**/api/contact').as('submitForm');
      cy.intercept('POST', '**/api/upload').as('uploadFile');
      
      cy.get('[data-test="submit-button"]').click();

      // Wait for file upload and verify preview
      cy.get('[data-test="file-preview"]')
        .should('contain', 'plan.pdf');

      // Verify success message appears
      cy.contains('Bedankt voor uw bericht', { timeout: 5000 })
        .should('be.visible');
      cy.contains('We nemen zo spoedig mogelijk contact met u op')
        .should('be.visible');
    });

    it('should show validation errors', () => {
      // Select property service
      cy.get('[data-test="service-select"]').select('property');
      
      // Submit without required fields
      cy.get('[data-test="submit-button"]').click();

      // Check validation messages
      cy.get('[data-test="field-perceelGrootte-error"]')
        .should('be.visible')
        .should('contain', 'Dit veld is verplicht');

      cy.get('[data-test="field-metingType-error"]')
        .should('be.visible')
        .should('contain', 'Dit veld is verplicht');

      cy.get('[data-test="message-error"]')
        .should('contain', 'Bericht is verplicht');
    });
  });

  describe('Service-specific Fields', () => {
    it('should show property survey fields', () => {
      cy.get('[data-test="service-select"]').select('property');

      // Check if property-specific fields are shown
      cy.get('[data-test="field-perceelGrootte"]').should('be.visible');
      cy.get('[data-test="field-kadasterNummer"]').should('be.visible');
      cy.get('[data-test="field-metingType"]').should('be.visible');

      // Fill in property-specific fields
      cy.get('[data-test="field-perceelGrootte"]').type('500');
      cy.get('[data-test="field-kadasterNummer"]').type('Section A123');
      cy.get('[data-test="field-metingType"]').select('Afpaling');
    });

    it('should show construction fields', () => {
      cy.get('[data-test="service-select"]').select('construction');

      // Check if construction-specific fields are shown
      cy.get('[data-test="field-projectType"]').should('be.visible');
      cy.get('[data-test="field-projectFase"]').should('be.visible');
      cy.get('[data-test="field-projectGrootte"]').should('be.visible');

      // Fill in construction-specific fields
      cy.get('[data-test="field-projectType"]').select('Nieuwbouw');
      cy.get('[data-test="field-projectFase"]').select('Voor aanvang');
      cy.get('[data-test="field-projectGrootte"]').type('200');
    });

    it('should show technical documentation fields', () => {
      cy.get('[data-test="service-select"]').select('technical');

      // Check if technical-specific fields are shown
      cy.get('[data-test="field-documentType"]').should('be.visible');
      cy.get('[data-test="field-doel"]').should('be.visible');
      cy.get('[data-test="field-fileFormat"]').should('be.visible');
    });

    it('should show legal expertise fields', () => {
      cy.get('[data-test="service-select"]').select('legal');

      // Check if legal-specific fields are shown
      cy.get('[data-test="field-expertiseType"]').should('be.visible');
      cy.get('[data-test="field-doel"]').should('be.visible');
    });
  });

  describe('File Handling', () => {
    it('should handle file uploads with preview', () => {
      cy.get('[data-test="service-select"]').select('technical');

      // Upload multiple files
      cy.get('[data-test="file-input"]').attachFile(['plan1.pdf', 'plan2.pdf']);

      // Check if files are listed
      cy.get('[data-test="file-preview"]')
        .should('have.length', 2)
        .first()
        .should('contain', 'plan1.pdf');
    });

    it('should allow removing uploaded files', () => {
      // Attach file
      cy.get('[data-test="file-input"]')
        .attachFile('test-files/plan.pdf');

      // Verify file upload
      cy.get('[data-test="file-preview"]')
        .should('contain', 'plan.pdf');

      // Remove file
      cy.get('[data-test="remove-file"]').click();
      cy.get('[data-test="file-preview"]')
        .should('not.exist');
    });
  });

  describe('Form State', () => {
    it('should persist form data on navigation', () => {
      // Fill partial form
      cy.fillContactForm({
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'Test message'
      });

      // Navigate away
      cy.get('[data-test="nav-services-link"]').click();

      // Navigate back
      cy.go('back');

      // Verify data persists
      cy.get('[data-test="service-select"]').select('legal');
      cy.get('[data-test="name-input"]').type('Jane Smith');
      cy.get('[data-test="email-input"]').type('jane.smith@example.com');
      cy.get('[data-test="field-expertiseType"]').select('Grensgeschil');

      // Check values
      cy.get('[data-test="name-input"]')
        .should('have.value', 'Jane Smith');
      cy.get('[data-test="email-input"]')
        .should('have.value', 'jane.smith@example.com');
      cy.get('[data-test="message-input"]')
        .should('have.value', 'Test message');
    });
  });
});
