// Testes relacionados a lista mestra

/// <reference types="cypress" />

import { ROUTES } from '../../support/pages/routes'
import masterList from '../../support/pages/listaMestra/masterList'

const statusList = ['Aprovado','Desativado','Em análise','Liberado com ressalvas','Liberado para obra','Recusado'];
const qtdLines = ['10 linhas','25 linhas','50 linhas','100 linhas'];

describe('Lista mestra', () => {

   beforeEach('Login válido', () => {
         cy.sessionLoginAdministration()
         cy.visit(ROUTES.masterList)
     })

   qtdLines.forEach((qtdLines) => {
      it.only(`Validação de ${qtdLines}`, () => {
         masterList.lineCounters(qtdLines);
      })
   })

   it('Filtra por uma disciplina', () => {
      masterList.disciplineFilter('Arquitetura')
   })

   it('Filtra por prancha', () => {
      masterList.boardFilter('0081')
   })

   it('Filtra por documento e valida a disciplina e se na listagem está somente 1 documento', () => {
      masterList.documentFilter('GURAMOS_ARQ_LOC_RF_R01', '(ACB) Acabamento', '1 documento')
   })

   it('Filtra por revisão', () => {
      masterList.revisionFilter('R07')
   })

   it('Filtra por 1 extensão', () => {
      masterList.extensionFilter('MAX')         
   })

   it('Filtra por mais de uma extensão', () => {
      masterList.extensionFilter( 'DWG, PDF, JPG')         
   })

   it('Filtra por título', () => {
      masterList.titleFilter('ESSE TITULO MASSA MAÇA')
   })

   it('Filtra por descrição', () => {
      masterList.descriptionFilter('DESCRIÇÃO NADA')
   })

   it('Filtra por fase', () => {
      masterList.phaseFilter('Liberado para obra')
   })

   statusList.forEach((status) => {
      it(`Filtra por status: ${status}`, () => {
         masterList.statusFilter(status);
      })
   })

   it('Buscar por revisão obsoleta', () => {
      masterList.obsoleteDocumentFilter('PICS-OIC-AP-01P-R02')
   })

   it('Revisão obsoleta sem processamento', () => {
      masterList.documentForStorageOnly('DOCUMENTO-PARAREVISAO-SEMPROCESSO-R03')
   })
})