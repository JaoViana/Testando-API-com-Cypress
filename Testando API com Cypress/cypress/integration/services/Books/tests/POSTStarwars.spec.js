import * as POSTStarwars from '../requests/GETStarwars.request'

describe('POST Name', () => {
    it('Adicionando um novo nome',() => {
        POSTStarwars.allPeople().should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq('R3-D3')
        })       
    })
})