// Testes relacionados a filtros da tela de pessoas

/// <reference types="cypress" />

import { ROUTES } from '../../support/pages/routes'
import filterPerson from '../../support/pages/pessoas/filterPerson'

const user_data = require('../../fixtures/users.json')
const qtdLines = ['10 linhas','25 linhas','50 linhas','100 linhas'];

describe('Filtros de pessoas', () => {

    beforeEach('Efetuando login', () => {
        cy.sessionLoginAdministration()
        cy.visit(ROUTES.person)
    })

    it('Filtra por nome', () => {
        filterPerson.fillName(user_data.profileAdministration.name)
    })

    it('Filtra por e-mail', () => {
        filterPerson.fillEmail(user_data.profileAdministration.email)
    })

    it('Filtra por perfil', () => {
        filterPerson.fillProfile(user_data.profileAdministration.profile)
    })

    it('Filtra por cadastro concluído', () => {
        filterPerson.fillRegister('Concluído')
    })

    it('Filtra por cadastro não concluído', () => {
        filterPerson.fillRegister('Não Concluído')
    })

    it('Filtra por todos os campos', () => {
        filterPerson.fillName(user_data.profileAdministration.name)
        filterPerson.fillEmail(user_data.profileAdministration.email)
        filterPerson.fillProfile(user_data.profileAdministration.profile)
        filterPerson.fillRegister('Concluído')
    })

    it('Seleciona uma pessoa', () => {
        filterPerson.fillEmail(user_data.profileProjectCoordination.email)
        filterPerson.selectPerson()
    })

    it('Seleciona várias pessoas', () => {
        filterPerson.fillProfile('Administração')
        filterPerson.selectAllPerson()
    })

    it('Filtra pelo admin Global e tenta selecionar ele', () => {
        filterPerson.fillName(user_data.adminGlobal.name)
        filterPerson.selectGlobalAdmin()
    })

    qtdLines.forEach((qtdLines) => {
        it.only(`Deve exibir ${qtdLines}`, () => {
            filterPerson.lineCounter(qtdLines);
        })
    })
})