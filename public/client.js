'use strict';

const Feedback = function () {
  const button = document.querySelector('button');
  const textarea = document.querySelector('textarea');
  const number = document.querySelector('.number');
  const email = document.querySelector('.email');

  let send = function () {
    ajax.postMessage(textarea.value, number.value, email.value);
  };

  button.addEventListener('click', send);

  return {
    send: send
  };
}

const changeContents = function() {
  const list = document.querySelector('ul');
  const section = document.querySelector('section');
  const span = document.querySelector('span');

  let renderResponse = function (items) {
    showContent();
    items.forEach(function(items){
      createListItem(items);
    })
  };

  let renderError = function () {
    span.classList.remove('hide');
    span.innerHTML = 'Hasta la vista!'
  };

  let createListItem = function (text) {
    const listItem = document.createElement('li');
    list.appendChild(listItem);
    listItem.innerHTML = text;
  };

  let displayLoading = function () {
    section.classList.add('hide');
    span.classList.remove('hide');
  };

  let showContent = function () {
    section.classList.remove('hide');
    span.classList.add('hide');
  };

  return {
    renderResponse: renderResponse,
    renderError: renderError,
    createListItem: createListItem,
    displayLoading: displayLoading,
    showContent: showContent
  };
}

const ajax = function () {
  let data = [];
  let postMessage = function (text, number, email) {
    changeContents.displayLoading();

  let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log(xhr.response);
        data = JSON.parse(xhr.response);
        // console.log(data);
        if (data.status === 'OK') {
          changeContents.renderResponse(data.items)
        } else {
          changeContents.renderError();
        }
      };
    };

    xhr.open('POST', 'http://localhost:3001/exam', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"feedback": text, "scale": number, "email": email}));
    // console.log({"feedback": text, "scale": number, "email": email});
    // console.log(data);
  }

  return {
    postMessage: postMessage
  };
}

console.log('running');
