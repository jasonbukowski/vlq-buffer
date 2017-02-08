var should = require('should');
var vlq = require('../src/vlq');


describe("Testing VLQ functions ", function () {

    describe("isVLQLastByte - ", function () {

        it("136 false", function (done) {
            var value = 136; // 10001000
            vlq.isVLQLastByte(value).should.equal(false);
            done();
        });

        it("193 false", function (done) {
            var value = 193; // 11000001
            vlq.isVLQLastByte(value).should.equal(false);
            done();
        });

        it("46 true", function (done) {
            var value = 46; // 00101110
            vlq.isVLQLastByte(value).should.equal(true);
            done();
        });

        it("127 true", function (done) {
            var value = 127; // 01111111
            vlq.isVLQLastByte(value).should.equal(true);
            done();
        });

    });

    describe("int2VLQBuffer - ", function () {

        it("0 == 00", function (done) {
            var int = 0;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0x00]));
            done();
        });

        it("127 == 7f", function (done) {
            var int = 127;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0x7f]));
            done();
        });

        it("128 == 8100", function (done) {
            var int = 128;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0x81, 0x00]));
            done();
        });

        it("8192 == C000", function (done) {
            var int = 8192;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0xc0, 0x00]));
            done();
        });

        it("16383 == ff7f", function (done) {
            var int = 16383;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0xff, 0x7f]));
            done();
        });

        it("16384 == 818000", function (done) {
            var int = 16384;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0x81, 0x80, 0x00]));
            done();
        });

        it("2097151 == ffff7f", function (done) {
            var int = 2097151;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0xff, 0xff, 0x7f]));
            done();
        });

        it("2097152 == 81808000", function (done) {
            var int = 2097152;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0x81, 0x80, 0x80, 0x00]));
            done();
        });

        it("134217728 == c0808000", function (done) {
            var int = 134217728;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0xc0, 0x80, 0x80, 0x00]));
            done();
        });

        it("268435455 == ffffff7f", function (done) {
            var int = 268435455;
            vlq.int2VLQBuffer(int).should.deepEqual(new Buffer([0xff, 0xff, 0xff, 0x7f]));
            done();
        });

    });

    describe("vlqBuffer2Int - ", function () {

        it("0 == 00", function (done) {
            var buffer = new Buffer([0x00]);
            vlq.vlqBuffer2Int(buffer).should.equal(0);
            done();
        });

        it("127 == 7f", function (done) {
            var buffer = new Buffer([0x7f]);
            vlq.vlqBuffer2Int(buffer).should.equal(127);
            done();
        });

        it("128 == 8100", function (done) {
            var buffer = new Buffer([0x81, 0x00]);
            vlq.vlqBuffer2Int(buffer).should.equal(128);
            done();
        });

        it("8192 == C000", function (done) {
            var buffer = new Buffer([0xc0, 0x00]);
            vlq.vlqBuffer2Int(buffer).should.equal(8192);
            done();
        });

        it("16383 == ff7f", function (done) {
            var buffer = new Buffer([0xff, 0x7f]);
            vlq.vlqBuffer2Int(buffer).should.equal(16383);
            done();
        });

        it("16384 == 818000", function (done) {
            var buffer = new Buffer([0x81, 0x80, 0x00]);
            vlq.vlqBuffer2Int(buffer).should.equal(16384);
            done();
        });

        it("2097151 == ffff7f", function (done) {
            var buffer = new Buffer([0xff, 0xff, 0x7f]);
            vlq.vlqBuffer2Int(buffer).should.equal(2097151);
            done();
        });

        it("2097152 == 81808000", function (done) {
            var buffer = new Buffer([0x81, 0x80, 0x80, 0x00]);
            vlq.vlqBuffer2Int(buffer).should.equal(2097152);
            done();
        });

        it("134217728 == c0808000", function (done) {
            var buffer = new Buffer([0xc0, 0x80, 0x80, 0x00]);
            vlq.vlqBuffer2Int(buffer).should.equal(134217728);
            done();
        });

        it("268435455 == ffffff7f", function (done) {
            var buffer = new Buffer([0xff, 0xff, 0xff, 0x7f]);
            vlq.vlqBuffer2Int(buffer).should.equal(268435455);
            done();
        });

    });

});


