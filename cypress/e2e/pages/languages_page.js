export class LanguagesPage{
    
    //Object locators
    primary_edit_btn = '.col-auto > .row'
    //:nth-child(1) > .sc-dlnjwi > .row > .col-lg-12 > .sui-c-input-dropdown-container > .sui-c-input-dropdown__control > .sui-c-input-dropdown__value-container > .sui-c-input-dropdown__single-value')
    //primary_language_txt = ':nth-child(1) > .sc-dlnjwi > .row > .col-lg-12 > .sui-c-input-dropdown-container > .sui-c-input-dropdown__control > .sui-c-input-dropdown__value-container > .sui-c-input-dropdown__single-value'
    primary_language_txt = ':nth-child(1) > .sc-dlnjwi > .row > .col-lg-12 > .sui-c-input-dropdown-container > .sui-c-input-dropdown__control > .sui-c-input-dropdown__value-container > .sui-c-input-dropdown__single-value'
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

    clickPrimarySaveBtn(){
        cy.contains(this.primary_language_save_btn)
         .click()
         .should('be.visible')
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
         .click()
         .type(secondary)
         .type('{enter}')
    }

    updateSecondaryProfiencyLevel(secondaryproflevel){
        cy.get(this.secondary_prof_level)
         .click()
         .type(secondaryproflevel)
         .type('{enter}')
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



}