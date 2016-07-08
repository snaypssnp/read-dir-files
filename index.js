'use strict';
const readDirFiles = require('./lib/readdirfiles');

readDirFiles('./')
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error.stack);
  });
