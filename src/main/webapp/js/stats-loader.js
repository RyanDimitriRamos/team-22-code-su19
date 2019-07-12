// Fetch stats and display them in the page.
function fetchStats(){
  const url = '/stats';
  fetch(url).then((response) => {
    return response.json();
  }).then((stats) => {
    const statsContainer = document.getElementById('stats-container');
    const usersContainer = document.getElementById('users-container');   
    statsContainer.innerHTML = '';
    usersContainer.innerHTML = '';

    const messageCountElement = buildStatElement('Message count: ' + stats.messageCount);
    statsContainer.appendChild(messageCountElement);
    const userCountElement = buildStatElement('User count: ' + stats.userCount);
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
