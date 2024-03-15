const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

const { username, chatroom } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.emit("joinRoom", { username, chatroom });

socket.on("message", (message) => {
  outputMessage(message);
});

socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

/**click on send message button then run this code */
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let msg = e.target.elements.msg.value;
  socket.emit("chatMessages", msg);
  e.target.elements.msg.value = "";
});

/**Exit chatroom */
document.getElementById("leave-room").addEventListener("button", (e) => {
  window.location = "../index.html";
});

/**
 * @param {string} message
 * This function does dom manupulation to append the message in chat room
 */
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");

  const p = document.createElement("p");
  p.classList.add("meta");

  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);

  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.text;
  div.appendChild(para);

  document.querySelector(".chat-messages").appendChild(div);
}

/**
 * shows chatroom name on chat sidebar
 * @param {string} room
 */
function outputRoomName(room) {
  roomName.innerText = room;
}

/**
 * shows online user list joined on same chatroom
 * @param {array[users]} users
 */
function outputUsers(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userList.appendChild(li);
  });
}
