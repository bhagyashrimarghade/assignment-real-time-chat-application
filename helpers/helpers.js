const moment = require("moment");
const roomUsers = [];

/**
 * new users joined the same chatroom
 * @param {number} id
 * @param {string} username
 * @param {string} chatroom
 * @returns {object} user
 */
function newUser(id, username, chatroom) {
  const user = { id, username, chatroom };
  roomUsers.push(user);
  return user;
}

/**
 *
 * @param {name of user} username
 * @param {message} text
 * @returns username,message, time
 */
function formatMessage(username, text) {
  return { username, text, time: moment().format("h:m a") };
}

/**
 *
 * @param {chatroom} room
 * @returns users
 */
function getIndividualRoomUsers(room) {
  return roomUsers.filter((user) => user.chatroom === room);
}

/**
 * leaving chatroom
 * @param {socketId} id
 * @returns updatedUsers
 */
function exitRoom(id) {
  const index = roomUsers.findIndex((user) => user.id === id);
  if (index != -1) return roomUsers.splice(index, 1)[0];
}

/**
 * shows active users on sidebar of chat
 * @param {socketId} id
 * @returns activeUsers
 */
function getActiveUser(id) {
  return roomUsers.find((user) => user.id === id);
}

module.exports = {
  newUser,
  getIndividualRoomUsers,
  formatMessage,
  getActiveUser,
  exitRoom,
};
