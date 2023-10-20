// sessions.test.js
import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest('http://localhost:8080');

describe('Sessions API', () => {
  it('should log in a user', (done) => {
    const credentials = {
      email: 'test@example.com',
      password: 'testpassword',
    };

    requester
      .post('/api/sessions/login')
      .send(credentials)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        // Verifica que el usuario esté autenticado si es necesario
        done();
      });
  });

  // Agrega más pruebas según tus necesidades
});
