'use strict';

let readDirFiles = require('./lib/readdirfiles');

readDirFiles('./')
  .then((data) => {
    console.log(data);
  })
