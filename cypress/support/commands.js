// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getHeader', (i, s) => {
    return cy.get(`#stages > div:nth-child(${i}) > h3`).should('have.text', s)
})

Cypress.Commands.add('rejectionCause', (i) => {
    return cy.get(`#cause-${i}`)
})

Cypress.Commands.add('causeSubmit', (i) => {
    return cy.get(`#rejection-cause-${i} > button`)
})

Cypress.Commands.add('rejectedMessage', (locator, i) => {
    return cy.get(locator).contains(`Stage ${i+1} marked as rejected`)
})

Cypress.Commands.add('pendingMessage', (locator, i) => {
    return cy.get(locator).contains(`Stage ${i+1} marked as pending`)
})

Cypress.Commands.add('doneMessage', (locator, i) => {
    return cy.get(locator).contains(`Stage ${i+1} marked as done`)
})