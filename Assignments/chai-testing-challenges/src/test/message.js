require('dotenv').config()
const app = require('../server.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert

const User = require('../models/user.js')
const Message = require('../models/message.js')

chai.config.includeStack = true

const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
  done()
})

const SAMPLE_OBJECT_ID_USER = 'aaaaaaaaaaaa' // 12 byte string
const SAMPLE_OBJECT_ID_MESSAGE = 'bbbbbbbbbbbb' // 12 byte string
const SAMPLE_OBJECT_ID_MESSAGE2 = 'cccccccccccc' // 12 byte string


describe('Message API endpoints', () => {
    // Create a sample message for use in tests.
    beforeEach((done) => {
        const sampleUser = new User({
            username: 'myuser',
            password: 'mypassword',
            _id: SAMPLE_OBJECT_ID_USER
        })
        // sampleUser.save()
        // console.log(sampleUser)
        const sampleMessage = new Message({
            title: 'mymessage',
            body: 'mymessagebody',
            author: sampleUser,
            _id: SAMPLE_OBJECT_ID_MESSAGE
        })
        Promise.all([
             sampleUser.save(),
             sampleMessage.save()]
         )
         .then(() => {
             done()
         })
    })

    // Delete sample message.
    afterEach((done) => {
        deleteMessage = Message.deleteOne({ _id: SAMPLE_OBJECT_ID_MESSAGE })
        deleteUser = User.deleteOne( {_id: SAMPLE_OBJECT_ID_USER })

        Promise.all([deleteMessage, deleteUser])
        .then(() => {
            done()
        })
    })

    it('should load all messages', (done) => {
        chai.request(app)
        .get('/messages')
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            expect(res.body.messages).to.be.an("array")
            done()
        })
    })

    it('should get one specific message', (done) => {
        // TODO: Complete this
        chai.request(app)
        .get(`/messages/${SAMPLE_OBJECT_ID_MESSAGE}`)
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body.title).to.equal('mymessage')
            expect(res.body.body).to.equal('mymessagebody')
            done()
        })
    })

    it('should post a new message', (done) => {
        // TODO: Complete this
        chai.request(app)
        .post('/messages')
        .send({title: 'newpost', body: 'testBody', author: SAMPLE_OBJECT_ID_USER})
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('title', 'newpost')

            // check that user is actually inserted into database
            Message.findOne({title: 'newpost'}).then(message => {
                expect(message).to.be.an('object')
                done()
            })
        })
    })

    it('should update a message', (done) => {
        // TODO: Complete this
        chai.request(app)
        .put(`/messages/${SAMPLE_OBJECT_ID_MESSAGE}`)
        .send({title: 'neweditedtitle'})
        .end((err, res) => {
            console.log(res)
            if (err) { done(err) }
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('title', 'neweditedtitle')
            done()
            // check that user is actually inserted into database
            User.findOne({title: 'neweditedtitle'}).then(message => {
                expect(message).to.be.an('object')
                done()
            })
        })
    })

    it('should delete a message', (done) => {
        // TODO: Complete this
        chai.request(app)
        .delete(`/messages/${SAMPLE_OBJECT_ID_MESSAGE}`)
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body.message).to.equal('Successfully deleted.')
            expect(res.body._id).to.equal(SAMPLE_OBJECT_ID_MESSAGE)

            // check that user is actually deleted from database
            Message.findOne({title: 'mymessage'}).then(message => {
                expect(message).to.equal(null)
                done()
            })
        })
    })
})
