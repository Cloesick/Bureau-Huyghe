describe('Service Pages', () => {
  const services = [
    {
      path: '/services/property-survey',
      title: 'Landmeten & Afpaling',
      sections: ['hero-section', 'services-grid', 'benefits-section']
    },
    {
      path: '/services/construction-survey',
      title: 'Bouwmeting & Maatvoering',
      sections: ['hero-section', 'services-grid', 'equipment-section']
    },
    {
      path: '/services/technical-documentation',
      title: 'Technische Documentatie',
      sections: ['hero-section', 'services-grid', 'deliverables-section']
    },
    {
      path: '/services/legal-services',
      title: 'Juridische Diensten',
      sections: ['hero-section', 'services-grid', 'expertise-section']
    }
  ];

  services.forEach(service => {
    describe(service.title, () => {
      beforeEach(() => {
        cy.visit(service.path);
      });

      it('displays hero section with correct title', () => {
        cy.get('[data-test="hero-section"]').should('be.visible');
        cy.get('[data-test="hero-title"]').should('contain', service.title);
      });

      it('shows all required sections', () => {
        service.sections.forEach(section => {
          cy.get(`[data-test="${section}"]`).should('exist').and('be.visible');
        });
      });

      it('has working contact CTA buttons', () => {
        cy.get('[data-test="cta-section"]').within(() => {
          cy.get('a[href="/contact"]').should('exist');
          cy.get('a[href="/offerte"]').should('exist');
        });
      });

      it('displays service-specific content', () => {
        cy.get('[data-test="services-grid"]')
          .find('[data-test="service-card"]')
          .should('have.length.at.least', 2);
      });

      it('shows responsive images', () => {
        cy.get('img').each($img => {
          expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0);
        });
      });
    });
  });

  it('navigates between service pages', () => {
    cy.visit('/services/property-survey');
    
    // Test navigation through service menu
    cy.get('[data-test="service-menu"]').should('exist');
    services.forEach(service => {
      cy.get('[data-test="service-menu"]').within(() => {
        cy.get(`[data-test="nav-${service.path.split('/').pop()}"]`).click();
      });
      cy.url().should('include', service.path);
      cy.get('[data-test="hero-title"]').should('contain', service.title);
    });
  });

  it('shows related services section', () => {
    cy.visit('/services/property-survey');
    cy.get('[data-test="related-services"]').should('exist');
    cy.get('[data-test="related-services"]')
      .find('a')
      .should('have.length', 3); // All other services
  });

});
