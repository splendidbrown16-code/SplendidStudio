    const password = document.getElementById("password");
    const passwordToggle = document.getElementById("passwordToggle");
    const signupForm = document.getElementById("signupForm");

    passwordToggle.addEventListener("click", () => {
        const isPassword = password.type === "password";

        password.type = isPassword ? "text" : "password";
        passwordToggle.textContent = isPassword ? "Hide" : "Show";

        passwordToggle.setAttribute(
            "aria-label",
            isPassword ? "Hide password" : "Show password"
        );
    });

    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const passwordValue = password.value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (passwordValue !== confirmPassword) {
            showToast("Passwords do not match", "Please make sure both passwords are the same.", "error");
            return;
        }

        try {
            const response = await fetch(
                "/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phone,
                        password: passwordValue
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                showToast("Unable to create account", data.message || "Please check your details and try again.", "error");
                return;
            }

            localStorage.setItem("splendidToken", data.token);
            localStorage.setItem(
                "splendidUser",
                JSON.stringify(data.user)
            );

            showToast("Account created successfully!", "Welcome to Splendid Studio.");

            window.location.href = "dashboard.html";

        } catch (error) {
            console.error("Signup error:", error);

showToast(
    "Connection problem",
    "Unable to connect to Splendid Studio. Please try again.",
    "error"
);
        }
    });
