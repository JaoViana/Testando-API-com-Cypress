const payloadsAddName = require('../payloads/add-people.json')

function addPeople () {
    return crypto.request({
        method: 'POST',
        url:"people/3/",
        failOnStatusCode: false,
        body: payloadsAddName
    })
}
export { addPeople }