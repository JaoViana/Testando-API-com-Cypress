

function allPeople() {
    // cy.request - cliente http
    return cy.request({
        method: "GET", 
        url: "people/3/",
        failOnStatusCode: false,
        //Quando uma requisião não da 200, ele a passa.
    })
}
export { allPeople };