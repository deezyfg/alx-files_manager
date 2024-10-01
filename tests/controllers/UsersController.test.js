/* eslint-disable jest/valid-expect */
/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/no-test-return-statement */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
import { expect } from 'chai';
import request from 'supertest';
import { describe, it, before } from 'mocha';
import dbClient from '../../utils/db';
import app from '../../server';

describe('+ UserController', () => {
  const mockUser = {
    email: 'beloxxi@blues.com',
    password: 'melody1982',
  };

  before(function (done) {
    this.timeout(10000);
    dbClient.usersCollection()
      .then((usersCollection) => {
        usersCollection.deleteMany({ email: mockUser.email })
          .then(() => done())
          .catch((deleteErr) => done(deleteErr));
      }).catch((connectErr) => done(connectErr));
  });

  describe('+ POST: /users', () => {
    it('+ Fails when there is no email and there is password', function () {
      return new Promise((done) => {
        this.timeout(5000);
        request(app)
          .post('/users')
          .send({
            password: mockUser.password,
          })
          .expect(400)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body).to.deep.eql({ error: 'Missing email' });
            done();
          });
      });
    });

    it('+ Fails when there is email and there is no password', function () {
      return new Promise((done) => {
        this.timeout(5000);
        request(app)
          .post('/users')
          .send({
            email: mockUser.email,
          })
          .expect(400)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body).to.deep.eql({ error: 'Missing password' });
            done();
          });
      });
    });

    it('+ Succeeds when the new user has a password and email', function () {
      return new Promise((done) => {
        this.timeout(5000);
        request(app)
          .post('/users')
          .send({
            email: mockUser.email,
            password: mockUser.password,
          })
          .expect(201)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body.email).to.eql(mockUser.email);
            expect(res.body.id.length).to.be.greaterThan(0);
            done();
          });
      });
    });

    it('+ Fails when the user already exists', function () {
      return new Promise((done) => {
        this.timeout(5000);
        request(app)
          .post('/users')
          .send({
            email: mockUser.email,
            password: mockUser.password,
          })
          .expect(400)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body).to.deep.eql({ error: 'Already exist' });
            done();
          });
      });
    });
  });
});
