/// <reference types="cypress" />

import { ROUTES } from '../../../support/data/routes'
import masterList from '../pages/masterList'
import 'cypress-downloadfile/lib/downloadFileCommand'

const statusList = [
  'Aprovado',
  'Desativado',
  'Em análise',
  'Liberado com ressalvas',
  'Liberado para obra',
  'Recusado',
]

const lineCounts = [
  '10 linhas',
  '25 linhas',
  '50 linhas',
  '100 linhas',
]

describe('Lista Mestra', () => {
  
  beforeEach('Login e acesso à lista mestra', () => {
    cy.profileAdministrationLoginSession()
    cy.visit(ROUTES.masterList(4127))
  })

  context('Validação de quantidade de linhas por página', () => {
    
    // Testa se as opções de quantidade de linhas são exibidas corretamente
    lineCounts.forEach(count => {
      it(`Exibe ${count} corretamente`, () => {
        masterList.setLineCount(count)
      })
    })
  })

  context('Filtros básicos', () => {
    
    it('Filtra por disciplina', () => {
      masterList.filterByDiscipline('Arquitetura')
    })

    it('Filtra por prancha', () => {
      masterList.filterByBoard('0081')
    })

    it('Filtra por documento e valida retorno', () => {
      masterList.filterByDocument('GURAMOS_ARQ_LOC_RF_R01', 'Acabamento', '1 documento')
    })

    it('Filtra por revisão', () => {
      masterList.filterByRevision('R07')
    })

    it('Filtra por extensão única', () => {
      masterList.filterByExtension('MAX')
    })

    it('Filtra por múltiplas extensões: DWG, PDF, JPG', () => {
      masterList.filterByExtension('DWG, PDF, JPG')
    })

    it('Filtra por título', () => {
      masterList.filterByTitle('Teste de Link Youtube Ramos Titulo')
    })

    it('Filtra por descrição', () => {
      masterList.filterByDescription('Teste de Youtube 2 #&$¨*(&$¨#')
    })

    it('Filtra por fase', () => {
      masterList.filterByPhase('Liberado para obra')
    })

    it.only('Filtra por data escrevendo ao invés de selecionar', () => {
      masterList.filterByDate('05/06/2025')
    })

    // Testa filtro para cada status da lista
    statusList.forEach(status => {
      it(`Filtra por status: ${status}`, () => {
        masterList.filterByStatus(status)
      })
    })
  })

  context('Documentos obsoletos', () => {
    
    it('Filtra por revisão obsoleta', () => {
      masterList.filterObsoleteDocument('PICS-OIC-AP-01P-R02')
    })

    it('Valida documento obsoleto sem processamento', () => {
      masterList.validateStorageOnlyDocument('DOCUMENTO-PARAREVISAO-SEMPROCESSO-R03')
    })
  })

  context('Combinações de filtros e ações', () => {
    
    it('Filtra disciplina e altera quantidade de linhas em sequência', () => {
      masterList.filterByDiscipline('HIDRÁULICA/SANEAMENTO E FLUIDOS INDUSTRIAIS')

      lineCounts.forEach(count => {
        masterList.setLineCount(count)
      })
    })
  })

  context('Exportações', () => {
    
    it('Filtra por um documento e exporta Excel com locais', () => {
      masterList.filterByDocument('GURAMOS_ARQ_LOC_RF_R01', 'Acabamento', '1 documento')
      masterList.generateExcelWithLocations()
    })

    it('Filtra por um documento e exporta Excel sem locais', () => {
      masterList.filterByDocument('GURAMOS_ARQ_LOC_RF_R01', 'Acabamento', '1 documento')
      masterList.generateExcelWithoutLocations()
    })

    it('Filtra por um documento obsoleto e exporta Excel com locais', () => {
      masterList.filterByDocument('PICS-OIC-AP-01P-R02', 'Áreas molhadas', '1 documento')
      masterList.generateExcelWithLocations()
    })

    it('Filtra por um documento obsoleto e exporta Excel sem locais', () => {
      masterList.filterByDocument('PICS-OIC-AP-01P-R02', 'Áreas molhadas', '1 documento')
      masterList.generateExcelWithoutLocations()
    })

    it('Filtra por uma disciplina e exporta Excel com locais', () => {
      masterList.filterByDiscipline('Arquitetura')
      masterList.generateExcelWithLocations()
    })

    it('Filtra por uma disciplina e exporta Excel sem locais', () => {
      masterList.filterByDiscipline('Arquitetura')
      masterList.generateExcelWithoutLocations()
    })

    it('Exporta Excel com locais', () => {
      masterList.generateExcelWithLocations()
    })

    it('Exporta Excel sem locais', () => {
      masterList.generateExcelWithoutLocations()
    })

    it('Exporta PDF', () => {
      masterList.printPdfReport()
    })

    it('Filtra por disciplina e exporta PDF', () => {
      masterList.filterByDiscipline('Arquitetura')
      masterList.printPdfReport()
    })
  })
})