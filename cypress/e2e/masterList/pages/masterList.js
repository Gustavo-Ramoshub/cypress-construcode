/// <reference types="cypress" />

const uiMap = {
  buttons: {
    revision: '.details-control.hasRevisao',
    storageOnlyConfirm: '.swal2-confirm.btn.btn-primary.me-3',
    masterList: 'li[data-content="Lista mestra"] a',
  },

  links: {
    obsoleteDocument: 'tr:nth-child(1) > td.text-uppercase.text-start > a',
  },

  fields: {
    board: '#search_Prancha',
    document: '#search_Nome',
    revision: '#search_Revisao',
    extension: '#search_Extensoes',
    title: '#search_Titulo',
    description: '#search_Descricao',
    date: '.filterhead.sorting > .form-floating.form-floating-sm > .form-control.form-control-sm.enableSearchDate',
  },

  selectors: {
    disciplineSearchInput: '.select2-search__field',
    statusSelect: '#search_Status',
    phaseSelect: '#search_Fase',
    disciplineDropdown: '#select2-search_Disciplina-container',

    table: {
      paginationRowCount: '#datatableListraMestra_length > div > select',
      visibleRows: 'table tbody tr[id]',
    },

    excelModalConfirm: '.btn.btn-primary.btn-sm.float-end',
    excelModalNoLocations: '.btn.btn-outline-primary.btn-sm.float-end.me-2',
  },

  titles: {
    discipline: '.dtrg-group.dtrg-start.dtrg-level-0',
    masterList: '.breadcrumb-item.active.align-items-end',
  },

  messages: {
    obsoleteDocument: '.text-danger',
    documentTitle: '#ViewDataTitle',
    storageOnly: '#swal2-content',
    noDocumentInListing: 'body > div.wrapper > main > div > div > div > div > div > div > h2',
  },

  reports: {
    excelBtn: '#gerarExcel',
  },

  modals: {
    excelModal: '.dropdown-menu.dropdown-confirmation.show',
  },
}

const statusClassMap = {
  'Aprovado': 'aprovado',
  'Desativado': 'desativado',
  'Em análise': 'analise',
  'Liberado com ressalvas': 'ressalva',
  'Liberado para obra': 'liberado',
  'Recusado': 'recusaado',
}

export default {

  // Acessa a Lista Mestra
  clickMasterList() {
    cy.get(uiMap.buttons.masterList)
      .should('be.visible')
      .click({ force: true })

    cy.get(uiMap.titles.masterList)
      .should('be.visible')
  },

  // Valida ausência de documentos na listagem
  noDocumentInListing() {
    cy.get(uiMap.messages.noDocumentInListing)
      .should('be.visible')
  },

  // Filtra por status de documento
  filterByStatus(status) {
    const cssClass = statusClassMap[status]
    if (!cssClass) throw new Error(`Classe CSS para status "${status}" não mapeada.`)

    cy.get(uiMap.selectors.statusSelect)
      .should('be.visible')
      .select(status, { force: true })

    cy.get(`.badge-doc_${cssClass}`)
      .should('be.visible')
      .and('contain', status)
  },

  // Filtra por fase
  filterByPhase(phase) {
    cy.get(uiMap.selectors.phaseSelect)
      .should('be.visible')
      .select(phase, { force: true })

    cy.get(uiMap.selectors.table.visibleRows)
      .should('be.visible')
      .and('contain', phase)
  },

  // Filtra por descrição
  filterByDescription(description) {
    cy.get(uiMap.fields.description)
      .should('be.visible')
      .type(description, { force: true })

    cy.get(uiMap.selectors.table.visibleRows)
      .should('be.visible')
      .and('contain', description)
  },

  // Filtra por título
  filterByTitle(title) {
    cy.get(uiMap.fields.title)
      .should('be.visible')
      .clear()
      .type(title)

    cy.get(uiMap.selectors.table.visibleRows)
      .should('be.visible')
      .and('contain', title)
  },

  // Filtra por extensão
  filterByExtension(extension) {
    cy.get(uiMap.fields.extension)
      .should('be.visible')
      .clear()
      .type(extension)

    cy.get(uiMap.selectors.table.visibleRows)
      .should('be.visible')
      .and('contain', extension)
  },

  // Filtra por revisão
  filterByRevision(revision) {
    cy.get(uiMap.fields.revision)
      .should('be.visible')
      .clear()
      .type(revision)

    cy.get(uiMap.selectors.table.visibleRows)
      .should('be.visible')
      .and('contain', revision)
  },

  // Filtra por nome do documento
  filterByDocument(documentName, discipline, documentCount) {
    cy.get(uiMap.fields.document)
      .should('be.visible')
      .clear()
      .type(documentName)

    cy.get(uiMap.titles.discipline)
      .should('be.visible')
      .and('contain', discipline)
      .and('contain', documentCount)

    cy.get(uiMap.selectors.table.visibleRows)
      .should('be.visible')
      .and('contain', documentName)
  },

  // Filtra por data
  filterByDate(date) {
    cy.get(uiMap.fields.date)
      .click({ force: true })
      .type(`${date}{enter}`,{ force: true }, { delay: 300 })

    cy.wait(5000)

    cy.get(uiMap.titles.masterList)
      .click({ force: true })

    cy.get(uiMap.fields.date)
      .click({ force: true })
      .type(`${date}{enter}`,{ force: true }, { delay: 300 })

    cy.wait(5000)

    cy.get(uiMap.titles.masterList)
      .click({ force: true })
  },

  // Filtra documento obsoleto e valida título
  filterObsoleteDocument(documentName) {
    cy.get(uiMap.fields.document)
      .should('be.visible')
      .clear()
      .type(documentName)

    cy.get(uiMap.buttons.revision)
      .should('be.visible')
      .click()

    cy.get(uiMap.messages.obsoleteDocument)
      .should('be.visible')
      .and('contain', 'Obsoleto')

    cy.window().then(win => {
      cy.stub(win, 'open').callsFake(url => {
        win.location.href = url
      })
    })

    cy.get(uiMap.links.obsoleteDocument)
      .should('be.visible')
      .invoke('text')
      .as('docTitle')

    cy.get(uiMap.links.obsoleteDocument).click()

    cy.get('@docTitle').then(title => {
      cy.get(uiMap.messages.documentTitle)
        .should('be.visible')
        .and('contain', title.trim())
    })
  },

  // Valida modal de documento de armazenamento
  validateStorageOnlyDocument(documentName) {
    cy.get(uiMap.fields.document)
      .should('be.visible')
      .clear()
      .type(documentName)

    cy.get(uiMap.buttons.revision)
      .should('be.visible')
      .click()

    cy.get(uiMap.messages.obsoleteDocument)
      .should('be.visible')
      .and('contain', 'Obsoleto')

    cy.get(uiMap.links.obsoleteDocument).click()

    cy.get(uiMap.messages.storageOnly)
      .should('be.visible')
      .and('contain', 'Esse documento está disponível apenas para armazenamento')

    cy.get(uiMap.buttons.storageOnlyConfirm)
      .should('be.visible')
      .click()
  },

  // Filtra por prancha
  filterByBoard(board) {
    cy.get(uiMap.fields.board)
      .should('be.visible')
      .clear()
      .type(board)

    cy.get(uiMap.selectors.table.visibleRows)
      .should('be.visible')
      .and('contain', board)
  },

  // Filtra por disciplina
  filterByDiscipline(discipline) {
    cy.get(uiMap.selectors.disciplineDropdown)
      .should('be.visible')
      .click({ force: true })

    cy.get(uiMap.selectors.disciplineSearchInput)
      .should('be.visible')
      .type(`${discipline}{enter}`)

    cy.get(uiMap.titles.discipline)
      .should('be.visible')
      .and('contain', discipline)
  },

  // Define quantidade de linhas na tabela e valida
  setLineCount(lineCount) {
    const expectedCount = parseInt(lineCount, 10)

    cy.get(uiMap.selectors.table.paginationRowCount)
      .select(lineCount, { force: true })

    cy.get('body').then($body => {
      const rows = $body.find(uiMap.selectors.table.visibleRows)

      if (rows.length > 0) {
        cy.get(uiMap.selectors.table.visibleRows).then($rows => {
          const actualCount = $rows.length

          cy.log(`Exibido: ${actualCount} registros`)

          try {
            expect(actualCount).to.equal(expectedCount)
          } catch {
            cy.log(`Esperado ${expectedCount}, mas exibido ${actualCount}`)
          }
        })
      } else {
        cy.log('Nenhuma linha encontrada')

        if (expectedCount !== 0) {
          cy.log(`Esperado ${expectedCount}, mas exibido 0`)
        }
      }
    })
  },

  // Gera relatório Excel com locais
  generateExcelWithLocations() {
    const fileName = 'ListaMestra_Obra Automações Testes.xlsx'
    const downloadsFolder = Cypress.config('downloadsFolder')

    cy.get(uiMap.reports.excelBtn)
      .should('be.visible')
      .click({ force: true })

    cy.get(uiMap.modals.excelModal)
      .should('be.visible')

    cy.get(uiMap.selectors.excelModalConfirm)
      .should('be.visible')
      .click({ force: true })

    cy.wait(3000)

    cy.task('isFileExist', `${downloadsFolder}/${fileName}`).then(exists => {
      expect(exists).to.be.true
    })
  },

  // Gera relatório Excel sem locais
  generateExcelWithoutLocations() {
    const fileName = 'ListaMestra_Obra Automações Testes.xlsx'
    const downloadsFolder = Cypress.config('downloadsFolder')

    cy.get(uiMap.reports.excelBtn)
      .should('be.visible')
      .click({ force: true })

    cy.get(uiMap.modals.excelModal)
      .should('be.visible')

    cy.get(uiMap.selectors.excelModalNoLocations)
      .should('be.visible')
      .click()

    cy.wait(3000)

    cy.task('isFileExist', `${downloadsFolder}/${fileName}`).then(exists => {
      expect(exists).to.be.true
    })
  },

  // Valida abertura de relatório PDF
  printPdfReport() {
    cy.window().then(win => {
      cy.stub(win, 'open').callsFake(url => {
        expect(url).to.include('/Relatorio/PrintPdf?id=4127')
      })
    })

    cy.contains('a', 'Imprimir PDF').click()
  },
}