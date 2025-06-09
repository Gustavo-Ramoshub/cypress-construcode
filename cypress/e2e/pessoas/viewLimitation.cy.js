// Teste relacionado a limitação de visualização do usuário a disciplinas não atuantes

/// <reference types="cypress" />

import { ROUTES } from '../../support/pages/routes'
import addPerson from '../../support/pages/pessoas/invitePerson'
import screenDocuments from '../../support/pages/documentos/screenDocuments'
import filterPerson from '../../support/pages/pessoas/filterPerson'
import deletePerson from '../../support/pages/pessoas/deletePerson'

const user_data = require('../../fixtures/users.json')

describe('Limitação de visualização', () => {

    it('Limitação de visualização', () => {
        const email = user_data.testViewLimitation.email
        
        cy.sessionLoginAdministration()
        cy.visit(ROUTES.person)

        addPerson.addPerson()
        addPerson.fillNewEmail(email)
        //testeLimitacaoVisualizacao@gmail.com
        addPerson.permission('Gerência de projetos')
        addPerson.viewSpecificDisciplines()
        addPerson.selectDisciplinesEspefics('(ARQ) Arquitetura')
        addPerson.selectDisciplinesEspefics('(ELE) Elétrica')
        addPerson.confirmAddPerson()
        addPerson.msgDefaultMessage('Pessoa adicionada com sucesso!')

        cy.wait(5000)
        cy.sessionLoginViewLimitation()
        cy.visit(ROUTES.documentsScreen)

        screenDocuments.disciplinesDisplayed('Arquitetura')
        screenDocuments.disciplinesDisplayed('Elétrica')
        screenDocuments.disciplineslineCounter(2)

        cy.wait(5000)
        cy.sessionLoginAdministration()
        cy.visit(ROUTES.person)

        filterPerson.fillEmail(email)
        
        deletePerson.deletePerson()
        deletePerson.msgDefaultMessage('Pessoa removida com sucesso!')
    })
})