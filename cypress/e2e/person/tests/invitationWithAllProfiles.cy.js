/// <reference types="cypress" />

import { ROUTES } from '../../../support/data/routes'
import invitePerson from '../pages/invitePerson'
import deletePerson from '../pages/deletePerson'
import filterPerson from '../pages/filterPerson'
import { allowedProfiles, deniedProfiles } from '../../../support/data/profiles'

describe('Pessoas - Teste de convite de pessoas por perfil', () => {

  const generateEmail = (sufixo = '') => `usuario_${Date.now()}${sufixo}@gmail.com`
  const idEnterprise = 6393

  const invitePeople = (email, configuracoesExtras = () => {}) => {
    invitePerson.openAddUserModal()
    
    // Caso email seja array, preencher um a um; senão só um email
    if (Array.isArray(email)) {
      email.forEach(e => invitePerson.fillNewEmail(e))
    } else {
      invitePerson.fillNewEmail(email)
    }

    configuracoesExtras()

    invitePerson.confirmUserAddition()
  }

  it('Seleciona todos por cadastro e remove', () => {
    const emails = [
        generateEmail('AllPerson1'),
        generateEmail('AllPerson2')
      ]
    
    cy.profileAdministrationLoginSession()
    cy.visit(ROUTES.person(idEnterprise))
    
    invitePeople(emails, () => {
      invitePerson.selectRandomPermission()
    })
    invitePerson.verifySuccessToast('Pessoa adicionada com sucesso!')

    filterPerson.filterByRegistry('Não Concluído')
    filterPerson.selectAllUsers()
    deletePerson.deleteSelectedUsers()
    deletePerson.verifySuccessToast('Remoção de pessoas concluída')
  })

  allowedProfiles.forEach(({ loginFn, name }, index) => {
    it(`Perfil ${name} pode convidar pessoas`, () => {
      const emails = generateEmail('_1')

      loginFn()
      cy.visit(ROUTES.person(idEnterprise))

      invitePeople(emails, () => {
      invitePerson.selectPermission('Cliente')
      })
      invitePerson.verifySuccessToast('Pessoa adicionada com sucesso!')
    })
  })

  deniedProfiles.forEach(({ loginFn, name }) => {
    it(`Perfil ${name} NÃO pode convidar pessoas`, () => {
      loginFn()
      cy.visit(ROUTES.person(idEnterprise))

      invitePerson.verifyAccessDeniedMessage('Acesso Negado!')
    })
  })
})