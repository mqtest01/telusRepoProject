/// <reference types="cypress"/>

import { LoginPage } from "../pages/login_page"
import { DashboardPage } from "../pages/dashboard_page"
import { BasicInformationPage } from "../pages/basic_information_page"
import { LanguagesPage } from "../pages/languages_page"

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const basicInformationPage = new BasicInformationPage()
const languagesPage = new LanguagesPage()

describe('Check basic information and language pages can be updated', function() {
   
  beforeEach(function () {
    cy.visit('cmp/')
  })

  it('Check if User is able to succesfully update basic information and language pages using valid inputs', function(){

    //access test data
    cy.fixture('valid_test_data').then((validData) => {

      //Login using valid credentials
      loginPage.enterEmailAddress(validData.email)
      loginPage.clickContinue()
      loginPage.enterPassword(validData.password)
      loginPage.clickSignIn()

      //landed on the dashboard page
      dashboardPage.checkLandingPage('https://www.telusinternational.ai/cmp/contributor/dashboard')

      //Click profile icon and My profile link
      dashboardPage.clickProfileIcon()
      dashboardPage.clickMyProfileLink()
      dashboardPage.clickProfileIcon() // need to remove the popup so that the script can continue

      //landed on the basic info page
      dashboardPage.checkLandingPage('https://www.telusinternational.ai/cmp/contributor/userprofile/basic-info')

      //Update Contact Information
      basicInformationPage.clickContactEditBtn()
      cy.wait(3000)
      basicInformationPage.updateFirstName(validData.basicinfo_first_name)
      basicInformationPage.removeContactFocusByClickingLabel()
      basicInformationPage.updateMiddleName(validData.basicinfo_middle_name)
      basicInformationPage.removeContactFocusByClickingLabel()
      basicInformationPage.updateLastName(validData.basicinfo_last_name)
      basicInformationPage.removeContactFocusByClickingLabel()
      basicInformationPage.updateAreaCode(validData.basicinfo_area_code)
      basicInformationPage.removeContactFocusByClickingLabel()
      basicInformationPage.updatePhoneNumber(validData.basicinfo_phone_number)
      basicInformationPage.removeContactFocusByClickingLabel()

      //check if email contains user email and disabled by default
      basicInformationPage.checkEmailIfDisabled(validData.email)

      //save changes
      basicInformationPage.clickContactSaveBtn()

      //Check Contact Info Summary
      const fullName = `${validData.basicinfo_first_name} ${validData.basicinfo_middle_name} ${validData.basicinfo_last_name}`
      const fullPhoneNumber = `${validData.basicinfo_area_code}${validData.basicinfo_phone_number}`

      basicInformationPage.checkContactSummaryInfo(fullName, validData.email, fullPhoneNumber)

      //update Location
      basicInformationPage.clickLocEditBtn()
      cy.wait(3000)
      basicInformationPage.updateCountry(validData.basicinfo_country)
      basicInformationPage.removeLocationFocusByClickingLabel()
      basicInformationPage.updateStreetAdress(validData.basicinfo_street_adr)
      basicInformationPage.removeLocationFocusByClickingLabel()
      basicInformationPage.updateCityState(validData.basicinfo_city, validData.basicinfo_city_state)
      basicInformationPage.removeLocationFocusByClickingLabel()
      cy.wait(3000)
      basicInformationPage.removeLocationFocusByClickingLabel()
      basicInformationPage.updatePostalCode(validData.basicinfo_postal_code)
      basicInformationPage.removeLocationFocusByClickingLabel()

      //save changes
      basicInformationPage.clickLocationSaveBtn()

      //check if success pop-up has shown
      basicInformationPage.checkSuccessfulPopup

      //check location summary
      basicInformationPage.checkLocationSummaryInfo(validData.basicinfo_street_adr, 
        validData.basicinfo_summary_city_state, validData.basicinfo_postal_code,
        validData.basicinfo_country, validData.basicinfo_timezone)

      //Special note: A bug was found the city state format is not the same from the selected one versus the one that is shown in the Location summary.
      

      //Update languages
      basicInformationPage.clickOnLanguagesLink()

      //landed on the languages page
      dashboardPage.checkLandingPage('https://www.telusinternational.ai/cmp/contributor/userprofile/languages')
     
      //Update Primary language
      languagesPage.clickPrimaryEditBtn()
      languagesPage.updatePrimaryLanguage(validData.languages_primary)
      languagesPage.checkLabel(validData.languages_prof_lvl)
      languagesPage.clickOnLanguageBtn("Save")
      // languagesPage.clickPrimarySaveBtn()

      // Primary language summary
      languagesPage.checkPrimaryLanguageSummary(validData.languages_primary, validData.languages_prof_lvl)

      //Update other languages
      languagesPage.clickOtherLanguagesAddBtn()
      cy.wait(3000)
      languagesPage.updateSecondaryLanguage(validData.other_languages_secondary)
      languagesPage.updateSecondaryProfiencyLevel(validData.other_languages_secondary_prof_lvl)
      languagesPage.clickOtherLanguagesSaveBtn()

      cy.wait(3000)
      languagesPage.clickOtherLanguagesAddBtn()
      languagesPage.updateTertiaryLanguage(validData.other_languages_tertiary)
      languagesPage.updateTertiaryProfiencyLevel(validData.other_languages_tertiary_prof_lvl)
      languagesPage.clickOtherLanguagesSaveBtn()

      //Other languages summary
      languagesPage.checkOtherLanguageSummary(validData.other_languages_secondary, 
        validData.other_languages_secondary_prof_lvl, validData.other_languages_tertiary,
        validData.other_languages_tertiary_prof_lvl)

      //Sign out
      dashboardPage.clickSignOut()

      //landed on the login page
      dashboardPage.checkLandingPage('https://www.telusinternational.ai/cmp/login')
    
    }) 
  })

  it('Check if User is not able to update the basic information and language pages by providing invalid inputs', function(){
    
    // Access the test data
    cy.fixture('invalid_test_data').then((invalidData) => {

      //Login using valid credentials
      loginPage.enterEmailAddress(invalidData.email)
      loginPage.clickContinue()
      loginPage.enterPassword(invalidData.password)
      loginPage.clickSignIn()

      //Click profile icon and My profile link
      dashboardPage.clickProfileIcon()
      dashboardPage.clickMyProfileLink()
      dashboardPage.clickProfileIcon() // need to remove the popup so that the script can continue

      cy.fixture('error_messages').then((errorMessage) => {

         //Click Contact Information
         basicInformationPage.clickContactEditBtn()
         cy.wait(3000)

        //update first name with invalid input
        basicInformationPage.updateFirstName(invalidData.basicinfo_first_name)
        basicInformationPage.removeContactFocusByClickingLabel()
        basicInformationPage.checkErrorMessage('First Name ' + errorMessage.err_special_name)

        //update middle name with invalid input
        basicInformationPage.updateMiddleName(invalidData.basicinfo_middle_name)
        basicInformationPage.removeContactFocusByClickingLabel()
        basicInformationPage.checkErrorMessage('Middle Name ' + errorMessage.err_special_name)

        //update last name with invalid input
        basicInformationPage.updateLastName(invalidData.basicinfo_last_name)
        basicInformationPage.removeContactFocusByClickingLabel()
        basicInformationPage.checkErrorMessage('Last Name ' + errorMessage.err_special_name)

        //update phone number with invalid input
        basicInformationPage.updatePhoneNumber(invalidData.basicinfo_phone_number_alphanum)
        basicInformationPage.removeContactFocusByClickingLabel()
        basicInformationPage.checkErrorPhoneMessage(errorMessage.err_phone_format)

        basicInformationPage.updatePhoneNumber(invalidData.basicinfo_phone_number_greater_range)
        basicInformationPage.removeContactFocusByClickingLabel()
        basicInformationPage.checkErrorPhoneMessage(errorMessage.err_phone_number)

        //Cancel any changes
        basicInformationPage.clickContactBtn("Cancel")

        //Check if changes are not saved
        cy.fixture('valid_test_data').then((validData) =>{
        
          //Check Contact Info Summary
          const fullName = `${validData.basicinfo_first_name} ${validData.basicinfo_middle_name} ${validData.basicinfo_last_name}`
          const fullPhoneNumber = `${validData.basicinfo_area_code}${validData.basicinfo_phone_number}`

          basicInformationPage.checkContactSummaryInfo(fullName, validData.email, fullPhoneNumber)

        })
        
        //update Location
        basicInformationPage.clickLocEditBtn()

        basicInformationPage.updateCountry(invalidData.basicinfo_country)
        basicInformationPage.removeLocationFocusByClickingLabel()
        basicInformationPage.checkErrorMessageNotVisible('Country ' + errorMessage.err_special_name)

        basicInformationPage.updateStreetAdress(invalidData.basicinfo_street_adr)
        basicInformationPage.removeLocationFocusByClickingLabel()
        basicInformationPage.checkErrorMessageNotVisible('Country ' + errorMessage.err_special_name)

        basicInformationPage.updateCityOnly(invalidData.basicinfo_city)
        cy.wait(3000)
        basicInformationPage.removeLocationFocusByClickingLabel()
        basicInformationPage.checkErrorMessageWithoutExclamiation(errorMessage.err_city_state)

        //Special Note: City, State doesn't have any exclamation point and not highlighted in Red when invalid entry wa given

        basicInformationPage.updatePostalCode(invalidData.basicinfo_postal_code)
        basicInformationPage.removeLocationFocusByClickingLabel()
        basicInformationPage.checkErrorMessage(errorMessage.err_postal_code)

        //Cancel any changes
        basicInformationPage.clickContactBtn("Cancel")

        //Check if changes are not saved
        cy.fixture('valid_test_data').then((validData) =>{
        
          //Check Contact Info Summary
          basicInformationPage.checkLocationSummaryInfo(validData.basicinfo_street_adr, 
            validData.basicinfo_summary_city_state, validData.basicinfo_postal_code,
            validData.basicinfo_country, validData.basicinfo_timezone)

        })

      //Update languages
      basicInformationPage.clickOnLanguagesLink()
      languagesPage.clickOnLabel("Primary language")
   
      //Update Primary language
      cy.wait(3000)
      languagesPage.clickPrimaryEditBtn()
      languagesPage.updatePrimaryLanguage(invalidData.languages_primary)
      languagesPage.clickOnLabel("Primary language")
      basicInformationPage.checkErrorMessageNotVisible('Language ' + errorMessage.err_special_name)
      languagesPage.clickOnLanguageBtn("Cancel")

      // Primary language summary
      cy.fixture('valid_test_data').then((validData) => {
        languagesPage.checkPrimaryLanguageSummary(validData.languages_primary, validData.languages_prof_lvl)
      })
      
      // //Update other languages
      languagesPage.clickOnSecondaryEditBtn()
      languagesPage.updateSecondaryLanguage(invalidData.other_languages_secondary)
      basicInformationPage.checkErrorMessageNotVisible('Language ' + errorMessage.err_special_name)
      languagesPage.updateSecondaryProfiencyLevel(invalidData.other_languages_secondary_prof_lvl)
      languagesPage.clickOnLanguageBtn("Cancel")

      //Other languages summary
      cy.fixture('valid_test_data').then((validData) =>{
        languagesPage.checkOtherLanguageSummary(validData.other_languages_secondary, 
        validData.other_languages_secondary_prof_lvl, validData.other_languages_tertiary,
        validData.other_languages_tertiary_prof_lvl)
      })

      //Sign out
      dashboardPage.clickSignOut()

        
      })
      
    
    }) 
  })
  
  it('Check if the user can delete entries from the other languages', function(){
    
    //access test data
    cy.fixture('valid_test_data').then((validData) => {

      //Login using valid credentials
      loginPage.enterEmailAddress(validData.email)
      loginPage.clickContinue()
      loginPage.enterPassword(validData.password)
      loginPage.clickSignIn()

      //Click profile icon and My profile link
      dashboardPage.clickProfileIcon()
      dashboardPage.clickMyProfileLink()
      dashboardPage.clickProfileIcon() // need to remove the popup so that the script can continue

      //Update languages
      basicInformationPage.clickOnLanguagesLink()
      languagesPage.clickOnLabel("Primary language")

      //Check dialog box information
      languagesPage.clickOnDeleteBtn()
      languagesPage.checkDeleteConfirmMessage("Delete data")
      languagesPage.checkDeleteConfirmMessage("Are you sure you want to delete this information?")
      languagesPage.clickOnDialogNoBtn()

      //Delete the first entry
      languagesPage.clickOnDeleteBtn()
      languagesPage.clickOnDialogYesBtn()
      cy.wait(3000)


      //Check dialog box information
      languagesPage.clickOnDeleteBtn()
      languagesPage.checkDeleteConfirmMessage("Delete data")
      languagesPage.checkDeleteConfirmMessage("Are you sure you want to delete this information?")
      languagesPage.clickOnDialogNoBtn()

      //Delete the second entry
      languagesPage.clickOnDeleteBtn()
      languagesPage.clickOnDialogYesBtn()

      //Other languages summary
      languagesPage.checkLabelNotAvailable(validData.other_languages_secondary)
      languagesPage.checkLabelNotAvailable(validData.other_languages_secondary_prof_lvl)
      languagesPage.checkLabelNotAvailable(validData.other_languages_tertiary)
      languagesPage.checkLabelNotAvailable(validData.other_languages_tertiary_prof_lvl)

      //Sign out
      dashboardPage.clickSignOut()

    }) 



  })

  it('Check if User can update the same fields multiple times using valid inputs.', function(){
    
    //access test data
    cy.fixture('original_test_data').then((origData) => {

      //Login using valid credentials
      loginPage.enterEmailAddress(origData.email)
      loginPage.clickContinue()
      loginPage.enterPassword(origData.password)
      loginPage.clickSignIn()

      //landed on the dashboard page
      dashboardPage.checkLandingPage('https://www.telusinternational.ai/cmp/contributor/dashboard')

      //Click profile icon and My profile link
      dashboardPage.clickProfileIcon()
      dashboardPage.clickMyProfileLink()
      dashboardPage.clickProfileIcon() // need to remove the popup so that the script can continue

      //landed on the basic info page
      dashboardPage.checkLandingPage('https://www.telusinternational.ai/cmp/contributor/userprofile/basic-info')

      //Update Contact Information
      basicInformationPage.clickContactEditBtn()
      cy.wait(3000)
      basicInformationPage.updateFirstName(origData.basicinfo_first_name)
      basicInformationPage.removeContactFocusByClickingLabel()
      basicInformationPage.updateMiddleName(origData.basicinfo_middle_name)
      basicInformationPage.removeContactFocusByClickingLabel()
      basicInformationPage.updateLastName(origData.basicinfo_last_name)
      basicInformationPage.removeContactFocusByClickingLabel()
      basicInformationPage.updateAreaCode(origData.basicinfo_area_code)
      basicInformationPage.removeContactFocusByClickingLabel()
      basicInformationPage.updatePhoneNumber(origData.basicinfo_phone_number)
      basicInformationPage.removeContactFocusByClickingLabel()

      //check if email contains user email and disabled by default
      basicInformationPage.checkEmailIfDisabled(origData.email)

      //save changes
      basicInformationPage.clickContactSaveBtn()

      //Check Contact Info Summary
      const fullName = `${origData.basicinfo_first_name} ${origData.basicinfo_middle_name} ${origData.basicinfo_last_name}`
      const fullPhoneNumber = `${origData.basicinfo_area_code}${origData.basicinfo_phone_number}`

      basicInformationPage.checkContactSummaryInfo(fullName, origData.email, fullPhoneNumber)

      //update Location
      basicInformationPage.clickLocEditBtn()
      cy.wait(3000)
      basicInformationPage.updateCountry(origData.basicinfo_country)
      basicInformationPage.removeLocationFocusByClickingLabel()
      basicInformationPage.updateStreetAdress(origData.basicinfo_street_adr)
      basicInformationPage.removeLocationFocusByClickingLabel()
      basicInformationPage.updateCityState(origData.basicinfo_city, origData.basicinfo_city_state)
      basicInformationPage.removeLocationFocusByClickingLabel()
      basicInformationPage.updatePostalCode(origData.basicinfo_postal_code)
      basicInformationPage.removeLocationFocusByClickingLabel()

      //save changes
      basicInformationPage.clickLocationSaveBtn()

      //check if success pop-up has shown
      basicInformationPage.checkSuccessfulPopup

      //check location summary
      basicInformationPage.checkLocationSummaryInfo(origData.basicinfo_street_adr, 
        origData.basicinfo_summary_city_state, origData.basicinfo_postal_code,
        origData.basicinfo_country, origData.basicinfo_timezone)

      //Special note: A bug was found the city state format is not the same from the selected one versus the one that is shown in the Location summary.
      

      //Update languages
      basicInformationPage.clickOnLanguagesLink()

      //landed on the languages page
      dashboardPage.checkLandingPage('https://www.telusinternational.ai/cmp/contributor/userprofile/languages')
     
      //Update Primary language
      languagesPage.clickPrimaryEditBtn()
      languagesPage.updatePrimaryLanguage(origData.languages_primary)
      languagesPage.checkLabel(origData.languages_prof_lvl)
      //languagesPage.clickPrimarySaveBtn()
      languagesPage.clickOnLanguageBtn("Save")

      // Primary language summary
      languagesPage.checkPrimaryLanguageSummary(origData.languages_primary, origData.languages_prof_lvl)

      //Sign out
      dashboardPage.clickSignOut()

      // //landed on the login page
      // dashboardPage.checkLandingPage('https://prelive.telusinternational.ai/cmp/login')
    }) 

  })

})