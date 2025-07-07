/// <reference types="cypress" />

const uiMap = {
  buttons: {
    openAddUserModal: '#addUsuarioBtn',
    confirmUserAddition: '#btnAdicionarUsuario',

    toggleDisciplineRestriction: '#LimitarAcessoDisciplinas',
    toggleLocationRestriction: '#LimitarAcessoAreas',
    togglePhaseRestriction: '#LimitarAcessoFases',

    selectAllDisciplines: '#DisciplinasEspecialistaWrapper > div > span > a.addAll',
  },

  fields: {
    emailInputField: '.select2-container--open .select2-search__field',
    addedEmailTag: '.select2-selection__choice',
  },

  selectors: {
    emailDropdown: '[aria-describedby=select2-emailConvidado-container]',
    permissionDropdown: '#Fiscal',
    disciplineActingField: '#DisciplinasEspecialistaWrapper > div',
    disciplineMultiSelect:
      '#DisciplinasWrapper > span.select2.select2-container.select2-container--default > span.selection > span > span',
  },

  messages: {
    toastNotification: '#toastMessage',
    toastError: '#toastMessage',
    accessDeniedModal: '#swal2-content',
    permissionSectionHeader: '.accordion-button',
  },
}

export default {
  // Abre o modal de adição de novo usuário
  openAddUserModal() {
    cy.get(uiMap.buttons.openAddUserModal)
      .should('be.visible')
      .click({ force: true })
  },

  // Confirma a adição do usuário
  confirmUserAddition() {
    cy.get(uiMap.buttons.confirmUserAddition)
      .should('be.visible')
      .click({ force: true })
  },

  // Preenche e valida e-mail(s) no campo de adição
  fillNewEmail(emails) {
    if (!Array.isArray(emails)) {
      emails = [emails]
    }

    emails.forEach(email => {
      cy.get(uiMap.selectors.emailDropdown).click()
      cy.get(uiMap.fields.emailInputField).clear().type(email).blur()
      cy.wait(300)
      cy.get(uiMap.fields.addedEmailTag).should('contain', email)
    })
  },

  // Seleciona uma permissão específica
  selectPermission(permissionName) {
    cy.get(uiMap.selectors.permissionDropdown).select(permissionName)

    cy.get(uiMap.messages.permissionSectionHeader)
      .should('contain.text', `Permissões de ${permissionName}`)
  },

  // Seleciona uma permissão aleatória e trata validação para projetistas
  selectRandomPermission() {
    const permissions = [
      'Administração', 'Cliente', 'Convidado(a)', 'Coordenação de campo',
      'Coordenação de projeto', 'Engenharia de campo', 'Gerência de campo',
      'Gerência de projetos', 'Projetista', 'Qualidade', 'Terceirizado(a)',
      'Time de Campo', 'Projetista Líder'
    ]

    const randomIndex = Math.floor(Math.random() * permissions.length)
    const selectedPermission = permissions[randomIndex]

    cy.get(uiMap.selectors.permissionDropdown).select(selectedPermission)

    cy.get(uiMap.messages.permissionSectionHeader)
      .should('contain.text', `Permissões de ${selectedPermission}`)

    if (['Projetista', 'Projetista Líder'].includes(selectedPermission)) {
      cy.get(uiMap.selectors.disciplineActingField)
        .click()
        .type('Geral{enter}')
    }
  },

  // Marca restrição por disciplina
  toggleDisciplineRestriction() {
    cy.get(uiMap.buttons.toggleDisciplineRestriction)
      .click()
      .should('be.checked')
  },

  // Marca restrição por localidade
  toggleLocationRestriction() {
    cy.get(uiMap.buttons.toggleLocationRestriction)
      .click()
      .should('be.checked')
  },

  // Marca restrição por fase
  togglePhaseRestriction() {
    cy.get(uiMap.buttons.togglePhaseRestriction)
      .click()
      .should('be.checked')
  },

  // Seleciona todas as disciplinas
  selectAllDisciplines() {
    cy.get(uiMap.buttons.selectAllDisciplines)
      .should('contain.text', 'Adicionar todas')
      .should('be.visible')
      .click({ force: true })
  },

  // Seleciona uma disciplina específica
  selectSpecificDiscipline(disciplineName) {
    cy.get(uiMap.selectors.disciplineMultiSelect)
      .click()
      .type(`${disciplineName}{enter}`)
  },

  // Valida toast de sucesso
  verifySuccessToast(message) {
    cy.get(uiMap.messages.toastNotification)
      .should('contain.text', message)
  },

  // Valida toast de erro
  verifyErrorToast(message) {
    cy.get(uiMap.messages.toastError)
      .should('contain.text', message)
  },

  // Valida mensagem de acesso negado
  verifyAccessDeniedMessage(message) {
    cy.get(uiMap.messages.accessDeniedModal)
      .should('contain.text', message)
  },
}