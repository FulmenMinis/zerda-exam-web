'use strict';

var button = document.querySelector('button');
var loading = document.querySelector('span');
var textencode = document.querySelector('textarea');
var numberinput = document.querySelector('.number');
var emailinput = document.querySelector('.email');

button.addEventListener('click', function () {
  loading.classList.remove('hide');
