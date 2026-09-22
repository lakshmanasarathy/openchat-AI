const API_URL = "/api/chat";

const chatArea =
    document.getElementById("chatArea");

const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");


// =========================
// SEND MESSAGE
// =========================

async function sendMessage() {

    const message =
        messageInput.value.trim();

    if (message === "") {
        return;
    }


    // Remove welcome screen
    const welcome =
        document.getElementById("welcome");

    if (welcome) {
        welcome.remove();
    }


    // Show user message
    addMessage(
        message,
        "user"
    );


    // Clear input
    messageInput.value = "";

    resetTextarea();


    // Disable button
    sendButton.disabled = true;


    // Show loading
    const loading =
        addMessage(
            "Thinking...",
            "bot"
        );


    try {

        const response =
            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })

            });


        if (!response.ok) {
            throw new Error(
                "Server error"
            );
        }


        const data =
            await response.json();


        // Remove loading
        loading.remove();


        // Show AI response
        addMessage(
            data.reply,
            "bot"
        );


    } catch (error) {

        console.error(error);

        loading.remove();

        addMessage(
            "Unable to connect to OpenChat AI server.",
            "bot"
        );

    }


    sendButton.disabled = false;
}


// =========================
// ADD MESSAGE
// =========================

function addMessage(
    text,
    sender
) {

    const message =
        document.createElement("div");

    message.classList.add(
        "message"
    );


    if (sender === "user") {

        message.classList.add(
            "user-message"
        );

    }


    const avatar =
        document.createElement("div");

    avatar.classList.add(
        "avatar"
    );


    if (sender === "user") {

        avatar.classList.add(
            "user-avatar"
        );

        avatar.textContent = "U";

    } else {

        avatar.classList.add(
            "bot-avatar"
        );

        avatar.textContent = "O";

    }


    const content =
        document.createElement("div");

    content.classList.add(
        "message-content"
    );

    content.textContent = text;


    message.appendChild(avatar);

    message.appendChild(content);


    chatArea.appendChild(message);


    chatArea.scrollTop =
        chatArea.scrollHeight;


    return message;
}


// =========================
// SUGGESTION
// =========================

function useSuggestion(text) {

    messageInput.value = text;

    sendMessage();
}


// =========================
// NEW CHAT
// =========================

function newChat() {

    chatArea.innerHTML = `

        <div class="welcome" id="welcome">

            <div class="welcome-logo">
                O
            </div>

            <h1>
                How can I help you today?
            </h1>

            <div class="suggestions">

                <button
                    onclick="useSuggestion('Explain Java in simple words')">

                    <strong>💡 Explain Java</strong>
                    <span>in simple words</span>

                </button>

                <button
                    onclick="useSuggestion('What is a REST API?')">

                    <strong>🔧 REST API</strong>
                    <span>Explain with an example</span>

                </button>

                <button
                    onclick="useSuggestion('Help me learn Spring Boot')">

                    <strong>📚 Learn Spring Boot</strong>
                    <span>Create a learning plan</span>

                </button>

                <button
                    onclick="useSuggestion('Write a Java program')">

                    <strong>💻 Write code</strong>
                    <span>Help me with Java</span>

                </button>

            </div>

        </div>
    `;
}


// =========================
// TEXTAREA
// =========================

messageInput.addEventListener(
    "input",
    function () {

        this.style.height = "auto";

        this.style.height =
            this.scrollHeight + "px";

    }
);


messageInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


function resetTextarea() {

    messageInput.style.height =
        "auto";
}


// =========================
// SIDEBAR
// =========================

function toggleSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    sidebar.classList.toggle("open");
}


// =========================
// LOGOUT
// =========================

function logout() {

    localStorage.removeItem("token");

    window.location.href =
        "login.html";
}