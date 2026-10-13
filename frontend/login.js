
        const password = document.getElementById("password");
        const passwordToggle =
            document.getElementById("passwordToggle");

        const loginForm =
            document.getElementById("loginForm");


        passwordToggle.addEventListener("click", () => {

            const isPassword =
                password.type === "password";

            password.type =
                isPassword ? "text" : "password";

            passwordToggle.textContent =
                isPassword ? "Hide" : "Show";

            passwordToggle.setAttribute(
                "aria-label",
                isPassword
                    ? "Hide password"
                    : "Show password"
            );

        });


loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const passwordValue = password.value;

    try {
        const response = await fetch(
            "/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password: passwordValue
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            showToast("Unable to log in", data.message || "Please check your email and password.", "error");
            return;
        }

        localStorage.setItem("splendidToken", data.token);
        localStorage.setItem(
            "splendidUser",
            JSON.stringify(data.user)
        );

        showToast("Login successful!", "Welcome back to Splendid Studio.");

        window.location.href = "dashboard.html";

    } catch (error) {
        console.error("Login error:", error);

            showToast(
                "Connection problem",
                "Unable to connect to Splendid Studio. Please try again.",
                "error"
            );
    }
});
