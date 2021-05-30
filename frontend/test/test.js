process.env.NODE_ENV = "test";
var api = require("../backendApi");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;
var assert = require("assert");
var sinon = require("sinon");
var nock = require("nock");

chai.use(chaiHttp);

nock.recorder.rec({
  dont_print: true,
});

var fixtures = nock.recorder.play();
var response = [
  {
    id: "1",
    patient_id: "15245",
    first_name: "Nelson",
    last_name: "Lopez",
    birthday: "10/10/2000",
    gender: "M",
    address: "805 Bosco Vale",
    city: "Lincoln",
    postcode: "68336",
    user_id: "opall",
  },
  {
    id: "2",
    patient_id: "15245",
    first_name: "Javier",
    last_name: "Lopez",
    birthday: "10/11/2000",
    gender: "M",
    address: "Carrera 20",
    city: "Cali",
    postcode: "67200",
    user_id: "eass",
  },
];

describe("get all patient success", function () {
  it("should return a request body when get patients is possible", async (done) => {
    let server = "https://" + process.env.BACKEND_HOST + ":8089/";

    before(() => {
      authStub = sinon
        .stub(server, "isAuthenticated")
        .callsFake(function (req, res, next) {
          return server;
        });
    });

    const scope = nock(server).persist().get("/").reply(200, response);

    //console.log(scope.interceptors[0].body);
    expect(scope.interceptors[0].body).is.not.empty;

    if (!scope.isDone()) {
      console.error("pending mocks: %j", scope.pendingMocks());
    }

    console.log(server);
    done();
  });
});

describe("get all patient info from a specific id", function () {
  it("should return a patient", async (done) => {
    let server = "https://" + process.env.BACKEND_HOST + ":8089/";

    var res = {
      id: "1",
      patient_id: "15245",
      first_name: "Nelson",
      last_name: "Lopez",
      birthday: "10/10/2000",
      gender: "M",
      address: "805 Bosco Vale",
      city: "Lincoln",
      postcode: "68336",
      user_id: "opall",
    };
    before(() => {
      authStub = sinon
        .stub(server, "isAuthenticated")
        .callsFake(function (req, res, next) {
          return server;
        });
    });
    var scope = nock(server)
      .get("/getInfo/patients/" + res.id)
      .reply(200, res);

    expect(scope.interceptors[0].body).is.not.empty;

    done();
  });
});

describe("veify login with an user and password", function () {
  it("POST: should return status 200 with a right user", async (done) => {
    let server = "https://" + process.env.BACKEND_HOST + ":8089/";

    var res = {
      user_id: "opall",
      password: "opall",
    };
    before(() => {
      authStub = sinon
        .stub(server, "isAuthenticated")
        .callsFake(function (req, res, next) {
          return server;
        });
    });
    var scope = nock(server).post("/login/user'/").reply(200);
    expect(scope.interceptors[0].statusCode).is.equal(200);

    done();
  });
});

describe("get prescription about a patient", function () {
  it("should return medication and drug about a patient", async (done) => {
    let server = "https://" + process.env.BACKEND_HOST + ":8089/";

    var res = {
      id: "2",
      patient_id: "15245",
      first_name: "Javier",
      last_name: "Lopez",
      birthday: "10/11/2000",
      gender: "M",
      address: "Carrera 20",
      city: "Cali",
      postcode: "67200",
      user_id: "eass",
    };

    var objMed = {
      id: "01IPAT",
      medication_id: "562251",
      drug_name: "Amoxicillin",
      patient_id: "2",
      reason: "Viral sinusitis (disorder)",
    };

    before(() => {
      authStub = sinon
        .stub(server, "isAuthenticated")
        .callsFake(function (req, res, next) {
          return server;
        });
    });

    var scope = nock(server)
      .get("/getInfo/prescription/" + res.id)
      .reply(200, objMed);
    expect(scope.interceptors[0].statusCode).is.equal(200);
    expect(scope.interceptors[0].body).is.not.empty;

    done();
  });
});

describe("get appoiments of a patient", function () {
  it("should return appoiments of a patient", async (done) => {
    let server = "https://" + process.env.BACKEND_HOST + ":8089/";

    var res = {
      id: "2",
      patient_id: "15245",
      first_name: "Javier",
      last_name: "Lopez",
      birthday: "10/11/2000",
      gender: "M",
      address: "Carrera 20",
      city: "Cali",
      postcode: "67200",
      user_id: "eass",
    };

    var objAppo = {
      id: "136211",
      appointment_id: "455488",
      date: "2002-01-19",
      time: "08:36:45",
      patient_id: "2",
      provider_id: "1",
    };

    before(() => {
      authStub = sinon
        .stub(server, "isAuthenticated")
        .callsFake(function (req, res, next) {
          return server;
        });
    });

    var scope = nock(server)
      .get("/appointments/list/" + res.id)
      .reply(200, objAppo);
    expect(scope.interceptors[0].statusCode).is.equal(200);
    expect(scope.interceptors[0].body).is.not.empty;

    done();
  });
});

describe("get observations of a patient", function () {
  it("should return observations of a patient", async (done) => {
    let server = "https://" + process.env.BACKEND_HOST + ":8089/";

    var res = {
      id: "2",
      patient_id: "15245",
      first_name: "Javier",
      last_name: "Lopez",
      birthday: "10/11/2000",
      gender: "M",
      address: "Carrera 20",
      city: "Cali",
      postcode: "67200",
      user_id: "eass",
    };

    var objObsv = {
      id: "392743",
      date: "2003-07-20",
      code: "32623-1",
      description:
        "Platelet mean volume [Entitic volume] in Blood by Automated count",
      numeric_value: "10.5",
      character_value: "",
      units: "fL",
      patient_id: "2",
    };

    before(() => {
      authStub = sinon
        .stub(server, "isAuthenticated")
        .callsFake(function (req, res, next) {
          return server;
        });
    });

    var scope = nock(server)
      .get("/listObs/" + res.id)
      .reply(200, objObsv);
    expect(scope.interceptors[0].statusCode).is.equal(200);
    expect(scope.interceptors[0].body).is.not.empty;

    done();
  });
});

//Our parent block
describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});
