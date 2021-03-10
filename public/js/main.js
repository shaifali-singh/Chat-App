const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  // if(!username)
  // window.location = '../index.html';
  outputRoomName(room);
  outputUsers(users);
 
});

// Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

//search user
function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i,txtvalue;
  input = document.getElementById("mySearch");
  filter = input.value.toUpperCase();
  ul = document.getElementById("users");
  li = ul.getElementsByTagName("li");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    var s = li[i].getElementsByClassName("name");
    console.log(s);
    txtvalue = s[0].innerHTML;
    if (txtvalue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}


// Output message to DOM
function outputMessage(message) {
//   <li class="chat-left">
//   <div class="chat-avatar">
//       <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin">
//       <div class="chat-name">Russell</div>
//   </div>
//   <div class="chat-text">Hello, I'm Russell.
//       <br>How can I help you today?</div>
//   <div class="chat-hour">08:55</div>
// </li>
  console.log(username);
  const li = document.createElement('li');
 
  const div = document.createElement('div');
  div.classList.add('chat-avatar');
  const img = document.createElement('img');
  img.src = "https://www.bootdey.com/img/Content/avatar/avatar3.png";
  div.appendChild(img);

  const div1 = document.createElement('div');
  div1.classList.add('chat-name');
  div1.innerText = message.username;
  div.appendChild(div1);
  
  // li.appendChild(div);
  const div2 = document.createElement('div');
  div2.classList.add('chat-text');
  div2.innerText = message.text;
//  li.appendChild(div2);

 const div3 = document.createElement('div');
 div3.classList.add('chat-hour');
 div3.innerText = message.time;

 if(message.username == username)
{ li.classList.add('chat-right');
  li.appendChild(div3);
  li.appendChild(div2);
  li.appendChild(div);}
  
else
{
  li.classList.add('chat-left');
  li.appendChild(div);
  li.appendChild(div2);
  li.appendChild(div3);
}
// li.appendChild(div3);
document.querySelector('.chat-messages').appendChild(li);
}


  // const div = document.createElement('div');
  // div.classList.add('message');
  // const p = document.createElement('p');
  // p.classList.add('meta');
  // p.innerText = message.username;
  // p.innerHTML += `<span>${message.time}</span>`;
  // div.appendChild(p);
  // const para = document.createElement('p');
  // para.classList.add('text');
  // para.innerText = message.text;
  // div.appendChild(para);
  // document.querySelector('.chat-messages').appendChild(div);


// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
//   <li class="person" data-chat="person1">
//   <div class="user">
//       <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin">
//   </div>
//   <p class="name-time">
//       <span class="name">Steve Bangalter</span>
//   </p>
// </li>
  userList.innerHTML = '';
  users.forEach((user) => {
    const li=document.createElement('li');
    li.classList.add('person');
    const div=document.createElement('div');
    div.classList.add('user');

    const img=document.createElement('img');
    img.src="https://www.bootdey.com/img/Content/avatar/avatar3.png";
    const p=document.createElement('p');
    p.classList.add('name-time');
    const span=document.createElement('span');
    span.innerText=user.username;
    span.classList.add('name');
    p.appendChild(span);
    div.appendChild(img);
    li.appendChild(div);
    li.appendChild(p);
    userList.appendChild(li);
    
  });
}
//Add current room

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});
