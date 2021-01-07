let chai = require('chai');
let chaiHttp = require('chai-http');
let server = "http://localhost:3000";
let assert = require('assert')
// let server = require('./app');
const should = require('should');
let act = require('./fileContent');
let FileContent = act.FileContent;
let akt = new FileContent();
let tests = akt.readTestsFromFile();

const assertArrays = require('chai-arrays');
chai.use(assertArrays);
//assertion style
chai.should();
chai.use(chaiHttp);


describe('Tasks', ()=> {
    for(let i = 0; i < tests.length; i++) {
        if (tests[i]["metod"] === "DELETE") {
            it("It should delete content from files", (done) => {
                chai.request(server)
                    .delete(tests[i]["path"])
                    .end((err, response) => {
                        response.should.have.status(200);
                        assert.equal(response.text, tests[i]["out"]);
                        done();
                    })
            });
        } else if (tests[i]["metod"] === "GET") {
            it("It should get all the subjects or acitivities", (done )=> {
                        chai.request(server)
                            .get(tests[i]["path"])
                            .end((err, response)=>{
                                response.should.have.status(200);
                                response.body.should.be.a('array');
                                response.body.length.should.be.equal(akt.readSubjectsFromFile().length);
                                done();
                            })
                    });
        }else if(tests[i]["metod"] === "POST") {
            it("It should add some subjects or acitivities", (done )=> {
                chai.request(server)
                    .post(tests[i]["path"])
                    .send(JSON.parse(tests[i]["in"]))
                    .end((err, response)=>{
                        response.should.have.status(200);
                        assert.equal(response.text, tests[i]["out"]);
                        done();
                    })
            });
        }
    }
});