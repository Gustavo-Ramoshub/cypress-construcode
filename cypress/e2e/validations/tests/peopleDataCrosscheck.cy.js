/// <reference types="cypress" />

import { ROUTES } from '../../../support/data/routes'
import { validatePeopleCountConsistencyAcrossSections } from '../pages/peopleDataCrosscheck'
import invitePerson from '../../person/pages/invitePerson'

describe('Validações de quantidade de pessoas', () => {
  const idEnterprise = 4127

  const generateEmail = (sufixo = '') => `usuario_${Date.now()}${sufixo}@gmail.com`

  const invitePeople = (email) => {
    invitePerson.openAddUserModal()
    invitePerson.fillNewEmail(email)
    invitePerson.selectRandomPermission()
    invitePerson.confirmUserAddition()
    invitePerson.verifySuccessToast('Pessoa adicionada com sucesso!')
  }

  beforeEach(() => {
    cy.limparAmbiente()

    cy.profileAdministrationLoginSession()
  })

  it('Adiciona uma pessoa para o próximo teste', () => {
    const email = generateEmail('_1')

    cy.visit(ROUTES.person(idEnterprise))

    invitePeople(email)
  })

  it('Deve validar total de pessoas estão batendo entre as seções da página', () => {
    validatePeopleCountConsistencyAcrossSections(idEnterprise, 'Obra Automações Testes')
  })
})