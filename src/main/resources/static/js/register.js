const API_URL = "/api/auth/register";


document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const fullName =
                document.getElementById("fullName")
                    .value.trim();

            const email =
                document.getElementById("email")
                    .value.trim();

            const password =
                document.getElementById("password")
                    .value;

            const confirmPassword =
                document.getElementById("confirmPassword")
                    .value;


            const message =
                document.getElementById("message");


            // Check password
            if (password !== confirmPassword) {

                message.textContent =
                    "Passwords do not match.";

                return;
            }


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

                                fullName: fullName,

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
                        "Registration failed.";

                    return;
                }


                alert(
                    "Registration successful!"
                );


                window.location.href =
                    "login.html";


            } catch (error) {

                console.error(error);

                message.textContent =
                    "Unable to connect to server.";

            }

        }
    );