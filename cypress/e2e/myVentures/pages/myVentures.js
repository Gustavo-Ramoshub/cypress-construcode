/// <reference types="cypress" />

const uiMap = {
  fields: {
    search: '#search-enterprise',
    newEnterprise: '#nome',
  },

  modal: {
    enterprise: '.w-full.cursor-pointer.flex-col.gap-4',
  },

  buttons: {
    filterOpen: '.duration-100',
    filterClose: 'button.bg-yellow',
    newEnterprise: 'span.text-lg.text-font-normal.hover\\:underline',
  },

  select: {
    enterprise: '#company-select .css-1q86uur-control',
    enterpriseOptions: 'div[id*="-listbox"]',
    ordering: '#sorting-select .css-1q86uur-control',
    orderingOptions: 'div[id*="-listbox"]',
    projectStartDate: 'div > button:nth-child(1) > div',
    projectFinishDate: 'button:nth-child(2) > div',
    day: '.rdp-button[name="day"]:not(.rdp-day_outside)',
    month: '.rdp-dropdown_month > .rdp-dropdown',
    year: '.rdp-dropdown_year > .rdp-dropdown',
  },

  info: {
    modalNew: 'div[role="dialog"][data-state="open"]',
    userCount: '.text-base.leading-4.text-base.text-font-normal',
    card: '.flex.h-\\[132px\\].w-full.cursor-pointer.flex-col.gap-4.rounded-lg.border-2.border-gray-100.bg-white.p-4.shadow-sm.transition-colors.hover\\:bg-gray-50.\\[\\&\\:last-child\\]\\:mr-auto',
    documentListing: '#SearchData',
  },
}

export default {

  // Valida mensagem quando não há documentos listados
  noDocumentInListing() {
    cy.get(uiMap.info.documentListing)
      .contains('Nenhum local ou disciplina selecionado')
      .should('be.visible')
  },

  // Digita nome da empresa com normalização para exibir sugestões
  typeEnterpriseName(name) {
    const normalized = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    cy.get(uiMap.fields.search)
      .focus()
      .should('have.focus')
      .type(normalized, { force: true })

    cy.get(uiMap.modal.enterprise)
      .should('exist')
      .then($el => {
        [...$el.find('*')].filter(node => {
          const text = node.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          return text.toLowerCase().includes(normalized.toLowerCase())
        })
      })
  },

  // Clica na empresa listada no modal após digitar o nome
  clickOnEnterprise(name) {
    const normalized = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    cy.get(uiMap.fields.search)
      .focus()
      .should('have.focus')
      .type(normalized, { force: true })

    cy.get(uiMap.modal.enterprise)
      .should('exist')
      .then($el => {
        const found = [...$el.find('*')].filter(node => {
          const text = node.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          return text.toLowerCase().includes(normalized.toLowerCase())
        })

        if (found.length > 0) {
          cy.wrap(found[0]).click({ force: true })
        } else {
          throw new Error(`Elemento com texto "${normalized}" não encontrado.`)
        }
      })
  },

  // Retorna a quantidade de usuários exibida
  getUserCount() {
    return cy.get(uiMap.info.userCount)
      .filter((_, el) => /^\d+$/.test(el.innerText.trim()))
      .first()
      .invoke('text')
      .then(text => {
        const count = parseInt(text.trim(), 10)
        cy.log(`Usuários encontrados: ${count}`)
        return count
      })
  },

  // Preenche o campo com o nome da nova empresa
  fillNewEnterpriseName(name) {
    cy.get(uiMap.fields.newEnterprise)
      .type(name, { force: true })
  },

  // Abre o modal de criação de nova empresa
  openNewEnterpriseModal() {
    cy.get(uiMap.buttons.newEnterprise)
      .contains('Criar empreendimento')
      .click()

    cy.get(uiMap.info.modalNew, { timeout: 5000 })
      .should('be.visible')
  },

  // Confirma a criação de nova empresa
  confirmCreateEnterprise() {
    cy.contains('button', 'Criar empreendimento')
      .click({ force: true })
  },

  // Clica fora do modal e valida se permanece aberto
  clickOutsideModal() {
    cy.get('body')
      .click(100, 200, { force: true })

    cy.get(uiMap.info.modalNew, { timeout: 5000 })
      .should('be.visible')
  },

  // Abre os filtros
  openFilters() {
    cy.get(uiMap.buttons.filterOpen)
      .should('be.visible')
      .click()
  },

  // Fecha os filtros
  closeFilters() {
    cy.get(uiMap.buttons.filterClose)
      .should('be.visible')
      .click()
  },

  // Limpa os filtros ativos
  clearFilters() {
    cy.get('button').contains('1 Filtro').should('be.visible').click()
    cy.get('button').contains('Limpar filtros').click()
    cy.get('button').contains('Filtrar').should('be.visible')
  },

  // Filtra empresas pelo nome e valida se os cards exibem o nome
  filterByCompany(name) {
    cy.get(uiMap.select.enterprise).click({ force: true })

    cy.get(uiMap.select.enterpriseOptions)
      .should('be.visible')
      .contains(name)
      .click()

    cy.get(uiMap.info.card)
      .filter(':visible')
      .should('have.length.greaterThan', 0)
      .each($card => {
        cy.wrap($card)
          .invoke('text')
          .then(text => {
            const clean = text.replace(/\s+/g, ' ').trim()
            expect(clean).to.include(name)
          })
      })
  },

  // Valida ordenação ascendente ou descendente da lista
  validateOrdering(orderingLabel, direction = 'asc') {
    const normalizeText = str =>
      str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase()

    cy.get(uiMap.select.ordering).click({ force: true })

    cy.get(uiMap.select.orderingOptions)
      .should('be.visible')
      .contains(orderingLabel)
      .click()

    cy.wait(500)

    cy.get(uiMap.info.card)
      .filter(':visible')
      .then($els => {
        const names = [...$els].map(el => normalizeText(el.innerText))

        const sorted = [...names].sort((a, b) =>
          direction === 'asc'
            ? a.localeCompare(b, 'pt-BR')
            : b.localeCompare(a, 'pt-BR')
        )

        expect(names).to.deep.equal(sorted)
      })
  },

  // Define a data de início do projeto
  setStartDate(day, month, year) {
    this.setDate(
      uiMap.select.projectStartDate,
      day,
      month,
      year,
      'input#dataInicio'
    )
  },

  // Define a data de término do projeto
  setFinishDate(day, month, year) {
    this.setDate(
      uiMap.select.projectFinishDate,
      day,
      month,
      year,
      'input#dataFim'
    )
  },

  // Define uma data usando o date picker e valida o valor
  setDate(buttonSelector, day, month, year, inputSelector) {
    const months = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
    ]

    const dayInt = parseInt(day, 10)
    const dayFormatted = dayInt.toString().padStart(2, '0')
    const monthIndex = parseInt(month, 10) - 1
    const monthFormatted = (monthIndex + 1).toString().padStart(2, '0')

    cy.get(buttonSelector).click({ force: true })

    cy.wait(500)

    cy.get(uiMap.select.month)
      .select(months[monthIndex], { force: true })

    cy.get(uiMap.select.year)
      .select(year, { force: true })

    cy.get(uiMap.select.day)
      .contains(dayInt)
      .click({ force: true })

    cy.contains('button', 'Adicionar')
      .click({ force: true })

    cy.get(inputSelector)
      .should('have.value', `${dayFormatted}/${monthFormatted}/${year}`)
  },
}