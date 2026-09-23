const token = localStorage.getItem("splendidToken");
const userData = localStorage.getItem("splendidUser");

if (!token || !userData) {
    window.location.href = "login.html";
}

let user;

try {
    user = JSON.parse(userData);
} catch (error) {
    localStorage.removeItem("splendidToken");
    localStorage.removeItem("splendidUser");
    window.location.href = "login.html";
}

const name = user.name || "Splendid Studio Customer";
const email = user.email || "";
const role = user.role || "customer";
const firstLetter = name.charAt(0).toUpperCase();

document.getElementById("headerName").textContent = name;
document.getElementById("headerRole").textContent =
    role === "admin" ? "Administrator" : "Customer";

document.getElementById("headerAvatar").textContent =
    firstLetter;

document.getElementById("accountAvatar").textContent =
    firstLetter;

document.getElementById("accountName").textContent =
    name;

document.getElementById("accountEmail").textContent =
    email;

if (role === "admin") {
    document.getElementById("adminSection").innerHTML = `
        <a href="admin.html" class="account-item admin-item">
            <ion-icon name="shield-checkmark-outline"></ion-icon>
            <div class="account-item-content">
                <strong>Admin Dashboard</strong>
                <span>Manage orders and update their status</span>
            </div>
            <span class="account-arrow">›</span>
        </a>
    `;
}

/* MARK ADMIN ORDER NOTIFICATIONS AS READ */

async function markAdminNotificationsRead() {

    if (role !== "admin") {
        return;
    }

    try {
        await fetch(
            "/api/admin/notifications/read",
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    } catch (error) {
        console.error(
            "Admin notification read error:",
            error
        );
    }
}

markAdminNotificationsRead();

/* LOGOUT */

document
    .getElementById("logoutButton")
    .addEventListener("click", (event) => {

        event.preventDefault();

        localStorage.removeItem("splendidToken");
        localStorage.removeItem("splendidUser");

        window.location.href = "login.html";
    });
