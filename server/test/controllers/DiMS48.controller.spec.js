const mongoose = require('mongoose');
const sinon = require('sinon');
const should = require('chai').should();
const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const DiMS48Controller = require('../../Controllers/DiMS48Controller');

describe('DiMS48Controller', () => {
    describe('getTests test', () => {
        it('should get all tests')
    });

    describe('Create', () => {

    });
    describe('Read', () => {
        describe('Images', () => {
            it('Should give a list of images');
        });

        describe('Instructions', () => {
            it('Should give a list of all instructions');
        });

        describe('Options', () => {
            it('Should give a list of all options');
        });

        describe('Results', () => {
            it('Should be able to get all tests');

            it('Should be able to get a list of unfinished tests');

            it('Should be able to get all unfinished tests');
        });
    });

    describe('Update', () => {
        describe('Results', () => {
            it('Should be able to append results of part 3');

            it('Should not be able to change the results of part 3 once given');
        })
    });

    describe('Delete', () => {

    });
});
