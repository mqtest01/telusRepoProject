export class DashboardPage{

    //Object Locators
    dashboard_profile_icon = 'MQ'
    dashboard_own_Profile = 'My Profile'
    dashboard_signout = 'Sign Out'

    clickProfileIcon(){
        cy.contains(this.dashboard_profile_icon)
         .click()
         .should('be.visible')
    }
    
    clickMyProfileLink(){
        cy.contains(this.dashboard_own_Profile)
         .click()
         .should('be.visible')
    }

    clickSignOut(){
        this.clickProfileIcon()
        cy.contains(this.dashboard_signout)
         .click()
        cy.wait(3000)
    }

    checkLandingPage(landingpage){
        cy.url().should('eq', landingpage).wait(5000)
    }
    

}