import supertest from 'supertest';
import app from '../index';
import sizing from '../resize';
const request = supertest(app);

describe('Test endpoint responses', () => {
    it('gets the test endpoint', async () => {
        const response = await request.get('/api?name=fjord&width=100&height=100');
        expect(response.status).toBe(200);
    });
});

describe('Image Process functionality test', () => {
    it('Image resize', () => {
        expect(sizing('fjord', 50, 199)).toBeTruthy();
    });
});
