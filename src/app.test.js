const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./app');

// Since db connection takes more than 5000ms which is the default time, increase it
jest.setTimeout(30000);

describe('POST /api/v1/records', () => {

    describe('given startDate, endDate, minCount and maxCount in a correct form', () => {
        test('response should have 3 fields: code: 0, msg: "Success", records', async () => {
            const response = await request(app).post('/api/v1/records').send({
                startDate: '2016-12-31',
                endDate: '2021-02-11',
                minCount: 1,
                maxCount: 1000
            });
            expect(response.body.code).toBeDefined();
            expect(response.body.code).toBe(0);
            expect(response.body.msg).toBeDefined();
            expect(response.body.msg).toBe('Success');
            expect(response.body.records).toBeDefined();
        })
    })

    describe('when startDate, endDate, minCount and maxCount is missing or in wrong form', () => {
        test('response should have 2 fields: code: -1, msg. And also status code set to 400', async () => {
            const bodyData = [
                {startDate: '2016.12.31', endDate: '2021-02-11', minCount: 1, maxCount: 1000},
                {startDate: '2016-12-31', endDate: '2021.02.11', minCount: 1, maxCount: 1000},
                {endDate: '2021-02-11', minCount: 1, maxCount: 1000},
                {startDate: '2016-12-31', minCount: 1, maxCount: 1000},
                {startDate: '2016-12-31', endDate: '2021-02-11', maxCount: 1000},
                {startDate: '2016-12-31', endDate: '2021-02-11', minCount: 1},
                {}
            ];
            for(const body of bodyData) {
                const response = await request(app).post('/api/v1/records').send(body);
                expect(response.body.code).toBeDefined();
                expect(response.body.code).toBe(-1);
                expect(response.body.msg).toBeDefined();
                expect(response.statusCode).toBe(400);
            }
        })
    })

    // After tests using db, close db connection so that Jest exits after test run has completed
    afterAll(async () => {
        await mongoose.connection.close();
    })
})

describe('Request to undefined routes', () => {

    describe('when request method is the same and endpoint starts the same with the defined route', () => {
        test('response should have 2 fields: code: -1, msg. And also status code set to 404', async () => {
            const response = await request(app).post('/api/v1/recordss').send();
            expect(response.body.code).toBeDefined();
            expect(response.body.code).toBe(-1);
            expect(response.body.msg).toBeDefined();
            expect(response.statusCode).toBe(404);
        })
    })

    describe('when endpoint is totally different', () => {
        test('response should have 2 fields: code: -1, msg. And also status code set to 404', async () => {
            const response = await request(app).post('/records').send();
            expect(response.body.code).toBeDefined();
            expect(response.body.code).toBe(-1);
            expect(response.body.msg).toBeDefined();
            expect(response.statusCode).toBe(404);
        })
    })

})

