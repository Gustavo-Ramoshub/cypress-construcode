/// <reference types="cypress" />

import { ROUTES } from '../../../support/data/routes'
import login from '../pages/login'

const userData = require('../../../fixtures/users.json')

describe('Login', () => {
  beforeEach('Acessa página de login', () => {
    cy.visit(ROUTES.login)
  })

  context('Validação de campos obrigatórios', () => {
    it('Exibe erro quando e-mail está vazio', () => {
      login.clickLogin()
      login.validateEmptyEmail()
    })

    it('Exibe erro quando senha está vazia', () => {
      login.fillEmail(userData.emailWithoutRegistration.email)
      login.clickLogin()
      login.validateEmptyPassword()
    })

    it('Exibe erro ao inserir e-mail inválido', () => {
      login.fillEmail('email_incorreto@')
      login.clickLogin()
      login.validateEmptyEmail()
    })
  })

  context('Visualização de senha', () => {
    it('Exibe a senha ao clicar no botão de visualização', () => {
      login.fillPassword(userData.emailWithoutRegistration.password)
      login.togglePasswordVisibility()
    })
  })

  context('Cenários negativos de login', () => {
    it('Erro ao logar com senha incorreta', () => {
      login.fillEmail(userData.profileAdministration.email)
      login.fillPassword(userData.emailWithoutRegistration.password)
      login.clickLogin()

      login.validateLoginErrorMessage(
        'A senha inserida está incorreta. Para redefini-la clique em "Esqueceu a senha?"'
      )
    })

    it('Erro ao logar com e-mail sem conta', () => {
      login.fillEmail(userData.emailWithoutRegistration.email)
      login.fillPassword(userData.emailWithoutRegistration.password)
      login.clickLogin()

      login.validateLoginErrorMessage(
        'O usuário inserido não pertence à uma conta. Verifique o seu usuário e tente novamente.'
      )
    })
  })

  context('Login bem-sucedido', () => {
    it('Login com sucesso com credenciais válidas', () => {
      login.fillEmail(userData.profileAdministration.email)
      login.fillPassword(userData.profileAdministration.password)
      login.clickLogin()

      login.validateSuccessfulLogin()
    })
  })
})