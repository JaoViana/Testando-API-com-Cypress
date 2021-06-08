import * as GETStarwars from '../requests/GETStarwars.request'
describe('GET People', () => {
    it('Listar todos personagens e infos', () => {
        GETStarwars.allPeople().should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.not.null
        })
    })
})