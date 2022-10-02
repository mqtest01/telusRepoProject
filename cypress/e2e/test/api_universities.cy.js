/// <reference types="cypress"/>

describe('Test Suite - Search for Universities', function() {
  
    it('TC - Searh By Country Name', () => { 
        
        cy.wrap(["philippines", "united states", "zimbabwe"])
            .should('be.an', 'array')
            .and('not.empty')
            .each((country_name) => {
                cy.readFile('./cypress/fixtures/api_country_'+country_name+'.json').then((apiData) => {
                    cy.request('http://universities.hipolabs.com/search?country='+country_name).then((data) => {
                        expect(data.status).to.eq(200)
                        expect(data).to.have.property('headers')
                        expect(data.headers).to.have.property('content-type').include('application/json')
                        expect(data).to.have.property('duration')
                        expect(data.body).deep.equal(apiData)
                    })
                })
            })
    })

    it('TC - Searh By University Name', function() { 

        cy.wrap(["Institut Supérieure d'Electronique de Paris", "University of the East, Manila", "Universidad de La Frontera"])
            .should('be.an', 'array')
            .and('not.empty')
            .each((university_name) => {
                cy.readFile('./cypress/fixtures/api_name_'+university_name+'.json').then((apiData) => {
                    cy.request('http://universities.hipolabs.com/search?name='+university_name).then((data) => {
                        expect(data.status).to.eq(200)
                        expect(data).to.have.property('headers')
                        expect(data.headers).to.have.property('content-type').include('application/json')
                        expect(data).to.have.property('duration')
                        expect(data.body).deep.equal(apiData)
                    })
                })
            })
    })
   
    it('TC - Search By Combining Name and Country', function() { 

        cy.wrap(["name=Middle East Technical University&country=Turkey", "name=Potti Sreeramulu Telugu University&country=India"])
            .should('be.an', 'array')
            .and('not.empty')
            .each((name_country) => {
                    if (name_country == "name=Middle East Technical University&country=Turkey"){
                        cy.readFile('./cypress/fixtures/api_data_middle_turkey.json').then((apiData) => {
                            cy.request('http://universities.hipolabs.com/search?'+name_country).then((data) => {
                                expect(data.status).to.eq(200)
                                expect(data).to.have.property('headers')
                                expect(data.headers).to.have.property('content-type').include('application/json')
                                expect(data).to.have.property('duration')
                                expect(data.body).deep.equal(apiData)
                            })
                        })
                    }else if (name_country == "name=Potti Sreeramulu Telugu University&country=India"){
                        cy.readFile('./cypress/fixtures/api_data_potti_india.json').then((apiData) => {
                            cy.request('http://universities.hipolabs.com/search?'+name_country).then((data) => {
                                expect(data.status).to.eq(200)
                                expect(data).to.have.property('headers')
                                expect(data.headers).to.have.property('content-type').include('application/json')
                                expect(data).to.have.property('duration')
                                expect(data.body).deep.equal(apiData)
                            })
                        })
                    }  
            })
    })

    it('TC - Searh By Name Keyword Only and Country', function() { 

        cy.wrap(["name=Middle&country=Turkey", "name=Potti&country=India"])
        .should('be.an', 'array')
        .and('not.empty')
        .each((name_country) => {
            if (name_country == "name=Middle&country=Turkey"){
                cy.readFile('./cypress/fixtures/api_data_middle_turkey.json').then((apiData) => {
                    cy.request('http://universities.hipolabs.com/search?'+name_country).then((data) => {
                        expect(data.status).to.eq(200)
                        expect(data).to.have.property('headers')
                        expect(data.headers).to.have.property('content-type').include('application/json')
                        expect(data).to.have.property('duration')
                        expect(data.body).deep.equal(apiData)
                    })
                })
            }else if (name_country == "name=Potti&country=India"){
                cy.readFile('./cypress/fixtures/api_data_potti_india.json').then((apiData) => {
                    cy.request('http://universities.hipolabs.com/search?'+name_country).then((data) => {
                        expect(data.status).to.eq(200)
                        expect(data).to.have.property('headers')
                        expect(data.headers).to.have.property('content-type').include('application/json')
                        expect(data).to.have.property('duration')
                        expect(data.body).deep.equal(apiData)
                    })
                })
            }  
        })
    })

    it('TC - Searh By Special Charcters', function() { 

        cy.wrap(["name=@^?`$", "country=)+~]"])
        .should('be.an', 'array')
        .and('not.empty')
        .each((name_country_special) => {
            cy.readFile('./cypress/fixtures/api_data_special_none.json').then((apiData) => {
                cy.request('http://universities.hipolabs.com/search?'+name_country_special).then((data) => {
                    expect(data.status).to.eq(200)
                    expect(data).to.have.property('headers')
                    expect(data.headers).to.have.property('content-type').include('application/json')
                    expect(data).to.have.property('duration')
                    expect(data.body).deep.equal(apiData)
                })
            })
        })

    })

    it('TC - Searh By Non Exising Name Or Country', function() { 

        cy.wrap(["name=Wano", "country=lalaland"])
        .should('be.an', 'array')
        .and('not.empty')
        .each((name_none) => {
            cy.readFile('./cypress/fixtures/api_data_special_none.json').then((apiData) => {
                cy.request('http://universities.hipolabs.com/search?name='+name_none).then((data) => {
                    expect(data.status).to.eq(200)
                    expect(data).to.have.property('headers')
                    expect(data.headers).to.have.property('content-type').include('application/json')
                    expect(data).to.have.property('duration')
                    expect(data.body).deep.equal(apiData)
                })
            })
        })

    })

    it('TC - Searh By Blank Value In The Name Or Country', function() { 

        cy.wrap(["name=", "country="])
        .should('be.an', 'array')
        .and('not.empty')
        .each((name_none) => {
            cy.readFile('./cypress/fixtures/api_data_all.json').then((apiData) => {
                cy.request('http://universities.hipolabs.com/search?'+name_none).then((data) => {
                    expect(data.status).to.eq(200)
                    expect(data).to.have.property('headers')
                    expect(data.headers).to.have.property('content-type').include('application/json')
                    expect(data).to.have.property('duration')
                    expect(data.body).deep.equal(apiData)
                })
            })
        })
    })

})