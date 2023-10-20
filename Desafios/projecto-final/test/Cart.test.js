// carts.test.js
//@ts-check
import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest('http://localhost:8080');

describe('Carts API', () => {
  it('should get a list of user carts', (done) => {
    requester
      .get('/api/carts')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should add a product to the cart', (done) => {
    const productId = 'your-product-id'; // Reemplaza con un ID de producto válido

    requester
      .post(`/api/carts/${productId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        // Verifica que el producto se haya agregado al carrito si es necesario
        done();
      });
  });


});
