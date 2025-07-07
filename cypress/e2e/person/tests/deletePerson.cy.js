/// <reference types="cypress" />

import { ROUTES } from '../../../support/data/routes'
import invitePerson from '../pages/invitePerson'
import deletePerson from '../pages/deletePerson'
import filterPerson from '../pages/filterPerson'

describe('Pessoas - Deletar pessoas', () => {
  const gerarEmail = (sufixo = '') => `usuario_${Date.now()}${sufixo}@gmail.com`

  const createUser = (emails, permission = 'Qualidade') => {
    if (!Array.isArray(emails)) emails = [emails]

    emails.forEach(email => {
      invitePerson.openAddUserModal()
      invitePerson.fillNewEmail(email)
      invitePerson.selectPermission(permission)
      invitePerson.confirmUserAddition()
      invitePerson.verifySuccessToast('Pessoa adicionada com sucesso!')
    })
  }

  beforeEach(() => {
    cy.profileAdministrationLoginSession()
    cy.visit(ROUTES.person(4127))
  })

  context('Cenários com um único usuário', () => {
    it('Deleta usuário recém-adicionado', () => {
      const email = gerarEmail('_unico')
      createUser(email)

      filterPerson.filterByEmail(email)
      deletePerson.deleteSingleUser()
      deletePerson.verifySuccessToast('Pessoa removida com sucesso!')
    })

    it('Filtra por e-mail e exclui usuário selecionado manualmente', () => {
      const email = gerarEmail('_manual')
      createUser(email)

      filterPerson.filterByEmail(email)
      filterPerson.selectSingleUser()

      deletePerson.deleteSingleUser()
      deletePerson.verifySuccessToast('Pessoa removida com sucesso!')
    })

    it('Impede exclusão de Admin Global', () => {
      filterPerson.filterByProfile('Admin Global')
      deletePerson.verifyBlockedGlobalAdminDelete()
    })
  })

  context('Cenários com múltiplos usuários', () => {
    it('Adiciona usuários com perfil específico e remove todos', () => {
      const emails = [
        gerarEmail('_lote1'),
        gerarEmail('_lote2'),
        gerarEmail('_lote3'),
      ]

      createUser(emails)

      filterPerson.filterByProfile('Qualidade')
      filterPerson.filterByRegistry('Não Concluído')
      filterPerson.selectAllUsers()

      deletePerson.deleteSelectedUsers()
      deletePerson.verifySuccessToast('Remoção de pessoas concluída')
    })

    it('Seleciona todos usuários por status de cadastro e remove', () => {
      const emails = [
        gerarEmail('_cadastro1'),
        gerarEmail('_cadastro2'),
        gerarEmail('_cadastro3'),
      ]

      createUser(emails)

      filterPerson.filterByRegistry('Não Concluído')
      filterPerson.selectAllUsers()

      deletePerson.deleteSelectedUsers()
      deletePerson.verifySuccessToast('Remoção de pessoas concluída')
    })
  })
})