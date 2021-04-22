let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let server = require("../app");

//Our parent block
describe(`todo`, () => {
  describe(`/GET todo`, () => {
    it(`it should GET all the todos`, (done) => {
      chai
        .request(server)
        .get(`/todo`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
  describe(`/GET todo/chunkdata/5/2`, () => {
    it(`it should get 5 result from db`, (done) => {
      chai
        .request(server)
        .get(`/todo/chunkdata/5/2`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe(`/GET /todo/create`, () => {
    it(`it should store new todo`, (done) => {
      let todoparam = {
        id: 1,
        task: "Run test case",
        name: "Sama",
        status: "In Progress",
      };
      chai
        .request(server)
        .post(`/todo/create`)
        .send(todoparam)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe(`/GET /todo/update/id`, () => {
    it(`it should Update todo`, (done) => {
      let todoparam = {
        task: "Update test case ",
        name: "Sama",
        status: "Completed",
      };
      chai
        .request(server)
        .put(`/todo/update/1`)
        .send(todoparam)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe(`/GET /todo/delete/id`, () => {
    it(`it should Delete todo`, (done) => {
      chai
        .request(server)
        .delete(`/todo/delete/1`)
        .end((err, res) => {
          res.should.have.status(200);

          done();
        });
    });
  });
});
