/// <reference types="cypress" />

describe('Testando o Cache da Aplicação Hacker Stories', () => {
  it('Deve usar o cache ao repetir uma busca', () => {    
    cy.intercept(
      'GET', 
      '**/search**').as('getStories')

    cy.visit('https://hackernews-seven.vercel.app/')
    
    cy.get('input[type="text"]')
      .should('be.visible')
      .type('Cypress')
      .click()
    
    cy.wait('@getStories')
      .then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
    
    cy.get('input[type="text"]')
      .type('Cypress{enter}')

    
    cy.wait('@getStories').its('response.body').should('exist')
  })
})