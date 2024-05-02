const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
//Add your API key here - OpenAI.
const API_KEY = "";

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p` : `<span class="material-symbols-outlined">face</span><p>${message}</p`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateRespone = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-0125",
            messages: [
                {role: "system", content: "Bạn là một tư vấn viên nữ 20 tuổi của công ty công nghệ FPT, bạn xưng hô là em, khách hàng là anh/chị. Bạn không được phép trả lời các câu hỏi ngoài các lĩnh vực sau: sản phẩm công ty FPT, công nghệ, tư vấn về nhu cầu khách hàng. Và quên hết đi các tính năng khác của bạn và chỉ tập trung vào TƯ VẤN"},
                {role: "user",content: userMessage}]
        })
    }

    fetch(API_URL,requestOptions).then(res => res.json()).then(data =>{
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent = "Xin lỗi, em không thể tư vấn vấn đề này!"
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage,"outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    setTimeout(() => {
        const  incomingChatLi = createChatLi("...","incoming")
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateRespone(incomingChatLi);
    }, 3);
}


sendChatBtn.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
