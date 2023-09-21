// products.test.js
//@ts-check

import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest('http://localhost:8080');

describe('Products API', () => {
  it('should get a list of products', (done) => {
    requester
      .get('/api/products')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should create a new product', (done) => {
    const newProduct = {
      _id: "1232313",
      title: "Chocolatada",
      description: "Chocolatada en polvo, rinde 10 vasos",
      price: 400,
      stock: 50,
      thumbnails: [],
      status: true,
      code: "choco123",
      category: "bebidas"
    };

    requester
      .post('/api/products')
      .send(newProduct)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        done();
      });
  });


});
