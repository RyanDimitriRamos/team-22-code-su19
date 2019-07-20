/*
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/** Fetches users and adds them to the page. */
function fetchUserList(){
        const url = '/tables';
        fetch(url).then((response) => {
                return response.json();
        }).then((tables) => {
		const list = document.getElementById('list');
		list.innerHTML = '';

		tables.forEach((table) => {
			const userListItem = buildUserListItem(table);
			list.appendChild(userListItem);
	  	});
                // initialized masonry
                var elem = document.querySelector('#list');
                var msnry = new Masonry( elem, {
                   itemSelector: '.list',
                   percentPosition: true
                });
	});
}

/**
* Builds a list element that contains a link to a user page, e.g.
* <li><a href="/user-page.jsp?user=test@example.com">test@example.com</a></li>
*/
function buildUserListItem(table){

        const userLink = document.createElement('a');
        if(table.email.length == 0){
          userLink.setAttribute('href', '/user-page.jsp');
        }
        else{
          userLink.setAttribute('href', '/user-page.jsp?user=' + table.email);
        }
        var name = table.firstName + " " + table.lastName;
        if(table.firstName.length == 0){
           name = "No name was provided";
        }
	userLink.appendChild(document.createTextNode(name));
	const userListItem = document.createElement('li');
	userListItem.appendChild(userLink);
	return userListItem;
}


/** Fetches data and populates the UI of the page. */
document.addEventListener("DOMContentLoaded", () => fetchUserList());



