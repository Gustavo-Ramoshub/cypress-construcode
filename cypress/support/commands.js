/// <reference types="cypress" />

import login from '../support/pages/login/login'
import { ROUTES } from '../support/pages/routes'

// Login com perfil de Admin
Cypress.Commands.add('Login', (
    userEmail = Cypress.env('profileAdministration').email,
    userPassword = Cypress.env('profileAdministration').password
) => {
    cy.visit(ROUTES.login)
    login.fillEmail(userEmail)
    login.fillPasssword(userPassword)
    login.clickLogin()
})

Cypress.Commands.add('sessionLoginAdministration', (
    userEmail = Cypress.env('profileAdministration').email,
    userPassword = Cypress.env('profileAdministration').password
) => {
    const login = () => cy.Login(userEmail, userPassword)
    cy.session(userEmail, login)
})

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// Login com perfil de Cliente
Cypress.Commands.add('Login', (
    userEmail = Cypress.env('customerProfile').email,
    userPassword = Cypress.env('customerProfile').password
) => {
    cy.visit(ROUTES.login)
    login.fillEmail(userEmail)
    login.fillPasssword(userPassword)
    login.clickLogin()
})

Cypress.Commands.add('customerLoginSession', (
    userEmail = Cypress.env('customerProfile').email,
    userPassword = Cypress.env('customerProfile').password
) => {
    const login = () => cy.Login(userEmail, userPassword)
    cy.session(userEmail, login)
})

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// Login com perfil de Convidado
Cypress.Commands.add('Login', (
    userEmail = Cypress.env('guestProfile').email,
    userPassword = Cypress.env('guestProfile').password
) => {
    cy.visit(ROUTES.login)
    login.fillEmail(userEmail)
    login.fillPasssword(userPassword)
    login.clickLogin()
})

Cypress.Commands.add('guestLoginSession', (
    userEmail = Cypress.env('guestProfile').email,
    userPassword = Cypress.env('guestProfile').password
) => {
    const login = () => cy.Login(userEmail, userPassword)
    cy.session(userEmail, login)
})

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// Login com perfil de Coordenacao Campo
Cypress.Commands.add('Login', (
    userEmail = Cypress.env('fieldCoordinationTestProfile').email,
    userPassword = Cypress.env('fieldCoordinationTestProfile').password
) => {
    cy.visit(ROUTES.login)
    login.fillEmail(userEmail)
    login.fillPasssword(userPassword)
    login.clickLogin()
})

Cypress.Commands.add('loginSessionFieldCoordination', (
    userEmail = Cypress.env('fieldCoordinationTestProfile').email,
    userPassword = Cypress.env('fieldCoordinationTestProfile').password
) => {
    const login = () => cy.Login(userEmail, userPassword)
    cy.session(userEmail, login)
})

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

//Login com perfil de Coordenação de Projeto
Cypress.Commands.add('Login', (
    userEmail = Cypress.env('profileProjectCoordination').email,
    userPassword = Cypress.env('profileProjectCoordination').password
) => {
    cy.visit(ROUTES.login)
    login.fillEmail(userEmail)
    login.fillPasssword(userPassword)
    login.clickLogin()
})

Cypress.Commands.add('sessionLoginProjectCoordination', (
    userEmail = Cypress.env('profileProjectCoordination').email,
    userPassword = Cypress.env('profileProjectCoordination').Password
) => {
    const login = () => cy.Login(userEmail, userPassword)
    cy.session(userEmail, login)
})

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

//Login com perfil de Engenharia Campo
Cypress.Commands.add('Login', (
    userEmail = Cypress.env('fieldEngineeringTestProfile').email,
    userPassword = Cypress.env('fieldEngineeringTestProfile').password
) => {
    cy.visit(ROUTES.login)
    login.fillEmail(userEmail)
    login.fillPasssword(userPassword)
    login.clickLogin()
})

Cypress.Commands.add('fieldEngineeringLoginSession', (
    userEmail = Cypress.env('fieldEngineeringTestProfile').email,
    userPassword = Cypress.env('fieldEngineeringTestProfile').Password
) => {
    const login = () => cy.Login(userEmail, userPassword)
    cy.session(userEmail, login)
})

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

//Login com perfil de Gerencia Campo
Cypress.Commands.add('Login', (
    userEmail = Cypress.env('fieldManagementProfile').email,
    userPassword = Cypress.env('fieldManagementProfile').password
) => {
    cy.visit(ROUTES.login)
    login.fillEmail(userEmail)
    login.fillPasssword(userPassword)
    login.clickLogin()
})

Cypress.Commands.add('loginSessionManageField', (
    userEmail = Cypress.env('fieldManagementProfile').email,
    userPassword = Cypress.env('fieldManagementProfile').Password
) => {
    const login = () => cy.Login(userEmail, userPassword)
    cy.session(userEmail, login)
})

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

//Login com perfil de Gerencia Projetos
Cypress.Commands.add('Login', (
    userEmail = Cypress.env('projectManagementProfile').email,
    userPassword = Cypress.env('projectManagementProfile').password
) => {
    cy.visit(ROUTES.login)
    login.fillEmail(userEmail)
    login.fillPasssword(userPassword)
    login.clickLogin()
})

Cypress.Commands.add('sessionLoginManageProjects', (
    userEmail = Cypress.env('projectManagementProfile').email,
    userPassword = Cypress.env('projectManagementProfile').Password
) => {
    const login = () => cy.Login(userEmail, userPassword)
    cy.session(userEmail, login)
})

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

//Login com perfil de Projetista
Cypress.Commands.add('Login', (
    userEmail = Cypress.env('designerProfile').email,
    userPassword = Cypress.env('designerProfile').password
) => {
    cy.visit(ROUTES.login)
    login.fillEmail(userEmail)
    login.fillPasssword(userPassword)
    login.clickLogin()
})

Cypress.Commands.add('designerLoginSession', (
    userEmail = Cypress.env('designerProfile').email,
    userPassword = Cypress.env('designerProfile').Password
) => {
    const login = () => cy.Login(userEmail, userPassword)
    cy.session(userEmail, login)
})

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

//Login com perfil de Projetista Lider
Cypress.Commands.add('Login', (
    userEmail = Cypress.env('leadDesignerProfile').email,
    userPassword = Cypress.env('leadDesignerProfile').password
) => {
    cy.visit(ROUTES.login)
    login.fillEmail(userEmail)
    login.fillPasssword(userPassword)
    login.clickLogin()
})

Cypress.Commands.add('leadDesignerLoginSession', (
    userEmail = Cypress.env('leadDesignerProfile').email,
    userPassword = Cypress.env('leadDesignerProfile').Password
) => {
    const login = () => cy.Login(userEmail, userPassword)
    cy.session(userEmail, login)
})

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

//Login com perfil de Qualidade
Cypress.Commands.add('Login', (
    userEmail = Cypress.env('QualityTestProfile').email,
    userPassword = Cypress.env('QualityTestProfile').password
) => {
    cy.visit(ROUTES.login)
    login.fillEmail(userEmail)
    login.fillPasssword(userPassword)
    login.clickLogin()
})

Cypress.Commands.add('sessionLoginQuality', (
    userEmail = Cypress.env('QualityTestProfile').email,
    userPassword = Cypress.env('QualityTestProfile').Password
) => {
    const login = () => cy.Login(userEmail, userPassword)
    cy.session(userEmail, login)
})

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

//Login com perfil de Terceirizado
Cypress.Commands.add('Login', (
    userEmail = Cypress.env('outsourcedProfile').email,
    userPassword = Cypress.env('outsourcedProfile').password
) => {
    cy.visit(ROUTES.login)
    login.fillEmail(userEmail)
    login.fillPasssword(userPassword)
    login.clickLogin()
})

Cypress.Commands.add('thirdPartyLoginSession', (
    userEmail = Cypress.env('outsourcedProfile').email,
    userPassword = Cypress.env('outsourcedProfile').Password
) => {
    const login = () => cy.Login(userEmail, userPassword)
    cy.session(userEmail, login)
})

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

//Login com perfil de Time Campo
Cypress.Commands.add('Login', (
    userEmail = Cypress.env('fieldTeamProfile').email,
    userPassword = Cypress.env('fieldTeamProfile').password
) => {
    cy.visit(ROUTES.login)
    login.fillEmail(userEmail)
    login.fillPasssword(userPassword)
    login.clickLogin()
})

Cypress.Commands.add('sessionLoginTeamField', (
    userEmail = Cypress.env('fieldTeamProfile').email,
    userPassword = Cypress.env('fieldTeamProfile').Password
) => {
    const login = () => cy.Login(userEmail, userPassword)
    cy.session(userEmail, login)
})

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

//Login para validação de permissão (viewLimitation.js)
Cypress.Commands.add('Login', (
    userEmail = Cypress.env('testViewLimitation').email,
    userPassword = Cypress.env('testViewLimitation').password
) => {
    cy.visit(ROUTES.login)
    login.fillEmail(userEmail)
    login.fillPasssword(userPassword)
    login.clickLogin()
})

Cypress.Commands.add('sessionLoginViewLimitation', (
    userEmail = Cypress.env('testViewLimitation').email,
    userPassword = Cypress.env('testViewLimitation').Password
) => {
    const login = () => cy.Login(userEmail, userPassword)
    cy.session(userEmail, login)
})