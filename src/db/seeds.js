const Conversation = require("./../models/conversation");
const User = require("./../models/user");

let prepareTimeToWait = function(){
  let timeToWait = 250;
  return function(){
    let toReturn = timeToWait;
    timeToWait += 250;
    return timeToWait;
  }
}
let timeToWait = prepareTimeToWait();

User.deleteAll();
Conversation.deleteAll();

const convos = [];

convos.push(new Conversation("2017-01-01"));

setTimeout(() => {
  for(let convo of convos) convo.save();
}, timeToWait());

const users = [];
users.push(new User("cool Name", 5, "android", "sfhfee", "online", true));

setTimeout(() => {
  for(let user of users) user.save();
}, timeToWait());

setTimeout(() => {

  const onError = (err) => {console.log("error")}

  const onSuccessUsers = (results) => {console.log("Returned Users: ", results.rows)}
  User.findAll(onError, onSuccessUsers);
  const onSuccessConversation = (results) => {console.log("Returned conversations: ", results.rows)}
  Conversation.findAll(onError, onSuccessConversation);

}, timeToWait());
