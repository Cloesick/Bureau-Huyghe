import './commands';
import '@testing-library/cypress/add-commands';
import 'cypress-file-upload';
import 'cypress-axe';
import 'cypress-real-events';

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      uploadDocument(filePath: string, type: string): Chainable<void>;
      fillContactForm(data: {
        name: string;
        email: string;
        phone?: string;
        message: string;
        serviceType?: string;
      }): Chainable<void>;
      checkBrandColors(): Chainable<void>;
      checkAccessibility(): Chainable<void>;
    }
  }
}
