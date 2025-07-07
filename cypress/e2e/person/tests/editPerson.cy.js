/// <reference types="cypress" />

import { ROUTES } from '../../../support/data/routes'
import filterPerson from '../pages/filterPerson'
import invitePerson from '../pages/invitePerson'
import editPerson from '../pages/editPerson'

const userData = require('../../../fixtures/users.json')

const DEFAULT_PERMISSION = 'Qualidade'
const SUCCESS_ADD_MSG = 'Pessoa adicionada com sucesso!'
const SUCCESS_UPDATE_MSG = 'Operação realizada com sucesso!'
const ERROR_NO_DISCIPLINE_MSG = 'O campo "Disciplinas atuantes" é obrigatório.'

describe('Pessoas - Edição de permissões de pessoas', () => {

  const gerarEmail = (sufixo) => `usuario_${Date.now()}_${sufixo}@gmail.com`

  const createUser = (email, permission = DEFAULT_PERMISSION) => {
    invitePerson.openAddUserModal()
    invitePerson.fillNewEmail(email)
    invitePerson.selectPermission(permission)
    invitePerson.confirmUserAddition()
    invitePerson.verifySuccessToast(SUCCESS_ADD_MSG)
  }

  const editarUsuario = (email, callback) => {
    filterPerson.filterByEmail(email)
    editPerson.openUserEditModal()
    callback()
  }

  beforeEach('Login e acesso à tela de pessoas', () => {
    cy.profileAdministrationLoginSession()
    cy.visit(ROUTES.person(4127))
  })

  context('Edição de permissões padrão', () => {
    it('Edita a permissão de uma pessoa existente com sucesso', () => {
      editarUsuario(userData.profileTestUserEdition.email, () => {
        editPerson.selectRandomPermission()
        editPerson.confirmUserUpdate()
        editPerson.verifySuccessToast(SUCCESS_UPDATE_MSG)
      })
    })

    it('Tenta editar um Admin Global (deve bloquear)', () => {
      filterPerson.filterByEmail(userData.adminGlobal.email)
      editPerson.verifyBlockedGlobalAdminEdit()
    })
  })

  context('Edição com disciplinas atuantes', () => {

    it('Adiciona todas as disciplinas atuantes para um Projetista', () => {
      const email = gerarEmail('proj_disc')

      createUser(email)

      editarUsuario(email, () => {
        editPerson.selectPermission('Projetista')
        editPerson.selectAllDisciplines()
        editPerson.confirmUserUpdate()
        editPerson.verifySuccessToast(SUCCESS_UPDATE_MSG)
      })
    })

    it('Remove todas as disciplinas atuantes (deve exibir erro)', () => {
      const email = gerarEmail('proj_sem_disc')

      createUser(email)

      editarUsuario(email, () => {
        editPerson.selectPermission('Projetista')
        editPerson.selectAllDisciplines()
        editPerson.confirmUserUpdate()
        editPerson.verifySuccessToast(SUCCESS_UPDATE_MSG)
      })

      editarUsuario(email, () => {
        editPerson.removeAllDisciplines()
        editPerson.confirmUserUpdate()
        editPerson.verifyErrorToast(ERROR_NO_DISCIPLINE_MSG)
      })
    })
  })
})