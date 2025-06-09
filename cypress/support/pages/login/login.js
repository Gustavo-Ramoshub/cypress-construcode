// Funções referente a tela de Login

/// <reference types="cypress" />

// Elementos
const elements = {
    buttons: {
        login: '.wrap-login100-form-btn',
        viewPassword: '.fa.fa-eye',
    },

    fields: {
        email: '#email',
        password: '#password',

    },

    messages: {
        msgErroLogin: '#login-form > span:nth-child(3)',
        msgEmptyEmailField: '#divEmail',
        msgEmptyPasswordField: '.wrap-input100.validate-input.password',
    },
}

// Ações/funções/metodos
export default {
    // Preenche o campo de e-mail
    fillEmail (email) {
        cy.get(elements.fields.email)
            .type(email)
    },

    // Valida se o campo de e-mail está vazio ou inserido de forma incorreta
    fillEmailEmpty () {
        cy.get(elements.messages.msgEmptyEmailField)
            .should('have.class', 'alert-validate')
    },

    // Valida se o campo de senha está vazio
    fillPasswordEmpty () {
        cy.get(elements.messages.msgEmptyPasswordField)
            .should('have.class', 'alert-validate')
    },

    // Preenche o campo de senha
    fillPasssword (password) {
        cy.get(elements.fields.password)
            .type(password)
    },

    // Botão de Login
    clickLogin () {
        cy.get(elements.buttons.login)
            .click()
    },

    // Botão de visualizar senha em texto
    clickViewPassword () {
        // Clica no botão de visualizar senha
        cy.get(elements.buttons.viewPassword)
            .click()
        
        // Verifica se a senha está sendo exibida
        cy.get(elements.fields.password)
        .should('have.attr', 'type', 'text') // verifica se é input de texto
    },

    // Mensagem de erro ao fazer login com e-mail ou senha errado
    msgErroLogin (message) {
        cy.get(elements.messages.msgErroLogin)
            .should('be.visible', message)
    },

    // Valida se o login foi feito com sucesso
    validateLoginSuccessful () {
        cy.origin('https://web.construcode.com.br/Enterprises', () => {
        cy.url().should('include', 'https://web.construcode.com.br/Enterprises')
        })
    }
}