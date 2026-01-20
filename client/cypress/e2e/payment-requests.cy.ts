describe('Payment Requests (EPC QR) API', () => {
  const apiUrl = Cypress.env('apiUrl') as string;
  const adminEmail = Cypress.env('adminEmail') as string;
  const jwtSecret = Cypress.env('jwtSecret') as string;

  const signToken = (email: string) => {
    return cy.task('signJwt', {
      payload: { userId: 'e2e-admin', email },
      secret: jwtSecret,
    }) as Cypress.Chainable<string>;
  };

  it('allows admin to create a payment request and mark it as paid', () => {
    expect(apiUrl, 'apiUrl').to.be.a('string').and.not.be.empty;
    expect(adminEmail, 'adminEmail').to.be.a('string').and.not.be.empty;
    expect(jwtSecret, 'jwtSecret').to.be.a('string').and.not.be.empty;

    signToken(adminEmail).then((token) => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/api/payment-requests`,
        headers: { Authorization: `Bearer ${token}` },
        body: {
          recipientEmail: 'client.e2e@bureau-huyghe.local',
          recipientName: 'E2E Client',
          amountCents: 25000,
          message: 'E2E betalingsverzoek',
        },
      }).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('data');

        const created = res.body.data;
        expect(created).to.have.property('id');
        expect(created).to.have.property('recipientEmail', 'client.e2e@bureau-huyghe.local');
        expect(created).to.have.property('amountCents', 25000);
        expect(created).to.have.property('reference');
        expect(created.reference).to.match(/^\+\+\+\d{3}\/\d{4}\/\d{5}\+\+\+$/);

        const id = created.id as string;

        cy.request({
          method: 'GET',
          url: `${apiUrl}/api/payment-requests`,
          headers: { Authorization: `Bearer ${token}` },
        }).then((listRes) => {
          expect(listRes.status).to.eq(200);
          expect(listRes.body).to.have.property('success', true);
          expect(listRes.body.data).to.be.an('array');
          expect((listRes.body.data as any[]).some((x) => x.id === id)).to.eq(true);
        });

        cy.request({
          method: 'PATCH',
          url: `${apiUrl}/api/payment-requests/${id}/status`,
          headers: { Authorization: `Bearer ${token}` },
          body: { status: 'PAID' },
        }).then((patchRes) => {
          expect(patchRes.status).to.eq(200);
          expect(patchRes.body).to.have.property('success', true);
          expect(patchRes.body.data).to.have.property('status', 'PAID');
          expect(patchRes.body.data).to.have.property('paidAt');
        });
      });
    });
  });

  it('rejects non-admin users', () => {
    signToken('not-admin@bureau-huyghe.local').then((token) => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/api/payment-requests`,
        headers: { Authorization: `Bearer ${token}` },
        body: {
          recipientEmail: 'client.e2e@bureau-huyghe.local',
          amountCents: 1000,
        },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(403);
        expect(res.body).to.have.property('success', false);
      });
    });
  });
});
