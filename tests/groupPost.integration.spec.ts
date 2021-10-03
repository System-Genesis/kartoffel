
import * as supertest from 'supertest';
import * as http from 'http';
import { emptyDB } from '../tests/seedUtils';

const request = supertest('localhost:7040'); //supertest hits gate app

beforeAll(async () => {

    try {
        console.log('before all start')
    } catch (err) {}

    
});
afterAll(async () => {
    console.log('finished all')
});


const group = { name: "nike", source: 'ES'}
describe('POST Group ', () => {
    it('create a VALID group ', (done) => {
        request
            .post(`/api/groups`)
            .send(
                group
            )
            .expect(200)
            .end(async (err, res) => {
                if (err) {
                    
                    throw done(err);
                }
                expect(Object.keys(res.body).length === 1)
                expect(res.body._id).toBeTruthy()
                return done();
            });
    });
});

