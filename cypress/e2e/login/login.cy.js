// Testes da tela de login

/// <reference types="cypress" />

import { ROUTES } from '../../support/pages/routes'
import login from '../../support/pages/login/login'

const user_data = require('../../fixtures/users.json')

describe('Login', () => {

    beforeEach('Efetuando login', () => {
        cy.visit(ROUTES.login)
    })
    
    it('Valida campo de e-mail vazio', () => {
        login.clickLogin()
        login.fillEmailEmpty()
    })

    it('Valida campo de senha vazio', () => {
        login.fillEmail(user_data.emailWithoutRegistration.email)
        login.clickLogin()
        login.fillPasswordEmpty()
    })

    it('Visualiza senha preenchida', () => {
        login.fillPasssword(user_data.emailWithoutRegistration.password)
        login.clickViewPassword()
    })

    it('Valida campo de e-mail está inserido de forma incorreto', () => {
        login.fillEmail(user_data.emailWithoutRegistration.password)
        login.clickLogin()
        login.fillEmailEmpty()
    })

    it('Login com senha incorreta', () => {
        login.fillEmail(user_data.profileAdministration.email)
        login.fillPasssword(user_data.emailWithoutRegistration.password) 
        login.clickLogin()
        login.msgErroLogin('A senha inserida está incorreta. Para redefini-la clique em "Esqueceu a senha?"')
    })

    it('Login com usuário que não possui conta', () => {
        login.fillEmail(user_data.emailWithoutRegistration.email)
        login.fillPasssword(user_data.emailWithoutRegistration.password)
        login.clickLogin()
        login.msgErroLogin('O usuário inserido não pertence à uma conta. Verifique o seu usuário e tente novamente.')
    })

    it('Login com sucesso', () => {
        login.fillEmail(user_data.profileAdministration.email)
        login.fillPasssword(user_data.profileAdministration.password)
        login.clickLogin()
        login.validateLoginSuccessful()
    })
})