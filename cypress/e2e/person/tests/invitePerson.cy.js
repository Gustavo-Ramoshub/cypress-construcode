/// <reference types="cypress" />

import { ROUTES } from '../../../support/data/routes'
import invitePerson from '../pages/invitePerson'
import filterPerson from '../pages/filterPerson'
import deletePerson from '../pages/deletePerson'

describe('Pessoas - Convite de pessoas para o empreendimento', () => {

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
    cy.visit(ROUTES.person(4127))
  })

  it('Seleciona todos por cadastro e remove', () => {
    const emails = [generateEmail('_1NaoConluido')]

    invitePeople(emails)

    filterPerson.filterByRegistry('Não Concluído')

    filterPerson.selectAllUsers()

    deletePerson.deleteSelectedUsers()

    deletePerson.verifySuccessToast('Remoção de pessoas concluída')
  })

  it('Deve adicionar uma única pessoa com permissão aleatória', () => {
    const email = generateEmail('_1')

    invitePeople(email, () => {
      invitePerson.selectRandomPermission()
    })

    invitePerson.verifySuccessToast('Pessoa adicionada com sucesso!')
  })

  it('Deve adicionar pessoas em lote com permissão aleatória', () => {
    const emails = [
      generateEmail('_1'),
      generateEmail('_2'),
      generateEmail('_3')
    ]

    invitePeople(emails, () => {
      invitePerson.selectRandomPermission()
    })

    invitePerson.verifySuccessToast('Pessoa adicionada com sucesso!')
  })

  context('Validações obrigatórias para campos específicos de permissões', () => {

    it('Deve exibir erro ao adicionar Projetista sem disciplina atuante', () => {
      const email = generateEmail('_proj')

      invitePeople(email, () => {
        invitePerson.selectPermission('Projetista')
      })

      invitePerson.verifyErrorToast('O campo "Disciplinas atuantes" é obrigatório.')
    })

    it('Deve exibir erro ao adicionar Projetista Líder sem disciplina atuante', () => {
      const email = generateEmail('_lider')

      invitePeople(email, () => {
        invitePerson.selectPermission('Projetista Líder')
      })

      invitePerson.verifyErrorToast('O campo "Disciplinas atuantes" é obrigatório.')
    })

    it('Deve exibir erro ao adicionar Time de Campo sem disciplinas específicas', () => {
      const email = generateEmail('_tc_disciplinas')

      invitePeople(email, () => {
        invitePerson.selectPermission('Time de Campo')
        invitePerson.toggleDisciplineRestriction()
      })

      invitePerson.verifyErrorToast('O campo "Disciplinas permitidas" é obrigatório.')
    })

    it('Deve exibir erro ao adicionar Time de Campo sem locais específicos', () => {
      const email = generateEmail('_tc_locais')

      invitePeople(email, () => {
        invitePerson.selectPermission('Time de Campo')
        invitePerson.toggleLocationRestriction()
      })

      invitePerson.verifyErrorToast('O campo "Locais permitidos" é obrigatório.')
    })

    it('Deve exibir erro ao adicionar Time de Campo sem fases específicas', () => {
      const email = generateEmail('_tc_fases')

      invitePeople(email, () => {
        invitePerson.selectPermission('Time de Campo')
        invitePerson.togglePhaseRestriction()
      })

      invitePerson.verifyErrorToast('O campo "Fases permitidas" é obrigatório.')
    })

    it('Deve exibir o erro e-mail em branco não é valido', () => {
      const email = ' '

      invitePerson.openAddUserModal()

      invitePerson.confirmUserAddition()

      invitePerson.fillNewEmail(email)

      invitePerson.confirmUserAddition()

      invitePerson.verifyErrorToast('O e-mail " " não é válido')
    })

    it('Deve exibir o erro e-mail inválido', () => {
      const email = '@gmail.com'

      invitePeople(email)

      invitePerson.verifyErrorToast(`O e-mail "${email}" não é válido"`)
    })

    it('Deve exibir a mensagem pedindo um e-mail válido', () => {
      const email = 'piãoDoidão@gmail.com'

      invitePeople(email)

      invitePerson.verifyErrorToast('Insira e-mails válidos.')
    })
  })
})