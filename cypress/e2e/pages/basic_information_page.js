/// <reference types="cypress"/>

export class BasicInformationPage {

    //Object Locators
    contact_info_edit_btn = 'Edit'
    contact_info_fname_txt = 'input[name="first_name"]'
    contact_info_mname_txt = 'input[name="middle_name"]'
    contact_info_lname_txt = 'input[name="last_name"]'
    contact_info_areacode_txt = '.sui-c-input-dropdown__value-container'
    contact_info_phonenum_txt = 'input[name="phone_number.line_number"]'
    contact_info_email_txt = 'input[name="email"]'
    contact_info_save_btn = 'Save'
    contact_info_cancel_btn = 'Cancel'
    contact_remove_focus_label = 'Contact Info'
    contact_sum_email = '.pb-3 > .col-auto > .sui-text-b3'
    exclamation_error = '.sui-flex > .sui-absolute'
    input_error = '.sui-c-input-error'
    drpdwn_invalid_entry_error = 'No options'

    location_edit_btn = ':nth-child(1) > :nth-child(1) > .col-lg-2 > .sui-rounded'
    location_country_txt = '.sui-c-input-dropdown__value-container'
    location_street_address_txt = 'input[name="streetAddress"]'
    location_city_state_txt = 'input[name="cityAndState"]'
    location_postal_code_txt = 'input[name="postalCode"]'
    location_remove_focus_label = 'Location'
    location_save_btn = 'Save'
    success_message1 = 'Success'
    success_message2 = 'Loation succesfully saved!'
    success_image = '.Toastify__toast-body > .sui-flex > :nth-child(1)'
    
    
    //Contact Info 
    clickContactEditBtn(){
        cy.contains(this.contact_info_edit_btn)
         .eq(0)
         .should('be.visible')
         .click()

    }

    updateFirstName(firstname){
        cy.get(this.contact_info_fname_txt)
         .clear()
         .type(firstname)
         .should('be.visible')
    }

    updateFirstNameAndLastWIthBlankValue(firstname){
        cy.get(this.contact_info_fname_txt)
         .clear()
        
         cy.get(this.contact_info_mname_txt)
         .clear()
    }

    updateMiddleName(middlename){
        cy.get(this.contact_info_mname_txt)
         .clear()
         .type(middlename)
         .should('be.visible')
    }

    updateLastName(lastname){
        cy.get(this.contact_info_lname_txt)
         .clear()
         .type(lastname)
         .should('be.visible')
    }

    updateAreaCode(areacode){
        cy.get(this.contact_info_areacode_txt)
        .type(areacode)
        .should('be.visible')
    }

    updatePhoneNumber(phonenumber){
        cy.get(this.contact_info_phonenum_txt)
         .clear()
         .type(phonenumber)
         .should('be.visible')
    }

    clickContactSaveBtn(){
        cy.contains(this.contact_info_save_btn)
         .click()
         .should('be.visible')
    }

    clickContactBtn(button){
        cy.contains(button)
         .click()

    }

    removeContactFocusByClickingLabel(){
        cy.contains(this.contact_remove_focus_label)
         .click()
         .should('be.visible')
    }

    checkEmailIfDisabled(emailaddress){
        cy.get(this.contact_info_email_txt)
         .should('have.value', emailaddress)
         .should('be.disabled')
    }

    checkContactSummaryInfo(fullname, emailaddress, fullphonenumber){

        cy.contains(fullname)

        cy.get(this.contact_sum_email)
          .should('have.text', emailaddress)

        cy.contains(fullphonenumber)

    }

    
    //Location
    clickLocEditBtn(){
        cy.get(this.location_edit_btn)
         .should('be.visible')
         .click()
 
    }

    updateCountry(country){
        cy.get(this.location_country_txt)
         .type(country+'{enter}')
         .should('be.visible')
    }

    updateStreetAdress(streetAddress){
        cy.get(this.location_street_address_txt)
         .clear()
         .type(streetAddress)
         .should('be.visible')
    }

    updateCityState(city, citystate){
        cy.get(this.location_city_state_txt)
         .click('bottom')
         .wait(2000)
         .clear()
         .wait(5000)
         .type(city)
         .wait(15000)   

        cy.contains(citystate)
         .click()
         .wait(10000)

    
        cy.get('.userprofile-page').find(this.location_city_state_txt).invoke('val').as('name')

        cy.get('@name').then((name) => {
            if (name != citystate){
                cy.get(this.location_city_state_txt)
                 .click('bottom')
                 .clear()
                 .wait(5000)
                 .type(city)
                 .wait(15000) 

                 cy.contains(citystate)
                 .click()
                 .wait(10000)
            }
        })

    }

    updateCityOnly(city){
        cy.get(this.location_city_state_txt)
         .click('bottom')
         .clear()
         .type(city)
         .should('be.visible')      

    }
    
    updatePostalCode(postalcode){
        cy.get(this.location_postal_code_txt)
         .clear()
         .type(postalcode)
         .should('be.visible')
    }

    removeLocationFocusByClickingLabel(){
        cy.contains(this.location_remove_focus_label)
         .click()
         .should('be.visible')
    }

    clickLocationSaveBtn(){
        cy.contains(this.location_save_btn)
         .should('be.visible')
         .click(20000)
    }

    checkLocationSummaryInfo(address, citystate, postalcode, country, timezone){

        cy.contains(address)
        cy.contains(citystate)
        cy.contains(postalcode)
        cy.contains(country)
        cy.contains(timezone)

    }

    checkSuccessfulPopup(){
        cy.contains(success_message1)
        cy.contains(success_message2)
        cy.get(success_image)
         .should('be.visible')
    }

    clickOnLanguagesLink(){
        cy.contains('Languages')
         .click(3000)
    }


    //generic
    checkErrorMessage(error){
        cy.contains(error)
        cy.get(this.input_error)
         .should('be.visible')
        cy.get(this.exclamation_error)
         .should('be.visible')
    }


    checkErrorPhoneMessage(error){
        cy.contains(error)
        cy.get(this.input_error)
         .should('be.visible')
    }

    checkErrorMessageNotVisible(error){
        cy.contains(error)
         .should('not.exist')
        cy.get(this.input_error)
         .should('not.exist')
        cy.get(this.exclamation_error)
         .should('not.exist')
    }


    checkErrorMessageWithoutExclamiation(error){
        cy.contains(error)
    }


}