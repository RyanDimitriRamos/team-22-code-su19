// Fetch stats and display them in the page.
function fetchStats(){
  const url = '/tables';
  fetch(url)
  .then(function(response) {
    return response.json();
  }).then((tables) => {
    const statsContainer = document.getElementById('stats-container');
    const usersContainer = document.getElementById('users-container');   
    statsContainer.innerHTML = '';
    usersContainer.innerHTML = '';

    const messageCountElement = buildStatElement('Message count: ' + tables.length);
    statsContainer.appendChild(messageCountElement);
 
    var userCounter = 0;
    tables.forEach((table) => {
      if(table.firstName.length > 0){
          userCounter++;
      }
    });
    const userCountElement = buildStatElement('User count: ' + userCounter.toString());
    usersContainer.appendChild(userCountElement);
  });
}

function buildStatElement(statString){
 const statElement = document.createElement('p');
 statElement.appendChild(document.createTextNode(statString));
 return statElement;
}

// Fetch data and populate the UI of the page.
document.addEventListener("DOMContentLoaded", () => fetchStats());
