// Testes referente a ações de outros perfis

/// <reference types="cypress" />

import { ROUTES } from '../../support/pages/routes'
import filterPerson from '../../support/pages/pessoas/filterPerson'
import editPerson from '../../support/pages/pessoas/editPerson'
import deletePerson from '../../support/pages/pessoas/deletePerson'

const user_data = require('../../fixtures/users.json')

describe('Testes com outros perfis', () => {

    beforeEach('Efetuando login', () => {
        cy.sessionLoginProjectCoordination()
        cy.visit(ROUTES.person)
    })

    it('Tentativa de Editar pessoa de maior hierarquia', () => {
        filterPerson.fillEmail(user_data.profileAdministration.email)

        editPerson.editPerson()
        editPerson.msgDefaultMessage('Acesso Negado!')
    })

    it('Editar a própia permissão (Gerência de projetos) para uma de maior hierarquia', () => {
        filterPerson.fillEmail(user_data.profileProjectCoordination.email)

        editPerson.editPerson()
        editPerson.editTheWizardItself()
    })

    it('Excluir usuário com permissão de maior hierarquia', () => {
        filterPerson.fillEmail(user_data.profileHierarchyTest.email)

        deletePerson.deletePerson()
        deletePerson.msgDefaultMessage('A ação que você tentou executar não é permitida para seu usuário. Verifique suas permissões ou entre em contato com o administrador do seu empreendimento.')
    })
})