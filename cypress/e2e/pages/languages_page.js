export class LanguagesPage{
    
    //Object locators
    primary_edit_btn = '.col-auto > .row'
    secondary_edit_btn = ':nth-child(1) > :nth-child(1) > :nth-child(2) > .col-lg-12 > .wrapper-update-section > .edit-div'
    secondary_delete_btn = ':nth-child(1) > :nth-child(1) > :nth-child(2) > .col-lg-12 > .wrapper-update-section > .trash-div > .svg-inline--fa > path'
    //:nth-child(1) > .sc-dlnjwi > .row > .col-lg-12 > .sui-c-input-dropdown-container > .sui-c-input-dropdown__control > .sui-c-input-dropdown__value-container > .sui-c-input-dropdown__single-value')
    //primary_language_txt = ':nth-child(1) > .sc-dlnjwi > .row > .col-lg-12 > .sui-c-input-dropdown-container > .sui-c-input-dropdown__control > .sui-c-input-dropdown__value-container > .sui-c-input-dropdown__single-value'
    primary_language_txt = ':nth-child(1) > .sc-dlnjwi > .row > .col-lg-12 > .sui-c-input-dropdown-container > .sui-c-input-dropdown__control > .sui-c-input-dropdown__value-container > .sui-c-input-dropdown__single-value'
    primart_prof_level = '.figma-input-field-margin > .sc-dlnjwi > .row > .col-lg-12'
    primary_language_save_btn = 'Save'
    other_language_add_btn = 'Add'
    other_language_save_btn = 'Save'
    secondary_language_txt =':nth-child(1) > .sc-dlnjwi > .row > .col-lg-12 > .sui-c-input-dropdown-container > .sui-c-input-dropdown__control > .sui-c-input-dropdown__value-container'
    secondary_prof_level = '.figma-input-field-margin > .sc-dlnjwi > .row > .col-lg-12 > .sui-c-input-dropdown-container > .sui-c-input-dropdown__control > .sui-c-input-dropdown__value-container'
    tertiary_language_txt = ':nth-child(1) > .sc-dlnjwi > .row > .col-lg-12 > .sui-c-input-dropdown-container > .sui-c-input-dropdown__control > .sui-c-input-dropdown__value-container'
    tertiary_prof_level = '.figma-input-field-margin > .sc-dlnjwi > .row > .col-lg-12'
    language_remove_focus_label = 'Other languages'
    
    
    //methods

    clickPrimaryEditBtn(){
        cy.get(this.primary_edit_btn)
         .click()

    }

    updatePrimaryLanguage(primary){
        cy.get(this.primary_language_txt)
         .click()
         .type(primary+'{enter}')
        //  .type('{enter}')

    }

    checkPrimaryProfLevel(){
        cy.get(primart_prof_level)
         .should('be.disabled')
    }

    clickPrimarySaveBtn(proflevel){
        cy.contains(this.primary_language_save_btn)
         .click()
         .should('be.visible')
         .should('have.text', c)
    }

    checkPrimaryLanguageSummary(primarylanguage, primaryproficiency){
        cy.contains(primarylanguage)
        cy.contains(primaryproficiency)
    }

    clickOtherLanguagesAddBtn(){
        cy.contains(this.other_language_add_btn)
         .should('be.visible')
         .click(3000)
    }

    updateSecondaryLanguage(secondary){
        cy.get(this.secondary_language_txt)
         .click(3000)
         .type(secondary)
         .type('{enter}')
        // cy.wait(3000)
    }

    updateSecondaryProfiencyLevel(secondaryproflevel){
        cy.get(this.secondary_prof_level)
         .click(3000)
         .type(secondaryproflevel)
         .type('{enter}')
        // cy.wait(3000)
    }

    updateTertiaryLanguage(tertiary){
        cy.get(this.tertiary_language_txt)
         .click()
         .type(tertiary)
         .type('{enter}')
    }

    updateTertiaryProfiencyLevel(tertiaryproflevel){
        cy.get(this.tertiary_prof_level)
         .click()
         .type(tertiaryproflevel)
         .type('{enter}')
    }

    clickOtherLanguagesSaveBtn(){
        cy.contains(this.other_language_save_btn)
         .should('be.visible')
         .click(5000)
    }

    removeLanguageFocusByClickingLabel(){
        cy.contains(this.language_remove_focus_label)
         .click()
         .should('be.visible')
    }

    checkOtherLanguageSummary(secondarylanguage, secondaryproficiency, tertiarylanguage, tertiaryproficiency){
        cy.contains(secondarylanguage)
        cy.contains(secondaryproficiency)
        cy.contains(tertiarylanguage)
        cy.contains(tertiaryproficiency)
    }

    //generic
    clickOnLabel(labelname){
        cy.contains(labelname)
         .click(3000)
    }

    clickOnLanguageButton(buttonname){
        cy.contains(buttonname)
         .click()
    }

    clickOnSecondaryEditBtn(){
        cy.get(this.secondary_edit_btn)
         .click(3000)
    }


}