/// <reference types="cypress" />

import './commands'
import 'cypress-mochawesome-reporter/register'

before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })
})