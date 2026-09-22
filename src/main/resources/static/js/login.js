const API_URL = "/api/auth/login";


document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                document.getElementById("email")
                    .value;

            const password =
                document.getElementById("password")
                    .value;


            const message =
                document.getElementById("message");


            try {

                const response =
                    await fetch(
                        API_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email: email,
                                password: password
                            })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    message.textContent =
                        data.message ||
                        "Invalid email or password.";

                    return;
                }


                // Save JWT
                localStorage.setItem(
                    "token",
                    data.token
                );


                // Go to chat
                window.location.href =
                    "index.html";


            } catch (error) {

                console.error(error);

                message.textContent =
                    "Unable to connect to server.";

            }

        }
    );