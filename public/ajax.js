var Ajax = function(){
  this.APIEndpoint = 'http://localhost:3600/';

  this.sendData = function(data, callback) {
    this.open('POST', data, 'decode/', callback);
  }

  this.open = function(method, data, resource, callback) {
    var xhr = new XMLHttpRequest();
    data = (data) ? data : null;
    xhr.open( method, this.APIEndpoint + resource)

    if (method !== 'DELETE') {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.send( JSON.stringify(da ta));
    xhr.onreadystatechange = function (rsp) {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if ( xhr.status === 200 ) {
          console.log(xhr.responseText);
          callback( JSON.parse(xhr.response));
        } else {
          alert('There was a problem with the connection!');
        }
      }
    }
  }
}
