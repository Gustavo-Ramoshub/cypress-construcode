// Testes relacionados a tela de edição de permissões de pessoas

/// <reference types="cypress" />

import { ROUTES } from '../../support/pages/routes'
import filterPerson from '../../support/pages/pessoas/filterPerson'
import addPerson from '../../support/pages/pessoas/invitePerson'
import editPerson from '../../support/pages/pessoas/editPerson'

const user_data = require('../../fixtures/users.json')

describe('Edição de pessoas', () => {

    beforeEach('Efetuando login', () => {
        cy.sessionLoginAdministration()
        cy.visit(ROUTES.person)
    })

    it('Editar pessoa', () => {
        filterPerson.fillEmail(user_data.profileTestUserEdition.email)

        editPerson.editPerson()
        editPerson.randomPermission()
        editPerson.updatePerson()
        editPerson.msgDefaultMessage('Operação realizada com sucesso!')
    })

    it('Tentar editar admin Global', () => {
        filterPerson.fillEmail(user_data.adminGlobal.email)
        editPerson.editGlobalAdmin()
    })

    it('Edição selecionando todas as disciplinas como atuantes', () => {
        const timestamp = Date.now()
        const randomEmail = `usuario_${timestamp}_1@gmail.com`

        addPerson.addPerson()
        addPerson.fillNewEmail(randomEmail)
        addPerson.randomPermission()
        addPerson.confirmAddPerson()
        addPerson.msgDefaultMessage('Pessoa adicionada com sucesso!')

        filterPerson.fillEmail(randomEmail)

        editPerson.editPerson()
        editPerson.permission('Projetista')
        editPerson.selectAllDisciplinesAsActive()
        editPerson.updatePerson()
        editPerson.msgDefaultMessage('Operação realizada com sucesso!')
    })

    it('Edição removendo todas as disciplinas atuantes', () => {
        const timestamp = Date.now()
        const randomEmail = `usuario_${timestamp}_1@gmail.com`

        addPerson.addPerson()
        addPerson.fillNewEmail(randomEmail)
        addPerson.permission('Projetista')
        addPerson.selectAllDisciplinesAsActive()
        addPerson.confirmAddPerson()
        addPerson.msgDefaultMessage('Pessoa adicionada com sucesso!')

        filterPerson.fillEmail(randomEmail)

        editPerson.editPerson()
        editPerson.removesAllDisciplinesAsActive()
        editPerson.updatePerson()
        editPerson.msgError('O campo "Disciplinas atuantes" é obrigatório.')
    })
})