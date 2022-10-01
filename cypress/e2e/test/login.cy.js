/// <reference types="cypress"/>

import { LoginPage } from "../pages/login_page"
import { DashboardPage } from "../pages/dashboard_page"

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()

describe('Check login and authentication', function() {

    beforeEach(function () {
        cy.visit('cmp/')
      })

    it('Check if the user is able to login using valid credentials', function() {
        
        cy.fixture('login_test_data').then((loginData) => {

            //login
            loginPage.completeLogin(loginData.valid_email, loginData.valid_password)

            //landed on the dashboard page
            dashboardPage.checkLandingPage('https://www.telusinternational.ai/cmp/contributor/dashboard')

            //Sign out
            dashboardPage.clickSignOut()
        })

    })

    it('Check if the user is not able to login using invalid credentials', function() {

        cy.fixture('login_test_data').then((loginData) => {

            //login using invalid email and valid password
            loginPage.completeLogin(loginData.invalid_email, loginData.valid_password)

            //check error message
            cy.fixture('error_messages').then((errorMessage) => {
                loginPage.checkMessage(errorMessage.invalid_email_try)
                loginPage.checkMessage(errorMessage.invalid_email_credentials)               
            })

            loginPage.reloadThePage()

            //login using valid email and invalid password
            loginPage.completeLogin(loginData.valid_email, loginData.invalid_password)

            //check error message
            cy.fixture('error_messages').then((errorMessage) => {
                loginPage.checkMessage(errorMessage.invalid_email_try)
                loginPage.checkMessage(errorMessage.invalid_email_credentials)               
            })

        })

    })

    it('Check if the user is not able to login using blank credentials', function() {

        cy.fixture('login_test_data').then((loginData) => {

            //login with blank email
            loginPage.emptyEmail()
            loginPage.clickContinue()

             //check error message           
            cy.fixture('error_messages').then((errorMessage) => {
                loginPage.checkMessage(errorMessage.blank_email)
            })

            //login with valid email but empty password
            loginPage.enterEmailAddress(loginData.valid_email)
            loginPage.clickContinue()
            loginPage.emptyPassword()
            loginPage.clickSignIn()

            //check error message          
            cy.fixture('error_messages').then((errorMessage) => {
                loginPage.checkMessage(errorMessage.blank_password)
            })

        })
   
    })

})