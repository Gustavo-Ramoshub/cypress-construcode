/// <reference types="cypress" />

import './data/commands'
import 'cypress-mochawesome-reporter/register'

before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })
})