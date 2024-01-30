const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatbox");

let userMessage;

const createChatLi = (message, className) => {
  //Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">${message}</span>`;
  chatLi.innerHTML = chatContent;
  return chatLi;
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  console.log(userMessage);
  if (!userMessage) return;
  //append the user's message to the chatbox;
  chatBox.appendChild(createChatLi(userMessage, "outgoing"));
};

sendChatBtn.addEventListener("click", handleChat);
