/// <reference types="cypress" />

const uiMap = {
  buttons: {
    openUserEditModal: '.btn-edit-user',
    blockedGlobalAdminEdit: '.xpto-item-disabled > .cci-pen-02',
    confirmUserUpdate: '#btnSalvarVinculoUsuario',
    selectAllDisciplines: '#DisciplinasEspecialistaWrapper > div > span > a.addAll',
    removeAllDisciplines: '#DisciplinasEspecialistaWrapper > div > span > a.removeAll',
  },

  selectors: {
    permissionDropdown: '#Fiscal',
    disciplineActingField: '#DisciplinasEspecialistaWrapper > div',
  },

  messages: {
    toastNotification: '#toastMessage',
    toastError: '#toastMessage',
    blockedEditTooltip: '[data-bs-original-title="Não é possível editar esta pessoa"]',
    permissionSectionHeader: '.accordion-button',
  }
}

export default {

  // Abre o modal de edição de usuário
  openUserEditModal() {
    cy.get(uiMap.buttons.openUserEditModal)
      .should('be.visible')
      .click()
  },

  // Confirma a atualização do usuário
  confirmUserUpdate() {
    cy.get(uiMap.buttons.confirmUserUpdate)
      .should('be.visible')
      .click()
  },

  // Seleciona uma permissão específica
  selectPermission(permissionName) {
    cy.get(uiMap.selectors.permissionDropdown)
      .select(permissionName)

    cy.get(uiMap.messages.permissionSectionHeader)
      .should('contain.text', `Permissões de ${permissionName}`)
  },

  // Verifica se a permissão "Administração" está desabilitada
  verifyAdminPermissionIsDisabled() {
    cy.get(uiMap.selectors.permissionDropdown)
      .find('option')
      .contains('Administração')
      .should('be.disabled')
  },

  // Seleciona permissão aleatória e preenche disciplina quando necessário
  selectRandomPermission() {
    const permissions = [
      'Administração', 'Cliente', 'Convidado(a)', 'Coordenação de campo',
      'Coordenação de projeto', 'Engenharia de campo', 'Gerência de campo',
      'Gerência de projetos', 'Projetista', 'Qualidade', 'Terceirizado(a)',
      'Time de Campo', 'Projetista Líder'
    ]

    const randomIndex = Math.floor(Math.random() * permissions.length)
    const selectedPermission = permissions[randomIndex]

    cy.get(uiMap.selectors.permissionDropdown)
      .select(selectedPermission)

    cy.get(uiMap.messages.permissionSectionHeader)
      .should('contain.text', `Permissões de ${selectedPermission}`)

    if (['Projetista', 'Projetista Líder'].includes(selectedPermission)) {
      cy.get(uiMap.selectors.disciplineActingField)
        .click()
        .type('Geral{enter}')
    }
  },

  // Adiciona todas as disciplinas atuantes
  selectAllDisciplines() {
    cy.get(uiMap.buttons.selectAllDisciplines)
      .should('contain.text', 'Adicionar todas')
      .should('be.visible')
      .click({ force: true })
  },

  // Remove todas as disciplinas atuantes
  removeAllDisciplines() {
    cy.get(uiMap.buttons.removeAllDisciplines)
      .should('contain.text', 'Remover todas')
      .click({ force: true })
  },

  // Valida bloqueio de edição de admin global
  verifyBlockedGlobalAdminEdit() {
    cy.get(uiMap.buttons.blockedGlobalAdminEdit)
      .should('be.visible')

    cy.get(uiMap.messages.blockedEditTooltip)
      .should('be.visible')
  },

  // Valida exibição de mensagem de sucesso
  verifySuccessToast(message) {
    cy.get(uiMap.messages.toastNotification)
      .should('contain.text', message)
  },

  // Valida exibição de mensagem de erro
  verifyErrorToast(message) {
    cy.get(uiMap.messages.toastError)
      .should('contain.text', message)
  },
}