const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = "";
const createChatLi = (message, className) => {
  //Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi;
};
const generateResponse = (incomingChatLi) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement=incomingChatLi.querySelector("p");

  const requestOptions = {
    method: "Post",
    headers: {
      "content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      message: [{ role: "user", content: userMessage }]
    })
  };

  fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
    messageElement.textContent=data.choices[0].message.content;
    })
    .catch((error) => {
      messageElement.textContent="oops! try again";
    });
};
const handleChat = () => {
  userMessage = chatInput.value.trim();
  console.log(userMessage);
  if (!userMessage) return;
  //append the user's message to the chatbox;
  chatBox.appendChild(createChatLi(userMessage, "outgoing"));

  setTimeout(() => {
    //display Thinking message while waiting for the message
    const incomingChatLi=createChatLi("Thinking...", "incoming");
    chatBox.appendChild(incomingChatLi);
    generateResponse(incomingChatLi);
  }, 600);
};

sendChatBtn.addEventListener("click", handleChat);
