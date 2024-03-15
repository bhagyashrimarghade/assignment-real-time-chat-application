# Real Time Chat Application

## Objective
Build a real-time chat application using Node.js, Express.js, and Socket.IO.

## Description
1. Set up a basic Node.js project with Express.js, Socket.IO, and other necessary NPM packages.
2. Create a simple web interface using HTML, CSS, and JavaScript to allow users to join chat rooms and send messages.
3. Implement server-side logic using Node.js and Socket.IO to manage chat rooms, user connections and message broadcasting.
4. Implement the following Socket.IO events on the server-side -
   <br/> a. connection - Handle a new user connection.
    <br/>b. join - Add a user to a specific chat room.
    <br/>c. message - Broadcast a message to all users in a chat room.
    <br/>d. disconnect - Handle user disconnections and clean up user data.
  
5. Implement corresponding Socket.IO event listeners on the client-side using JavaScript to update the user interface in real-time.

## Project Setup 
### Follow the below commands to run the project locally on your system
 1. Clone the repository -
    #####
        https://github.com/bhagyashrimarghade/assignment-real-time-chat-application.git    
 2. Navigate to the project directory -
    #####
        cd assignment-real-time-chat-application
 3. Install dependencies -
    #####
        npm install
 4. Run the application -
    #####
        node index.js

## Dependencies
1. express
2. socket.io
3. nodemon
