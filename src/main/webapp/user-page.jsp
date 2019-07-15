<!--
Copyright 2019 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<!DOCTYPE html>
<html>
  <head>
    <title>User Page</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/css/user-page.css">
    <script src="/js/user-page-loader.js"></script>
    <script src="http://cdn.ckeditor.com/4.7.2/basic/ckeditor.js"></script>
  </head>
  <body onload="buildUI();">
    <nav>
      <ul id="navigation">
        <li><a href="/">Home</a></li>
        <li><a href="/feed.jsp">My Messages</a></li>
        <li><a href="/community.jsp">User Community</a></li>
        <li><a href="/stats.jsp">Site Statistics</a></li>
        <li><a href="/maps.jsp">Tables Near Me</a></li>
        <li><a href="/image.jsp">Image Labeling</a></li>
        <li><a href="/aboutus.jsp">About Our Team</a></li>
      </ul>
    </nav>
    <h1 id="page-title">User Page</h1>
    
    <div id="about-me-container">Loading...</div>
    <div id="about-me-form" class="hidden">
    <form action="/about" method="POST">
      <textarea name="about-me" placeholder="Enter some information about yourself here" rows=4 required style="width: 500px;" ></textarea>
      <br/>
      <input type="submit" value="Submit">
    </form>
  </div>
  <input type="button" onclick="toggleAboutMeBox()" id="about-me-btn" class="hidden" value = "Edit Bio"></button>

    <form id="message-form" action="/messages" method="POST" class="hidden">
      Enter a new message:
      <br/>
      <textarea name="text" id="message-input" style="width: 500px;"></textarea>
      <br/>
      <input type="submit" value="Submit">
    </form>
    <hr/>

    <script>
        CKEDITOR.replace('text', {
          keystrokes: [
                        [CKEDITOR.CTRL + 76, "link"],
                        [CKEDITOR.CTRL + 84, "bulletedlist"]
                      ],
          title: 'What You See is What You Get',
          uiColor: '#B1CC3D'
        });
    </script>

    <div id="message-container">Loading...</div>


  </body>
</html>
