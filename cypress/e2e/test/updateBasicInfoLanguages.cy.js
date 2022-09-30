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


    //Login using valid credentials
    cy.fixture('valid_test_data').then((validData) => {

      loginPage.enterEmailAddress(validData.email)
      loginPage.clickContinue()
      loginPage.enterPassword(validData.password)
      loginPage.clickSignIn()

      //landed to the correct page
      cy.url().should('eq', 'https://www.telusinternational.ai/cmp/contributor/dashboard')

      //Click profile icon and My profile link
      dashboardPage.clickProfileIcon()
      dashboardPage.clickMyProfileLink()
      dashboardPage.clickProfileIcon() // need to remove the popup so that the script can continue

      //Update Contact Information
      basicInformationPage.clickContactEditBtn()
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
      basicInformationPage.updateCountry(validData.basicinfo_country)
      basicInformationPage.removeLocationFocusByClickingLabel()
      basicInformationPage.updateStreetAdress(validData.basicinfo_street_adr)
      basicInformationPage.removeLocationFocusByClickingLabel()
      basicInformationPage.updateCityState(validData.basicinfo_city, validData.basicinfo_city_state)
      basicInformationPage.removeLocationFocusByClickingLabel()
      basicInformationPage.updatePostalCode(validData.basicinfo_postal_code)
      basicInformationPage.removeLocationFocusByClickingLabel()

      //save changes
      basicInformationPage.clickLocationSaveBtn()

      //check location summary
      basicInformationPage.checkLocationSummaryInfo(validData.basicinfo_street_adr, 
        validData.basicinfo_city_state, validData.basicinfo_postal_code,
        validData.basicinfo_country, validData.basicinfo_timezone)

      //Special note: A bug was found the city state format is not the same from the selected one versus the one that is shown in the Location summary.
      

      //Update languages
      basicInformationPage.clickOnLanguagesLink()
      
      //Update Primary language
      languagesPage.clickPrimaryEditBtn()
      languagesPage.updatePrimaryLanguage(validData.languages_primary)
      languagesPage.clickPrimarySaveBtn()

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

      //Sig out
      dashboardPage.clickSignOut()
    


  

      






    })

    it('Check if User is not able to update the basic information and language pages by providing invalid inputs', function(){})
    it('Check if the user can delete entries from the other languages', function(){})
    it('Check if User can update the same fields multiple times using valid inputs.', function(){})


  })


})