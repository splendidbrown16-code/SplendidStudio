document.addEventListener("DOMContentLoaded", () => {

    const ordersList = document.querySelector(".orders-list");
    const filterButtons = document.querySelectorAll(".order-filter");

    let allOrders = [];

    const serviceNames = {
        "flyer-handbill": "Flyer / Handbill",
        "graphic-design": "Graphic Design",
        "printing": "Printing",
        "flex-banner": "Flex / Banner",
        "business-card": "Business Card",
        "id-card": "ID Card",
        "invitation-card": "Invitation Card",
        "social-media": "Social Media Graphics",
        "sticker-label": "Stickers & Labels",
        "logo-branding": "Logo & Branding",
        "brochure": "Brochure",
        "church-material": "Church Materials",
        "custom-request": "Custom Request",
        "custom": "Custom Request"
    };

    const orderTypeNames = {
        "design": "Design",
        "print": "Printing",
        "design-print": "Design + Printing",
        "design-print-delivery": "Design + Printing + Delivery"
    };

    function formatName(value) {
        if (!value) return "Order";

        return value
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, letter => letter.toUpperCase());
    }

    function getServiceName(service) {
        return (
            serviceNames[service] ||
            formatName(service)
        );
    }

    function getOrderTypeName(orderType) {
        return (
            orderTypeNames[orderType] ||
            formatName(orderType)
        );
    }

    function getStatusClass(status) {
        return String(status || "Pending")
            .toLowerCase()
            .replace(/\s+/g, "-");
    }

    function formatDate(dateValue) {

        if (!dateValue) {
            return "Date unavailable";
        }

        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return "Date unavailable";
        }

        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    }

    function getOrderId(order) {

        if (!order || !order._id) {
            return "#SS-ORDER";
        }

        return `#SS-${String(order._id).slice(-6).toUpperCase()}`;
    }

    function renderOrders(orders) {

        if (!ordersList) {
            return;
        }

        if (!orders.length) {

            ordersList.innerHTML = `
                <div class="orders-empty">
                    <div class="orders-empty-icon">
                        <ion-icon name="receipt-outline"></ion-icon>
                    </div>

                    <h2>No orders found</h2>

                    <p>
                        Your submitted orders will appear here.
                    </p>

                    <a href="order.html" class="create-order-btn">
                        <ion-icon name="add-outline"></ion-icon>
                        <span>Create New Order</span>
                    </a>
                </div>
            `;

            return;
        }

        ordersList.innerHTML = orders.map(order => {

            const serviceName =
                getServiceName(order.service);

            const orderType =
                getOrderTypeName(order.orderType);

            const status =
                order.status || "Pending";

            const statusClass =
                getStatusClass(status);

            const description =
                order.description?.trim();

            return `
                <article class="order-row">

                    <div class="order-main">

                        <div class="order-icon">
                            <ion-icon name="color-palette-outline"></ion-icon>
                        </div>

                        <div class="order-info">

                            <div class="order-top">

                                <span class="order-number">
                                    ${getOrderId(order)}
                                </span>

                                <span class="order-status ${statusClass}">
                                    ${status === "Completed"
                                        ? '<ion-icon name="checkmark-circle-outline"></ion-icon> Completed'
                                        : status}
                                </span>

                            </div>

                            <h2>
                                ${serviceName}
                            </h2>

                            <p>
                                ${orderType}

                                ${
                                    description
                                        ? `<span>•</span> ${description}`
                                        : ""
                                }
                            </p>

                        </div>

                    </div>

                    <div class="order-meta">

                        <strong>
                            Price pending
                        </strong>

                        <span>
                            ${formatDate(order.createdAt)}
                        </span>

                    </div>

                    <a
                        href="order-details.html?id=${encodeURIComponent(order._id)}"
                        class="order-details"
                    >
                        View Details
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </a>

                </article>
            `;

        }).join("");
    }

    function filterOrders(status) {

        if (status === "All") {
            renderOrders(allOrders);
            return;
        }

        const filtered =
            allOrders.filter(
                order =>
                    String(order.status || "Pending") === status
            );

        renderOrders(filtered);
    }

    async function loadOrders() {

        if (!ordersList) {
            return;
        }

        ordersList.innerHTML = `
            <div class="orders-loading">
                <ion-icon name="sync-outline"></ion-icon>
                <span>Loading your orders...</span>
            </div>
        `;

        try {

            const token =
                localStorage.getItem("splendidToken");

            if (!token) {
                window.location.href = "login.html";
                return;
            }

            const response =
                await fetch("/api/orders", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            const data =
                await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                    "Unable to load orders."
                );
            }

            allOrders =
                Array.isArray(data.orders)
                    ? data.orders
                    : [];

            renderOrders(allOrders);

        } catch (error) {

            console.error(
                "Load orders error:",
                error
            );

            ordersList.innerHTML = `
                <div class="orders-empty">

                    <div class="orders-empty-icon">
                        <ion-icon name="alert-circle-outline"></ion-icon>
                    </div>

                    <h2>Unable to load orders</h2>

                    <p>
                        Please check your connection and try again.
                    </p>

                    <button
                        type="button"
                        class="create-order-btn"
                        id="retry-orders-btn"
                    >
                        <ion-icon name="refresh-outline"></ion-icon>
                        <span>Try Again</span>
                    </button>

                </div>
            `;

            const retryButton =
                document.getElementById(
                    "retry-orders-btn"
                );

            if (retryButton) {
                retryButton.addEventListener(
                    "click",
                    loadOrders
                );
            }
        }
    }

    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    item =>
                        item.classList.remove("active")
                );

                button.classList.add("active");

                filterOrders(
                    button.textContent.trim()
                );
            }
        );

    });

    loadOrders();

});
