/// <reference types="cypress" />

import { ROUTES } from '../../../support/data/routes'
import filterPerson from '../pages/filterPerson'
import editPerson from '../pages/editPerson'
import deletePerson from '../pages/deletePerson'

const userData = require('../../../fixtures/users.json')

const MSG_ACCESS_DENIED = 'Acesso Negado!'
const MSG_DELETE_BLOCKED = 'A ação que você tentou executar não é permitida para seu usuário. Verifique suas permissões ou entre em contato com o administrador do seu empreendimento.'

describe('Pessoas - Ações bloqueadas para perfis com hierarquia inferior', () => {
  beforeEach(() => {
    cy.profileProjectCoordinationLoginSession()
    cy.visit(ROUTES.person(6393))
  })

  it('Bloqueia edição de usuário com permissão superior (Administração)', () => {
    filterPerson.filterByEmail(userData.profileAdministration.email)
    editPerson.openUserEditModal()
    editPerson.verifyErrorToast(MSG_ACCESS_DENIED)
  })

  it('Impede upgrade do próprio perfil para Administração', () => {
    filterPerson.filterByEmail(userData.profileProjectCoordination.email)
    editPerson.openUserEditModal()
    editPerson.verifyAdminPermissionIsDisabled()
  })

  it('Bloqueia exclusão de usuário com permissão superior', () => {
    filterPerson.filterByEmail(userData.profileHierarchyTest.email)
    deletePerson.deleteSingleUser()
    deletePerson.verifyWithoutPermissionToast(MSG_DELETE_BLOCKED)
  })
})