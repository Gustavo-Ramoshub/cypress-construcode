/// <reference types="cypress" />

const uiMap = {
  buttons: {
    deleteSingleUser: '.cci-delete',
    blockedGlobalAdminDelete: '#newDatatable > tbody > tr > td:nth-child(7) > a:nth-child(2) > i',
    confirmSingleUserDeletion: '#removerUsuario',
    deleteSelectedUsers: '#section > button.btn.btn-danger.text-white.btn-sm',
    confirmBatchDeletion: '#removerUsuariosBatch',
  },

  messages: {
    toastNotification: '#toastMessage',
    blockedDeleteTooltip: '[data-bs-original-title="Não é possível excluir esta pessoa"]',
  },
}

export default {

  // Exclui usuários em lote
  deleteSelectedUsers() {
    cy.get(uiMap.buttons.deleteSelectedUsers)
      .should('be.visible')
      .click({force: true})

    cy.get(uiMap.buttons.confirmBatchDeletion)
      .should('be.visible')
      .click()
  },

  // Exclui um único usuário
  deleteSingleUser() {
    cy.get(uiMap.buttons.deleteSingleUser)
      .should('be.visible')
      .click()

    cy.get(uiMap.buttons.confirmSingleUserDeletion)
      .should('be.visible')
      .click()
  },

  // Verifica que a exclusão de administrador global está bloqueada
  verifyBlockedGlobalAdminDelete() {
    cy.get(uiMap.buttons.blockedGlobalAdminDelete)
      .should('be.visible')

    cy.get(uiMap.messages.blockedDeleteTooltip)
      .should('be.visible')
  },

  // Verifica exibição de mensagem de sucesso após exclusão
  verifySuccessToast(message) {
    cy.get(uiMap.messages.toastNotification)
      .should('be.visible')
      .and('contain.text', message)
  },

  // Verifica exibição de toast de erro ao tentar ação sem permissão
  verifyWithoutPermissionToast(message) {
    cy.get(uiMap.messages.toastNotification)
      .should('contain.text', message)
  },
}