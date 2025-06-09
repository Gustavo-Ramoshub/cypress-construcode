// Testes relacionados a convidar pessoas com todos os perfis

/// <reference types="cypress" />

import { ROUTES } from '../../support/pages/routes'
import invitePerson from '../../support/pages/pessoas/invitePerson'

describe('Teste de convidar pessoas para o empreendimento com todos os perfis', () => {
  
  it('Perfil Administração pode convidar pessoas', () => {
    cy.sessionLoginAdministration()

    cy.visit(ROUTES.person)

    const timestamp = Date.now()
    const randomEmail = `usuario_${timestamp}_1@gmail.com`

    invitePerson.addPerson()
    invitePerson.fillNewEmail(randomEmail)
    invitePerson.permission('Cliente')
    invitePerson.confirmAddPerson()
    invitePerson.msgDefaultMessage('Pessoa adicionada com sucesso!')
  })

  it('Perfil Gerência de projetos pode convidar pessoas', () => {
    cy.sessionLoginManageProjects()

    cy.visit(ROUTES.person)

    const timestamp = Date.now()
    const randomEmail = `usuario_${timestamp}_1@gmail.com`

    invitePerson.addPerson()
    invitePerson.fillNewEmail(randomEmail)
    invitePerson.permission('Cliente')
    invitePerson.confirmAddPerson()
    invitePerson.msgDefaultMessage('Pessoa adicionada com sucesso!')
  })
  
  it('Perfil Coordenação de projetos pode convidar pessoas', () => {
    cy.sessionLoginProjectCoordination()

    cy.visit(ROUTES.person)

    const timestamp = Date.now()
    const randomEmail = `usuario_${timestamp}_1@gmail.com`

    invitePerson.addPerson()
    invitePerson.fillNewEmail(randomEmail)
    invitePerson.permission('Cliente')
    invitePerson.confirmAddPerson()
    invitePerson.msgDefaultMessage('Pessoa adicionada com sucesso!')
  })
  
  it('Perfil Gerência de campo pode convidar pessoas', () => {
    cy.loginSessionManageField()

    cy.visit(ROUTES.person)

    const timestamp = Date.now()
    const randomEmail = `usuario_${timestamp}_1@gmail.com`

    invitePerson.addPerson()
    invitePerson.fillNewEmail(randomEmail)
    invitePerson.permission('Cliente')
    invitePerson.confirmAddPerson()
    invitePerson.msgDefaultMessage('Pessoa adicionada com sucesso!')
  })
  
  it('Perfil Coordenação de campo pode convidar pessoas', () => {
    cy.loginSessionFieldCoordination()

    cy.visit(ROUTES.person)

    const timestamp = Date.now()
    const randomEmail = `usuario_${timestamp}_1@gmail.com`

    invitePerson.addPerson()
    invitePerson.fillNewEmail(randomEmail)
    invitePerson.permission('Cliente')
    invitePerson.confirmAddPerson()
    invitePerson.msgDefaultMessage('Pessoa adicionada com sucesso!')
  })
  
  it('Perfil Engenharia de campo pode convidar pessoas', () => {
    cy.fieldEngineeringLoginSession()

    cy.visit(ROUTES.person)

    const timestamp = Date.now()
    const randomEmail = `usuario_${timestamp}_1@gmail.com`

    invitePerson.addPerson()
    invitePerson.fillNewEmail(randomEmail)
    invitePerson.permission('Cliente')
    invitePerson.confirmAddPerson()
    invitePerson.msgDefaultMessage('Pessoa adicionada com sucesso!')
  })
  
  it('Perfil Qualidade pode convidar pessoas', () => {
    cy.sessionLoginQuality()

    cy.visit(ROUTES.person)

    const timestamp = Date.now()
    const randomEmail = `usuario_${timestamp}_1@gmail.com`

    invitePerson.addPerson()
    invitePerson.fillNewEmail(randomEmail)
    invitePerson.permission('Cliente')
    invitePerson.confirmAddPerson()
    invitePerson.msgDefaultMessage('Pessoa adicionada com sucesso!')
  })

  it('Perfil Cliente não pode convidar pessoas', () => {
    cy.customerLoginSession()

    cy.visit(ROUTES.person)

    invitePerson.msgAccessDenied('Acesso Negado!')
  })
  
  it('Perfil Convidado não pode convidar pessoas', () => {
    cy.guestLoginSession()

    cy.visit(ROUTES.person)

    invitePerson.msgAccessDenied('Acesso Negado!')
  })
  
  it('Perfil Projetista não pode convidar pessoas', () => {
    cy.designerLoginSession()

    cy.visit(ROUTES.person)

    invitePerson.msgAccessDenied('Acesso Negado!')
  })
  
  it('Perfil Projetista líder não pode convidar pessoas', () => {
    cy.leadDesignerLoginSession()

    cy.visit(ROUTES.person)

    invitePerson.msgAccessDenied('Acesso Negado!')
  })
  
  it('Perfil Terceiro não pode convidar pessoas', () => {
    cy.thirdPartyLoginSession()

    cy.visit(ROUTES.person)

    invitePerson.msgAccessDenied('Acesso Negado!')
  })
  
  it('Perfil Time de campo não pode convidar pessoas', () => {
    cy.sessionLoginTeamField()

    cy.visit(ROUTES.person)

    invitePerson.msgAccessDenied('Acesso Negado!')
  })
})