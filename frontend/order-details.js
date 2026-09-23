document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(
        window.location.search
    );

    const orderId = params.get("id");

    const orderIdElement =
        document.getElementById("detail-order-id");

    const serviceElement =
        document.getElementById("detail-service");

    const statusElement =
        document.getElementById("detail-status");

    const orderTypeElement =
        document.getElementById("detail-order-type");

    const descriptionElement =
        document.getElementById("detail-description");

    const dateElement =
        document.getElementById("detail-order-date");

    const filesElement =
        document.getElementById("detail-files");


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
        "design-print-delivery":
            "Design + Printing + Delivery"
    };


    function formatName(value) {

        if (!value) {
            return "Order";
        }

        return value
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, letter =>
                letter.toUpperCase()
            );
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
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    }


    function setProgress(status) {

        const steps = {
            received: document.querySelector(
                '[data-progress="received"]'
            ),
            designing: document.querySelector(
                '[data-progress="designing"]'
            ),
            printing: document.querySelector(
                '[data-progress="printing"]'
            ),
            ready: document.querySelector(
                '[data-progress="ready"]'
            ),
            completed: document.querySelector(
                '[data-progress="completed"]'
            )
        };

        Object.values(steps).forEach(step => {

            if (!step) {
                return;
            }

            step.classList.remove(
                "completed",
                "active"
            );
        });


        const normalizedStatus =
            String(status || "Pending")
                .toLowerCase();

        updateProgressDescriptions(status);


        if (normalizedStatus === "pending") {

            steps.received?.classList.add(
                "completed"
            );

            steps.received?.classList.add(
                "active"
            );

            return;
        }


        if (normalizedStatus === "in progress") {

            steps.received?.classList.add(
                "completed"
            );

            steps.designing?.classList.add(
                "active"
            );

            return;
        }


        if (normalizedStatus === "ready") {

            steps.received?.classList.add(
                "completed"
            );

            steps.designing?.classList.add(
                "completed"
            );

            steps.printing?.classList.add(
                "completed"
            );

            steps.ready?.classList.add(
                "active"
            );

            return;
        }


        if (normalizedStatus === "completed") {

            Object.values(steps).forEach(step => {

                step?.classList.add(
                    "completed"
                );

            });

            return;
        }
    }


    function updateProgressDescriptions(status) {

        const normalizedStatus =
            String(status || "Pending").toLowerCase();

        const descriptions = {
            received: "Your order has been received.",
            designing: "Your design is currently being worked on.",
            printing: "Printing will begin after the design is approved.",
            ready: "Your order will be ready for pickup or delivery.",
            completed: "Your order has been completed successfully. ✅"
        };

        const currentIndex = {
            "pending": 0,
            "in progress": 1,
            "ready": 3,
            "completed": 4
        }[normalizedStatus] ?? 0;

        const steps = [
            "received",
            "designing",
            "printing",
            "ready",
            "completed"
        ];

        steps.forEach((stepName, index) => {

            const step =
                document.querySelector(
                    `[data-progress="${stepName}"]`
                );

            if (!step) {
                return;
            }

            const span = step.querySelector("span");

            if (!span) {
                return;
            }

            if (
                normalizedStatus === "completed" &&
                stepName === "completed"
            ) {
                span.textContent =
                    descriptions.completed;
                return;
            }

            if (index < currentIndex) {

                span.textContent =
                    "Step completed.";

                return;
            }

            if (index === currentIndex) {

                if (normalizedStatus === "pending") {
                    span.textContent =
                        "Your order has been received and is waiting to be started.";
                } else if (normalizedStatus === "in progress") {
                    span.textContent =
                        "Your order is currently being worked on.";
                } else if (normalizedStatus === "ready") {
                    span.textContent =
                        "Your order is ready for pickup or delivery.";
                }

                return;
            }

            span.textContent =
                descriptions[stepName];
        });
    }


    function renderFiles(files) {

        if (!filesElement) {
            return;
        }

        if (!Array.isArray(files) || !files.length) {

            filesElement.innerHTML = `
                <div class="order-files-empty">
                    <ion-icon name="document-outline"></ion-icon>
                    <span>No attachments were submitted.</span>
                </div>
            `;

            return;
        }


        filesElement.innerHTML = files.map(file => {

            const name =
                file?.name ||
                "Unnamed file";

            return `
                <div class="order-file-item">

                    <div class="order-file-icon">
                        <ion-icon name="document-outline"></ion-icon>
                    </div>

                    <div class="order-file-info">
                        <strong>${name}</strong>
                    </div>

                </div>
            `;

        }).join("");
    }


    function showError(message) {

        if (orderIdElement) {
            orderIdElement.textContent =
                "Order unavailable";
        }

        if (serviceElement) {
            serviceElement.textContent =
                message;
        }

        if (statusElement) {
            statusElement.textContent =
                "Unavailable";

            statusElement.className =
                "order-status";
        }

        if (filesElement) {
            filesElement.innerHTML = `
                <div class="order-files-empty">
                    <ion-icon name="alert-circle-outline"></ion-icon>
                    <span>${message}</span>
                </div>
            `;
        }
    }


    if (!orderId) {

        showError(
            "No order was selected."
        );

        return;
    }


    try {

        const response =
            await fetch("/api/orders");

        const data =
            await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to load orders."
            );
        }


        const order =
            Array.isArray(data.orders)
                ? data.orders.find(
                    item =>
                        String(item._id) ===
                        String(orderId)
                )
                : null;


        if (!order) {

            showError(
                "This order could not be found."
            );

            return;
        }


        const serviceName =
            getServiceName(order.service);

        const orderType =
            getOrderTypeName(order.orderType);

        const status =
            order.status || "Pending";


        if (orderIdElement) {
            orderIdElement.textContent =
                `#SS-${String(order._id)
                    .slice(-6)
                    .toUpperCase()}`;
        }


        if (serviceElement) {
            serviceElement.textContent =
                serviceName;
        }


        if (statusElement) {

            statusElement.textContent =
                status;

            statusElement.className =
                `order-status ${getStatusClass(status)}`;
        }


        if (orderTypeElement) {
            orderTypeElement.textContent =
                orderType;
        }


        if (descriptionElement) {

            descriptionElement.textContent =
                order.description?.trim() ||
                "No description provided.";
        }


        if (dateElement) {

            dateElement.textContent =
                formatDate(order.createdAt);
        }


        renderFiles(order.files);

        setProgress(status);

    } catch (error) {

        console.error(
            "Load order details error:",
            error
        );

        showError(
            "Unable to load this order."
        );
    }

});
