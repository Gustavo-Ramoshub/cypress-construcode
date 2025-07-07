/// <reference types="cypress" />

const uiMap = {
  buttons: {
    login: '.wrap-login100-form-btn',
    togglePasswordVisibility: '.fa.fa-eye',
  },

  fields: {
    email: '#email',
    password: '#password',
  },

  messages: {
    emptyEmail: '#divEmail',
    emptyPassword: '.wrap-input100.validate-input.password',
    loginError: '#login-form > span:nth-child(3)',
  },
}

// Preenche um campo de input com o valor informado
function fillField(selector, value) {
  cy.get(selector)
    .should('be.visible')
    .clear()
    .type(value)
}

// Valida se um campo obrigatório está com classe de erro
function validateEmptyField(selector) {
  cy.get(selector)
    .should('have.class', 'alert-validate')
}

export default {

  // Preenche o campo de e-mail
  fillEmail(email) {
    fillField(uiMap.fields.email, email)
  },

  // Preenche o campo de senha
  fillPassword(password) {
    fillField(uiMap.fields.password, password)
  },

  // Clica no botão de login
  clickLogin() {
    cy.get(uiMap.buttons.login)
      .should('be.visible')
      .click()
  },

  // Alterna visibilidade da senha e valida se o campo muda para tipo texto
  togglePasswordVisibility() {
    cy.get(uiMap.buttons.togglePasswordVisibility)
      .should('be.visible')
      .click()

    cy.get(uiMap.fields.password)
      .should('have.attr', 'type', 'text')
  },

  // Valida erro de e-mail vazio
  validateEmptyEmail() {
    validateEmptyField(uiMap.messages.emptyEmail)
  },

  // Valida erro de senha vazia
  validateEmptyPassword() {
    validateEmptyField(uiMap.messages.emptyPassword)
  },

  // Valida mensagem de erro exibida após login inválido
  validateLoginErrorMessage(expectedMessage) {
    cy.get(uiMap.messages.loginError)
      .should('be.visible')
      .and('contain.text', expectedMessage)
  },

  // Valida redirecionamento após login bem-sucedido
  validateSuccessfulLogin() {
    cy.origin('https://web.construcode.com.br/Enterprises', () => {
      cy.url()
        .should('include', 'https://web.construcode.com.br/Enterprises')
    })
  },
}