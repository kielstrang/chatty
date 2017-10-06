Chatty
=====================

A basic chat client built with ReactJS.

### Setup

Clone the repository and install dependencies:

```
git clone git@github.com:kielstrang/chatty.git
npm install
```

Start both servers with ```npm start```:

```
# webpack server hosting the Chatty client
server.js

# communication server
chatty-server/server.js
```

### Usage

Messages sent by any user will be displayed on all connected clients, allowing conversations.
!["Chatty"](https://github.com/kielstrang/chatty/blob/master/docs/Chatty.png)

Users can choose their name and colour.
!["Chatty: Names"](https://github.com/kielstrang/chatty/blob/master/docs/ChattyNames.png)

URLs in messages are clickable, and image links will display the image in the message.
!["Chatty: Images"](https://github.com/kielstrang/chatty/blob/master/docs/ChattyImages.png)


### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [react-color](https://casesandberg.github.io/react-color/)
