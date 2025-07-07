/// <reference types="cypress" />

import { ROUTES } from '../../../support/data/routes'
import invitePerson from '../pages/invitePerson'
import screenDocuments from '../../screenDocuments/pages/screenDocuments'
import filterPerson from '../pages/filterPerson'
import deletePerson from '../pages/deletePerson'

const userData = require('../../../fixtures/users.json')

describe('Pessoas - Limitação de visualização', () => {

  it('Usuário visualiza apenas disciplinas permitidas', () => {
    const email = userData.testViewLimitation.email

    // Admin adiciona usuário com permissão restrita por disciplinas
    cy.profileAdministrationLoginSession()
    cy.visit(ROUTES.person(4127))

    invitePerson.openAddUserModal()
    invitePerson.fillNewEmail(email)
    invitePerson.selectPermission('Gerência de projetos')
    invitePerson.toggleDisciplineRestriction()
    invitePerson.selectSpecificDiscipline('(ARQ) Arquitetura')
    invitePerson.selectSpecificDiscipline('(ELE) Elétrica')
    invitePerson.confirmUserAddition()
    invitePerson.verifySuccessToast('Pessoa adicionada com sucesso!')

    // Login como usuário limitado e valida visualização das disciplinas
    cy.wait(2000)
    cy.testViewLimitationLoginSession()
    cy.visit(ROUTES.documentsScreen(4127))

    screenDocuments.verifyDisciplineDisplayed('Arquitetura')
    screenDocuments.verifyDisciplineDisplayed('Elétrica')
    screenDocuments.verifyDisciplinesCount(2)

    // Admin remove usuário de teste para cleanup
    cy.wait(2000)
    cy.profileAdministrationLoginSession()
    cy.visit(ROUTES.person(4127))

    filterPerson.filterByEmail(email)
    deletePerson.deleteSingleUser()
    deletePerson.verifySuccessToast('Pessoa removida com sucesso!')
  })

  // Teste futuro (comentado) para limitação de visualização por locais
  /*
  it('Limitação de visualização a locais', () => {
    const email = userData.testViewLimitation.email

    cy.sessionLoginAdministration()
    cy.visit(ROUTES.person)

    invitePerson.invitePerson()
    invitePerson.fillNewEmail(email)
    invitePerson.permission('Gerência de projetos')
    invitePerson.viewSpecificDisciplines()
    invitePerson.selectDisciplinesEspefics('(ARQ) Arquitetura')
    invitePerson.selectDisciplinesEspefics('(ELE) Elétrica')
    invitePerson.confirminvitePerson()
    invitePerson.msgDefaultMessage('Pessoa adicionada com sucesso!')

    cy.wait(5000)

    cy.sessionLoginViewLimitation()
    cy.visit(ROUTES.documentsScreen)

    screenDocuments.clickLocations()
    screenDocuments.fillLocations('Tag 1')
    screenDocuments.disciplineTooltip('Elétrica')

    cy.wait(5000)
    cy.sessionLoginAdministration()
    cy.visit(ROUTES.person)

    filterPerson.fillEmail(email)

    deletePerson.deletePerson()
    deletePerson.msgDefaultMessage('Pessoa removida com sucesso!')
  })
  */
})