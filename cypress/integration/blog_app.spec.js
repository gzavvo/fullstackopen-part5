describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it.only('Login form is shown', function() {
    cy.get('form')
      .should('contain', 'username')
      .and('contain', 'password')
      .and('contain', 'log in')
  })
})
