// Testes relacionados a deletar pessoas do empreendimento

/// <reference types="cypress" />

import { ROUTES } from '../../support/pages/routes'
import addPerson from '../../support/pages/pessoas/invitePerson'
import deletePerson from '../../support/pages/pessoas/deletePerson'
import filterPerson from '../../support/pages/pessoas/filterPerson'

describe('Deletar pessoas', () => {

    beforeEach('Efetuando login', () => {
        cy.sessionLoginAdministration()
        cy.visit(ROUTES.person)
    })

    it('Deleta usuário', () => {
        const timestamp = Date.now()
        const randomEmail = `usuario_${timestamp}_1@gmail.com`

        addPerson.addPerson()
        addPerson.fillNewEmail(randomEmail)
        addPerson.permission('Qualidade')
        addPerson.confirmAddPerson()
        addPerson.msgDefaultMessage('Pessoa adicionada com sucesso!')

        filterPerson.fillEmail(randomEmail)

        deletePerson.deletePerson()
        deletePerson.msgDefaultMessage('Pessoa removida com sucesso!')
    })

    it('Filtrar e excluir pessoa', () => {
        const timestamp = Date.now()
        const randomEmail = `usuario_${timestamp}_1@gmail.com`

        addPerson.addPerson()
        addPerson.fillNewEmail(randomEmail)
        addPerson.randomPermission()
        addPerson.confirmAddPerson()
        addPerson.msgDefaultMessage('Pessoa adicionada com sucesso!')

        filterPerson.fillEmail(randomEmail)
        filterPerson.selectPerson()

        deletePerson.deletePerson()
        deletePerson.msgDefaultMessage('Pessoa removida com sucesso!')
    })

    it('Tentativa de exclusão de admin global', () => {
        filterPerson.fillProfile('Admin Global')
        deletePerson.deleteGlobalAdmin()
    })

    it('Seleciona todos os usuários por perfil e cadastro depois remove', () => {
        const timestamp = Date.now()
        const randomEmail = `usuario_${timestamp}_1@gmail.com`
        const randomEmail2 = `usuario_${timestamp}_2@gmail.com`
        const randomEmail3 = `usuario_${timestamp}_3@gmail.com`

        addPerson.addPerson()
        addPerson.fill3NewsEmails(randomEmail, randomEmail2, randomEmail3)
        addPerson.permission('Qualidade')
        addPerson.confirmAddPerson()
        addPerson.msgDefaultMessage('Pessoa adicionada com sucesso!')
        
        filterPerson.fillProfile('Qualidade')
        filterPerson.fillRegister('Não Concluído')
        filterPerson.selectAllPerson()

        deletePerson.removeSelectedPersonProfile()
        deletePerson.msgDefaultMessage('Remoção de pessoas concluída')
    })

    it('Seleciona todos os usuários por cadastro e remove', () => {
        filterPerson.fillRegister('Não Concluído')
        filterPerson.selectAllPerson()

        deletePerson.removeSelectedPersonProfile()
        deletePerson.msgDefaultMessage('Remoção de pessoas concluída')
    })
})