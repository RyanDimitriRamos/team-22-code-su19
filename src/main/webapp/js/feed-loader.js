// Fetch messages and add them to the page.
function fetchMessages(){
  const url = '/tables';
  fetch(url)
  .then(function(response) {
    return response.json();
  }).then((tables) => {
    const messageContainer = document.getElementById('message-container');
    if(tables.length == 0){
     messageContainer.innerHTML = '<p>There are no events yet.</p>';
    }
    else{
     messageContainer.innerHTML = '';
    }
    tables.forEach((table) => {
      const messageDiv = buildMessageDiv(table);
      messageContainer.appendChild(messageDiv);
    });
  //initialize masonry
    var elem = document.querySelector('#message-container');
    var msnry = new Masonry( elem, {
      // options
      itemSelector: '.message-div',
      percentPosition: true
    });
  });
}

function buildMessageDiv(message){
  var name = message.firstName +" " + message.lastName;
  const nameDiv = document.createElement('div');
  nameDiv.classList.add("left-align");
  nameDiv.appendChild(document.createTextNode(name));

  const emailDiv = document.createElement('div');
  emailDiv.classList.add('right-align');
  emailDiv.appendChild(document.createTextNode(message.email));

  const headerDiv = document.createElement('div');
  headerDiv.classList.add('message-header');
  headerDiv.appendChild(nameDiv);
  headerDiv.appendChild(emailDiv);
  
  const joinButton = document.createElement('button');
  joinButton.classList.add('btn', 'btn-success');
  joinButton.style.cssFloat = 'right';
  joinButton.innerHTML = 'Join Table'
  headerDiv.appendChild(joinButton);

  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('message-body');
  // bodyDiv.appendChild(document.createTextNode(message.text));
  bodyDiv.innerHTML = message.restName;

  const messageDiv = document.createElement('div');
  messageDiv.classList.add("message-div");
  var height = (message.restName.length / 44) * 25 + 175;
  messageDiv.style.height = height + 'px';
  
  messageDiv.appendChild(headerDiv);
  messageDiv.appendChild(bodyDiv);
  
  joinButton.onclick = function(){
	  xhttp = new XMLHttpRequest();
	  xhttp.open("POST", "addUserToEvent", true);
	  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  xhttp.send("otherEmail=" + message.email + "&timestamp=" + name);
	  xhttp.onreadystatechange = function(){
	    messageDiv.innerHTML = 'You have been added to this table!'
	  }
  }
  
  return messageDiv;
}

// Fetch data and populate the UI of the page.
document.addEventListener("DOMContentLoaded", () => fetchMessages());
