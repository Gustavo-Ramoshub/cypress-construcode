/// <reference types="cypress" />

import login from '../../e2e/login/pages/login'
import { ROUTES } from './routes'
import { profiles } from './loginProfiles'

// Comando genérico para realizar login direto com email e senha
Cypress.Commands.add('loginWithCredentials', (email, password) => {
  cy.visit(ROUTES.login)

  login.fillEmail(email)

  login.fillPassword(password)

  login.clickLogin()
})

// Comando genérico para login com sessão Cypress (cache de sessão)
Cypress.Commands.add('sessionLogin', (email, password) => {
  const loginFn = () => cy.loginWithCredentials(email, password)

  cy.session(email, loginFn)
})

// Criação automática de comandos de login por perfil, ex: cy.adminGlobalLoginSession()
Object.entries(profiles).forEach(([key, { email, password }]) => {
  Cypress.Commands.add(`${key}LoginSession`, () => {
    cy.sessionLogin(email, password)
  })
})

// Limpa cookies, localStorage, sessionStorage e IndexedDB do navegador
Cypress.Commands.add('limparAmbiente', () => {
  cy.clearCookies()

  cy.clearLocalStorage()

  cy.window().then((win) => {
    win.sessionStorage.clear()

    if (indexedDB.databases) {
      indexedDB.databases().then((dbs) => {
        dbs.forEach((db) => {
          if (db.name) indexedDB.deleteDatabase(db.name)
        })
      })
    }
  })
})