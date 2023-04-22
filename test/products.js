let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);


describe('/', () => {
    it('it should insert the product detail', (done) => {
        chai.request(server)
            .post('/product/create')
            .send({
                "name":"sampleProduct" + Math.random(),
                "description":"sample description",
                "price":Math.random()
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                console.log(res.body);
                done();
            });
    });
});

describe('/', () => {
    it('it should return the product detail', (done) => {
        chai.request(server)
            .get('/product/get?id=3&currency=USD')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                console.log(res.body);
                done();
            });
    });
});

describe('/', () => {
    it('it should delete product detail', (done) => {
        chai.request(server)
            .delete('/product/delete?id=1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                console.log(res.body);
                done();
            });
    });
});

describe('/', () => {
    it('it should display the mostviewed products detail', (done) => {
        chai.request(server)
            .get('/product/mostviewed?count=5')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                console.log(res.body);
                done();
            });
    });
});