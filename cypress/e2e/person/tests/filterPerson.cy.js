/// <reference types="cypress" />

import { ROUTES } from '../../../support/data/routes'
import filterPerson from '../pages/filterPerson'
import invitePerson from '../pages/invitePerson'

const userData = require('../../../fixtures/users.json')

const { name, email, profile } = userData.profileAdministration
const adminGlobal = userData.adminGlobal
const qtdLines = ['10 linhas', '25 linhas', '50 linhas', '100 linhas']

describe('Pessoas - Filtros da tela de pessoas', () => {
  const generateEmail = (sufixo = '') => `usuario_${Date.now()}${sufixo}@gmail.com`
  
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
  
  beforeEach(() => {
    cy.profileAdministrationLoginSession()
    cy.visit(ROUTES.person(6393))
  })

  context('Filtros individuais', () => {
    it('Filtra por nome', () => {
      filterPerson.filterByName(name)
    })

    it('Filtra por e-mail', () => {
      filterPerson.filterByEmail(email)
    })

    it('Filtra por perfil', () => {
      filterPerson.filterByProfile(profile)
    })

    it('Filtra por cadastro concluído', () => {
      filterPerson.filterByRegistry('Concluído')
    })

    it('Filtra por cadastro não concluído', () => {
      const emails = generateEmail('_1')
    
      invitePeople(emails, () => {
        invitePerson.selectRandomPermission()
      })
      invitePerson.verifySuccessToast('Pessoa adicionada com sucesso!')
      filterPerson.filterByRegistry('Não Concluído')
    })
  })

  context('Filtro combinado', () => {
    it('Aplica todos os filtros simultaneamente', () => {
      filterPerson.filterByName(name)
      filterPerson.filterByEmail(email)
      filterPerson.filterByProfile(profile)
      filterPerson.filterByRegistry('Concluído')
    })
  })

  context('Seleção de pessoas', () => {
    it('Seleciona uma única pessoa por e-mail', () => {
      filterPerson.filterByEmail(email)
      filterPerson.selectSingleUser()
    })

    it('Seleciona todas as pessoas com perfil "Administração"', () => {
      filterPerson.filterByProfile('Administração')
      filterPerson.selectAllUsers()
    })

    it('Tenta selecionar Admin Global (ação bloqueada)', () => {
      filterPerson.filterByName(adminGlobal.name)
      filterPerson.trySelectGlobalAdmin()
    })
  })

  context('Exibição por quantidade de linhas', () => {
    qtdLines.forEach((lineCount) => {
      it(`Exibe ${lineCount} na tabela`, () => {
        filterPerson.validateRowCount(lineCount)
      })
    })
  })
})