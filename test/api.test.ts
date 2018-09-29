import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
import app from '../lib/app';

chai.use(chaiHttp);
const should = chai.should();

// test for post todos
const todoData = {
  title : "1st test",
    place : "home",
    description: "it should pass"
}

describe('All save todo Tests', () => {
    before(function(){
        console.log('this is first test for save todo')
      })
    it('it should save todo data in data base', (done) => {
      chai.request(app)
        .post('/api/todo')
        .send(todoData)
        .end((err, res) => {
          if (err) {
            console.log(err)
          }
          res.should.have.status(200);
          should.exist(res.body);
          res.body.should.be.a('object');
          res.body.data.should.have.property('title');
          res.body.data.should.have.property('place');
          res.body.data.should.have.property('description');
          res.body.success.should.equal(true)
          
          done();
        })
  
    });

    // 2nd test
    let withoutTitle = {
      place: 'home',
      description: 'it will fail'
    }
    it('it should return message "Please fill all the required fields"', (done)=>{
      chai.request(app)
      .post('/api/todo')
      .send(withoutTitle)
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        res.should.have.status(203);
        should.exist(res.body);
        res.body.message.should.be.a('string');
        res.body.message.should.equal('Please fill all the required fields');
        res.body.success.should.equal(false)
        
        done();
      })

    })

    //3rd test

    let withoutPlace = {
      title: 'with out place',
      description: 'it will fail'
    }
    it('it should return message "Please fill all the required fields"', (done)=>{
      chai.request(app)
      .post('/api/todo')
      .send(withoutPlace)
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        res.should.have.status(203);
        should.exist(res.body);
        res.body.message.should.be.a('string');
        res.body.message.should.equal('Please fill all the required fields');
        res.body.success.should.equal(false)
        
        done();
      })

    })

    //4th test
    
    let withoutDescription = {
      title: 'with out deescription',
      place:'home again'
    }
    it('it should return message "Please fill all the required fields"', (done)=>{
      chai.request(app)
      .post('/api/todo')
      .send(withoutDescription)
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        res.should.have.status(203);
        should.exist(res.body);
        res.body.message.should.be.a('string');
        res.body.message.should.equal('Please fill all the required fields');
        res.body.success.should.equal(false)
        
        done();
      })

    })

    //5th test
      
    let noData = {
      
    }
    it('it should return message "Please fill all the required fields"', (done)=>{
      chai.request(app)
      .post('/api/todo')
      .send(noData)
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        res.should.have.status(203);
        should.exist(res.body);
        res.body.message.should.be.a('string');
        res.body.message.should.equal('Please fill all the required fields');
        res.body.success.should.equal(false)
        
        done();
      })

    })

    // 6th test
    let withEmptyData = {
      title: '',
      place:'',
      deescription:''
    }
    it('it should return message "Please fill all the required fields"', (done)=>{
      chai.request(app)
      .post('/api/todo')
      .send(withEmptyData)
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        res.should.have.status(203);
        should.exist(res.body);
        res.body.message.should.be.a('string');
        res.body.message.should.equal('Please fill all the required fields');
        res.body.success.should.equal(false);
        
        done();
      });

    });
    

  })

