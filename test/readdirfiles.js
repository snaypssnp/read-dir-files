'use strict';

const chai = require('chai');
const mock = require('mock-fs');
const readDirFiles = require('../lib/readdirfiles');
const should = chai.should();



describe('Read files in directory', () => {
  before(() => {
    mock({
      'path/to/fake/dir': {
        'some-file.txt': 'file content here',
        'empty-dir': {/** empty directory */}
      },
      'path/to/some.png': new Buffer([8, 6, 7, 5, 3, 0, 9]),
      'some/other/path': {/** another empty directory */},
      'hello.txt': 'Hello World'
    });
  });


  it('should be recursive', () => {
    return readDirFiles('./', true, 'utf-8')
      .then((data) => {
        data.should.be.a('object');
        data.should.have.property("path");
        data.path.should.have.property("to");
        data.path.to.should.have.property("fake");
        data.path.to.fake.should.have.property("dir");
        data.path.to.fake.dir.should.have.property("some-file.txt")
        data.path.to.fake.dir['some-file.txt'].should.equal('file content here');
      });
  });

  it('should not be recursive', () => {
    return readDirFiles('./', false)
      .then((data) => {
        data.should.be.a('object');
        data.should.not.have.property("path");
        data.should.not.have.property("some");
        data.should.have.property("hello.txt");
      });
  });

  it('should return a Error when called without dir', () => {
    return readDirFiles()
      .then(should.fail)
      .catch((err) => {
        err.message.should.equal('Undefined path to the directory');
      });
  });
});