/// <reference types="cypress" />

export const allowedProfiles = [
  { loginFn: cy.adminGlobalLoginSession, name: 'Admin Global' },
  { loginFn: cy.profileAdministrationLoginSession, name: 'Administração' },
  { loginFn: cy.projectManagementProfileLoginSession, name: 'Gerência de projetos' },
  { loginFn: cy.profileProjectCoordinationLoginSession, name: 'Coordenação de projetos' },
  { loginFn: cy.fieldManagementProfileLoginSession, name: 'Gerência de campo' },
  { loginFn: cy.fieldCoordinationTestProfileLoginSession, name: 'Coordenação de campo' },
  { loginFn: cy.fieldEngineeringTestProfileLoginSession, name: 'Engenharia de campo' },
  { loginFn: cy.qualityTestProfileLoginSession, name: 'Qualidade' },
]

export const deniedProfiles = [
  { loginFn: cy.fieldTeamProfileLoginSession, name: 'Cliente' },
  { loginFn: cy.outsourcedProfileLoginSession, name: 'Convidado' },
  { loginFn: cy.leadDesignerProfileLoginSession, name: 'Projetista' },
  { loginFn: cy.designerProfileLoginSession, name: 'Projetista líder' },
  { loginFn: cy.guestProfileLoginSession, name: 'Terceirizado' },
  { loginFn: cy.customerProfileLoginSession, name: 'Time de campo' },
]