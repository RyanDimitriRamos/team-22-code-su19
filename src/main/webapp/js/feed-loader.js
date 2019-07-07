// Fetch messages and add them to the page.
function fetchMessages(){
  const url = '/feed';
  fetch(url).then((response) => {
    return response.json();
  }).then((messages) => {
    const messageContainer = document.getElementById('message-container');
    if(messages.length == 0){
     messageContainer.innerHTML = '<p>There are no posts yet.</p>';
    }
    else{
     messageContainer.innerHTML = '';  
    }
    messages.forEach((message) => { 
     const messageDiv = buildMessageDiv(message);
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
  const usernameDiv = document.createElement('div');
  usernameDiv.classList.add("left-align");
  usernameDiv.appendChild(document.createTextNode(message.user));

  const timeDiv = document.createElement('div');
  timeDiv.classList.add('right-align');
  timeDiv.appendChild(document.createTextNode(new Date(message.timestamp)));

  const headerDiv = document.createElement('div');
  headerDiv.classList.add('message-header');
  headerDiv.appendChild(usernameDiv);
  headerDiv.appendChild(timeDiv);

  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('message-body');
  // bodyDiv.appendChild(document.createTextNode(message.text));
  bodyDiv.innerHTML = message.text;

  const messageDiv = document.createElement('div');
  messageDiv.classList.add("message-div");
  var height = (message.text.length / 44) * 25 + 135;
  messageDiv.style.height = height + 'px';
  
  messageDiv.appendChild(headerDiv);
  messageDiv.appendChild(bodyDiv);

  return messageDiv;
}

// Fetch data and populate the UI of the page.
function buildUI(){
  fetchMessages();
}
