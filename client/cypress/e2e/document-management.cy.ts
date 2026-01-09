describe('Document Management', () => {
  beforeEach(() => {
    cy.login('john.doe@example.com', 'SecurePass123!');
    cy.visit('/dashboard/documents');
  });

  it('should upload a document', () => {
    // Upload document
    cy.get('[data-test="upload-button"]').click();
    cy.get('[data-test="file-input"]')
      .attachFile('test-files/sample.pdf');
    cy.get('[data-test="document-type-select"]')
      .select('CONTRACT');
    cy.get('[data-test="document-title"]')
      .type('Test Contract');
    cy.get('[data-test="upload-submit"]').click();

    // Verify upload success
    cy.contains('Document succesvol geüpload')
      .should('be.visible');
    cy.get('[data-test="document-list"]')
      .should('contain', 'Test Contract');
  });

  it('should filter documents by type', () => {
    // Upload test documents
    cy.uploadDocument('test-files/contract.pdf', 'CONTRACT');
    cy.uploadDocument('test-files/report.pdf', 'REPORT');

    // Filter by type
    cy.get('[data-test="filter-type"]').select('CONTRACT');

    // Verify filter results
    cy.get('[data-test="document-list"]')
      .should('contain', 'contract.pdf')
      .and('not.contain', 'report.pdf');
  });

  it('should preview a document', () => {
    // Upload a document
    cy.uploadDocument('test-files/sample.pdf', 'REPORT');

    // Open preview
    cy.get('[data-test="preview-button"]').first().click();

    // Verify preview modal
    cy.get('[data-test="preview-modal"]')
      .should('be.visible')
      .and('contain', 'sample.pdf');
    cy.get('[data-test="preview-iframe"]')
      .should('exist');

    // Close preview
    cy.get('[data-test="close-preview"]').click();
    cy.get('[data-test="preview-modal"]')
      .should('not.exist');
  });

  it('should delete a document', () => {
    // Upload a document
    cy.uploadDocument('test-files/deleteme.pdf', 'OTHER');

    // Delete document
    cy.get('[data-test="delete-button"]').first().click();
    cy.get('[data-test="confirm-delete"]').click();

    // Verify deletion
    cy.contains('Document succesvol verwijderd')
      .should('be.visible');
    cy.get('[data-test="document-list"]')
      .should('not.contain', 'deleteme.pdf');
  });

  it('should share a document', () => {
    // Upload a document
    cy.uploadDocument('test-files/share.pdf', 'REPORT');

    // Share document
    cy.get('[data-test="share-button"]').first().click();
    cy.get('[data-test="share-email"]')
      .type('client@example.com');
    cy.get('[data-test="share-message"]')
      .type('Please review this document');
    cy.get('[data-test="share-submit"]').click();

    // Verify share success
    cy.contains('Document succesvol gedeeld')
      .should('be.visible');
  });
});
