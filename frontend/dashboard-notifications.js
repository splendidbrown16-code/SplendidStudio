const token = localStorage.getItem("splendidToken");
const userData = localStorage.getItem("splendidUser");

if (token && userData) {

    try {

        const user = JSON.parse(userData);

        if (user.role === "admin") {

            async function loadAccountNotification() {

                try {

                    const response = await fetch(
                        "/api/admin/notifications",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                    if (!response.ok) {
                        return;
                    }

                    const data =
                        await response.json();

                    const badge =
                        document.getElementById(
                            "accountNotificationBadge"
                        );

                    if (!badge) {
                        return;
                    }

                    if (
                        data.success &&
                        data.count > 0
                    ) {

                        badge.textContent =
                            data.count > 99
                                ? "99+"
                                : data.count;

                        badge.classList.add(
                            "visible"
                        );

                    } else {

                        badge.textContent = "";

                        badge.classList.remove(
                            "visible"
                        );
                    }

                } catch (error) {

                    console.error(
                        "Account notification error:",
                        error
                    );
                }
            }


            loadAccountNotification();


            setInterval(
                loadAccountNotification,
                15000
            );

        }

    } catch (error) {

        console.error(
            "Dashboard user data error:",
            error
        );

    }

}
