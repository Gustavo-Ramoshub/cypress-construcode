// Testes relacionados a convite de pessoas para um empreendimento

/// <reference types="cypress" />

import { ROUTES } from '../../support/pages/routes'
import invitePerson from '../../support/pages/pessoas/invitePerson'

describe('Adição de pessoas', () => {

    beforeEach('Efetuando login', () => {
        cy.sessionLoginAdministration()
        cy.visit(ROUTES.person)
    })

    it('Adicionar uma pessoa', () => {
        const timestamp = Date.now()
        const randomEmail = `usuario_${timestamp}_1@gmail.com`

        invitePerson.addPerson()
        invitePerson.fillNewEmail(randomEmail)
        invitePerson.randomPermission()
        invitePerson.confirmAddPerson()
        invitePerson.msgDefaultMessage('Pessoa adicionada com sucesso!')
    })

    const times = 1
    for (let i = 0; i < times; i++) {
        it('Adicionar pessoas em lote', () => {
            const timestamp = Date.now()
            const randomEmail1 = `usuario_${timestamp}_1@gmail.com`
            const randomEmail2 = `usuario_1${timestamp}_2@gmail.com`
            const randomEmail3 = `usuario_2${timestamp}_3@gmail.com`

            invitePerson.addPerson()
            invitePerson.fill3NewsEmails(randomEmail1, randomEmail2, randomEmail3)
            invitePerson.randomPermission()
            invitePerson.confirmAddPerson()
            invitePerson.msgDefaultMessage('Pessoa adicionada com sucesso!')
        })
    }

    it('Adicionar um projetista e não adicionar disciplina atuante', () => {
        const timestamp = Date.now()
        const randomEmail = `usuario_${timestamp}_1@gmail.com`

        invitePerson.addPerson()
        invitePerson.fillNewEmail(randomEmail)
        invitePerson.permission('Projetista')
        invitePerson.confirmAddPerson()
        invitePerson.msgError('O campo "Disciplinas atuantes" é obrigatório.')
    })

    it('Adicionar um projetista líder e não adicionar disciplina atuante', () => {
        const timestamp = Date.now()
        const randomEmail = `usuario_${timestamp}_1@gmail.com`

        invitePerson.addPerson()
        invitePerson.fillNewEmail(randomEmail)
        invitePerson.permission('Projetista Líder')
        invitePerson.confirmAddPerson()
        invitePerson.msgError('O campo "Disciplinas atuantes" é obrigatório.')
    })

    it('Adicionar pessoas limitando e deixando o campo de disciplinas vazio e validando mensagem de error', () => {
        const timestamp = Date.now()
        const randomEmail = `usuario_${timestamp}_1@gmail.com`

        invitePerson.addPerson()
        invitePerson.fillNewEmail(randomEmail)
        invitePerson.permission('Time de Campo')
        invitePerson.viewSpecificDisciplines()
        invitePerson.confirmAddPerson()
        invitePerson.msgError('O campo "Disciplinas permitidas" é obrigatório.')
    })

    it('Adicionar pessoas limitando e deixando o campo de locais de vazio e validando mensagem de error', () => {
        const timestamp = Date.now()
        const randomEmail = `usuario_${timestamp}_1@gmail.com`

        invitePerson.addPerson()
        invitePerson.fillNewEmail(randomEmail)
        invitePerson.permission('Time de Campo')
        invitePerson.viewSpecificLocations()
        invitePerson.confirmAddPerson()
        invitePerson.msgError('O campo "Locais permitidos" é obrigatório.')
    })

    it('adicionar pessoas limitando e deixando o campo de fases de vazio e validando mensagem de error', () => {
        const timestamp = Date.now()
        const randomEmail = `usuario_${timestamp}_1@gmail.com`

        invitePerson.addPerson()
        invitePerson.fillNewEmail(randomEmail)
        invitePerson.permission('Time de Campo')
        invitePerson.viewSpecificPhases()
        invitePerson.confirmAddPerson()
        invitePerson.msgError('O campo "Fases permitidas" é obrigatório.')
    })
})