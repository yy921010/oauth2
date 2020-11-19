const app = require('./app')
const request  = require('supertest')

test('test url /', async () => {
    const response = await request(app.callback()).get('/');
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toMatchObject({
        version: '1.0.0',
        baseUrl: '/oauth',
        postUrl: 'https://oauth.lemonnard.com'
    });
});