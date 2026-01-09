/// <reference types="cypress" />
/// <reference types="cypress-axe" />
/// <reference types="@testing-library/cypress" />
/// <reference types="cypress-real-events" />

declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): void;
    uploadDocument(filePath: string, type: string): void;
    fillContactForm(data: {
      name: string;
      email: string;
      phone?: string;
      message: string;
      serviceType?: string;
      files?: string[];
    }): void;
    checkBrandColors(): void;
    checkAccessibility(): void;
  }

  interface ColorConfig {
    primary: { [key: string]: string };
    accent: { [key: string]: string };
  }
}
