export class LoginPage{

    //Object locators
    login_email_txt = 'input[name="email"]'
    login_password_txt = 'input[name="password"]'
    login_continue_btn = 'Continue'
    login_signin_btn = 'Sign in'
    login_try_message = 'Try again'
    login_invalid_message = 'The email or password you entered is incorrect. Please try again.'

    //methods
    enterEmailAddress(emailAddress){
        cy.get(this.login_email_txt)
         .type(emailAddress)
         .should('be.visible')
    }

    enterPassword(password){
        cy.get(this.login_password_txt)
         .type(password)
         .should('be.visible')
    }

    clickContinue(){
        cy.contains(this.login_continue_btn)
         .click()
         .should('be.visible')

    }

    clickSignIn(){
        cy.contains(this.login_signin_btn)
         .click()
         .should('be.visible')
    }

    checkMessage(message){
        cy.contains(message)
    }

    completeLogin(emailAddress, password){
        this.enterEmailAddress(emailAddress)
        this.clickContinue()
        this.enterPassword(password)
        this.clickSignIn()
    }

    emptyEmail(){
        cy.get(this.login_email_txt)
         .clear()
    }

    emptyPassword(){
        cy.get(this.login_password_txt)
         .clear()
    }

    reloadThePage(){
        cy.reload()
    }

}