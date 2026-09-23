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

if (user.role !== "admin") {
    window.location.href = "dashboard.html";
}


const ordersContainer =
    document.getElementById("adminOrders");

const totalOrders =
    document.getElementById("totalOrders");

const pendingOrders =
    document.getElementById("pendingOrders");

const progressOrders =
    document.getElementById("progressOrders");

const completedOrders =
    document.getElementById("completedOrders");

const searchInput =
    document.getElementById("orderSearch");

const statusFilter =
    document.getElementById("statusFilter");


let orders = [];

let selectedOrderId = null;


function formatService(service) {

    const services = {
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

    return services[service] || service;
}


function formatOrderType(orderType) {

    const types = {
        "design": "Design",
        "print": "Print",
        "design-print": "Design + Print",
        "design-print-delivery": "Design + Print + Delivery"
    };

    return types[orderType] || orderType;
}


function createOrderId(id) {

    return `#SS-${String(id)
        .slice(-6)
        .toUpperCase()}`;
}


function formatDate(date) {

    return new Date(date).toLocaleString(
        "en-NG",
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );
}


function escapeHtml(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function updateStats() {

    totalOrders.textContent =
        orders.length;

    pendingOrders.textContent =
        orders.filter(
            order => order.status === "Pending"
        ).length;

    progressOrders.textContent =
        orders.filter(
            order => order.status === "In Progress"
        ).length;

    completedOrders.textContent =
        orders.filter(
            order => order.status === "Completed"
        ).length;
}


function renderOrders() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();

    const selectedStatus =
        statusFilter.value;


    const filteredOrders =
        orders.filter(order => {

            const matchesSearch =
                !search ||
                createOrderId(order._id)
                    .toLowerCase()
                    .includes(search) ||
                formatService(order.service)
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                selectedStatus === "all" ||
                order.status === selectedStatus;


            return matchesSearch &&
                   matchesStatus;
        });


    if (!filteredOrders.length) {

        ordersContainer.innerHTML = `
            <div class="admin-empty">
                No orders found.
            </div>
        `;

        return;
    }


    ordersContainer.innerHTML =
        filteredOrders.map(order => `

            <article class="admin-order">

                <div class="admin-order-main">

                    <div class="admin-order-id">
                        ${createOrderId(order._id)}
                    </div>

                    <div class="admin-order-service">
                        ${escapeHtml(
                            formatService(order.service)
                        )}
                    </div>

                    <div class="admin-order-meta">
                        ${escapeHtml(
                            formatOrderType(
                                order.orderType
                            )
                        )}
                        •
                        ${formatDate(order.createdAt)}
                    </div>

                </div>


                <div class="admin-status">
                    ${escapeHtml(order.status)}
                </div>


                <button
                    type="button"
                    class="admin-manage-btn"
                    data-order-id="${order._id}"
                >
                    Manage
                </button>

            </article>

        `).join("");


    document
        .querySelectorAll(".admin-manage-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openOrder(
                        button.dataset.orderId
                    );

                }
            );

        });
}


function openOrder(orderId) {

    const order =
        orders.find(
            item =>
                String(item._id) ===
                String(orderId)
        );


    if (!order) {
        return;
    }


    selectedOrderId =
        order._id;


    const files =
        Array.isArray(order.files)
            ? order.files
            : [];


    const filesHtml =
        files.length
            ? files.map(file => {

                const state =
                    file._id
                        ? getAttachmentState(
                            order._id,
                            file._id
                        )
                        : {};

                const openedClass =
                    state.opened
                        ? "attachment-action-completed"
                        : "";

                const downloadedClass =
                    state.downloaded
                        ? "attachment-action-completed"
                        : "";

                const openedText =
                    state.opened
                        ? "✓ Opened"
                        : "Open";

                const downloadedText =
                    state.downloaded
                        ? "✓ Downloaded"
                        : "Download";


                return `
                    <div
                        class="admin-file"
                        data-file-id="${escapeHtml(
                            file._id || ""
                        )}"
                    >
                        <span>📎</span>

                        <span class="admin-file-name">
                            ${escapeHtml(
                                file.name ||
                                "Unnamed file"
                            )}
                        </span>

                        ${
                            file._id
                                ? `
                                    <button
                                        type="button"
                                        class="admin-file-action ${openedClass}"
                                        data-file-action="open"
                                        data-file-id="${escapeHtml(
                                            file._id
                                        )}"
                                    >
                                        ${openedText}
                                    </button>

                                    <button
                                        type="button"
                                        class="admin-file-action ${downloadedClass}"
                                        data-file-action="download"
                                        data-file-id="${escapeHtml(
                                            file._id
                                        )}"
                                    >
                                        ${downloadedText}
                                    </button>
                                `
                                : ""
                        }
                    </div>
                `;
            }).join("")
            : `
                <div class="admin-no-files">
                    No attachments submitted.
                </div>
            `;


    const existingModal =
        document.getElementById(
            "adminOrderModal"
        );


    if (existingModal) {
        existingModal.remove();
    }


    const modal =
        document.createElement("div");

    modal.id =
        "adminOrderModal";

    modal.className =
        "admin-modal";


    modal.innerHTML = `

        <div class="admin-modal-backdrop"></div>

        <div class="admin-modal-panel">

            <button
                type="button"
                class="admin-modal-close"
                id="closeAdminModal"
            >
                ×
            </button>


            <div class="admin-modal-eyebrow">
                ORDER MANAGEMENT
            </div>


            <h2>
                ${createOrderId(order._id)}
            </h2>


            <div class="admin-detail-grid">

                <div>
                    <span>Service</span>
                    <strong>
                        ${escapeHtml(
                            formatService(
                                order.service
                            )
                        )}
                    </strong>
                </div>

                <div>
                    <span>Order Type</span>
                    <strong>
                        ${escapeHtml(
                            formatOrderType(
                                order.orderType
                            )
                        )}
                    </strong>
                </div>

                <div>
                    <span>Submitted</span>
                    <strong>
                        ${formatDate(
                            order.createdAt
                        )}
                    </strong>
                </div>

                <div>
                    <span>Current Status</span>
                    <strong>
                        ${escapeHtml(
                            order.status
                        )}
                    </strong>
                </div>

            </div>


            <div class="admin-detail-section">

                <span class="admin-detail-label">
                    CUSTOMER DESCRIPTION
                </span>

                <div class="admin-description">
                    ${escapeHtml(
                        order.description ||
                        "No description provided."
                    )}
                </div>

            </div>


            <div class="admin-detail-section">

                <span class="admin-detail-label">
                    ATTACHMENTS
                </span>

                <div class="admin-files">
                    ${filesHtml}
                </div>

            </div>


            <div class="admin-status-control">

                <label for="adminStatusSelect">
                    Update Status
                </label>

                <select id="adminStatusSelect">

                    <option
                        value="Pending"
                        ${order.status === "Pending"
                            ? "selected"
                            : ""}
                    >
                        Pending
                    </option>

                    <option
                        value="In Progress"
                        ${order.status === "In Progress"
                            ? "selected"
                            : ""}
                    >
                        In Progress
                    </option>

                    <option
                        value="Ready"
                        ${order.status === "Ready"
                            ? "selected"
                            : ""}
                    >
                        Ready
                    </option>

                    <option
                        value="Completed"
                        ${order.status === "Completed"
                            ? "selected"
                            : ""}
                    >
                        Completed
                    </option>

                </select>


                <button
                    type="button"
                    id="updateOrderStatus"
                    class="admin-update-btn"
                >
                    Update Status
                </button>

            </div>

        </div>
    `;


    document.body.appendChild(modal);


    document
        .getElementById("closeAdminModal")
        .addEventListener(
            "click",
            closeOrder
        );


    document
        .querySelector(
            ".admin-modal-backdrop"
        )
        .addEventListener(
            "click",
            closeOrder
        );


    document
        .getElementById(
            "updateOrderStatus"
        )
        .addEventListener(
            "click",
            updateOrderStatus
        );
}


function closeOrder() {

    const modal =
        document.getElementById(
            "adminOrderModal"
        );

    if (modal) {
        modal.remove();
    }

    selectedOrderId = null;
}


async function updateOrderStatus() {

    if (!selectedOrderId) {
        return;
    }


    const select =
        document.getElementById(
            "adminStatusSelect"
        );

    const button =
        document.getElementById(
            "updateOrderStatus"
        );


    const status =
        select.value;


    button.disabled = true;

    button.textContent =
        "Updating...";


    try {

        const response =
            await fetch(
                `/api/admin/orders/${selectedOrderId}/status`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        status
                    })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to update order status."
            );

        }


        const index =
            orders.findIndex(
                order =>
                    String(order._id) ===
                    String(selectedOrderId)
            );


        if (index !== -1) {

            orders[index] =
                data.order;

        }


        updateStats();

        renderOrders();

        closeOrder();


    } catch (error) {

        console.error(
            "Update order status error:",
            error
        );


        button.disabled = false;

        button.textContent =
            "Update Status";

        alert(
            error.message ||
            "Unable to update order status."
        );
    }
}


async function loadOrders() {

    try {

        const response =
            await fetch(
                "/api/admin/orders",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            if (
                response.status === 401 ||
                response.status === 403
            ) {

                localStorage.removeItem(
                    "splendidToken"
                );

                window.location.href =
                    "login.html";

                return;
            }


            throw new Error(
                data.message ||
                "Unable to load orders."
            );
        }


        orders =
            Array.isArray(data.orders)
                ? data.orders
                : [];


        updateStats();

        renderOrders();


    } catch (error) {

        console.error(
            "Admin orders error:",
            error
        );


        ordersContainer.innerHTML = `
            <div class="admin-empty">
                Unable to load orders.
            </div>
        `;
    }
}


searchInput.addEventListener(
    "input",
    renderOrders
);


statusFilter.addEventListener(
    "change",
    renderOrders
);


/* =========================================
   ADMIN ATTACHMENT ACTIONS
========================================= */

function getAttachmentStateKey(orderId, fileId) {

    return `splendidAttachmentState:${orderId}:${fileId}`;
}


function getAttachmentState(orderId, fileId) {

    try {

        const saved =
            localStorage.getItem(
                getAttachmentStateKey(
                    orderId,
                    fileId
                )
            );

        return saved
            ? JSON.parse(saved)
            : {};

    } catch (error) {

        return {};
    }
}


function saveAttachmentState(
    orderId,
    fileId,
    action
) {

    try {

        const current =
            getAttachmentState(
                orderId,
                fileId
            );

        current[action] = true;

        localStorage.setItem(
            getAttachmentStateKey(
                orderId,
                fileId
            ),
            JSON.stringify(current)
        );

    } catch (error) {

        console.warn(
            "Unable to save attachment state:",
            error
        );
    }
}


function applyAttachmentState(
    button,
    orderId,
    fileId
) {

    const state =
        getAttachmentState(
            orderId,
            fileId
        );


    const action =
        button.dataset.fileAction;


    if (
        action === "open" &&
        state.opened
    ) {

        button.textContent =
            "✓ Opened";

        button.classList.add(
            "attachment-action-completed"
        );

        return;
    }


    if (
        action === "download" &&
        state.downloaded
    ) {

        button.textContent =
            "✓ Downloaded";

        button.classList.add(
            "attachment-action-completed"
        );

        return;
    }


    button.classList.remove(
        "attachment-action-completed"
    );
}


function restoreAttachmentStates() {

    document
        .querySelectorAll(
            "[data-file-action]"
        )
        .forEach((button) => {

            const fileId =
                button.dataset.fileId;

            if (!fileId) {
                return;
            }


            const fileElement =
                button.closest(
                    ".admin-file"
                );

            if (!fileElement) {
                return;
            }


            const modal =
                button.closest(
                    ".admin-modal"
                );


            let orderId =
                modal?.dataset.orderId ||
                "";


            if (!orderId) {

                const matchingOrder =
                    orders.find(
                        (order) =>
                            Array.isArray(
                                order.files
                            ) &&
                            order.files.some(
                                (file) =>
                                    String(
                                        file._id
                                    ) ===
                                    String(
                                        fileId
                                    )
                            )
                    );


                if (matchingOrder) {

                    orderId =
                        matchingOrder._id;
                }
            }


            if (orderId) {

                applyAttachmentState(
                    button,
                    orderId,
                    fileId
                );
            }
        });
}


document.addEventListener(
    "click",
    async (event) => {

        const button =
            event.target.closest(
                "[data-file-action]"
            );


        if (!button) {
            return;
        }


        const action =
            button.dataset.fileAction;


        const fileId =
            button.dataset.fileId;


        const modal =
            button.closest(
                ".admin-modal"
            );


        let orderId = "";


        if (modal) {

            orderId =
                modal.dataset.orderId ||
                "";
        }


        if (!orderId) {

            const fileElement =
                button.closest(
                    ".admin-file"
                );


            const orderElement =
                fileElement
                    ? fileElement.closest(
                        "[data-order-id]"
                    )
                    : null;


            if (orderElement) {

                orderId =
                    orderElement.dataset.orderId ||
                    "";
            }
        }


        if (!orderId) {

            const matchingOrder =
                orders.find(
                    (order) =>
                        Array.isArray(
                            order.files
                        ) &&
                        order.files.some(
                            (file) =>
                                String(
                                    file._id
                                ) ===
                                String(fileId)
                        )
                );


            if (matchingOrder) {

                orderId =
                    matchingOrder._id;
            }
        }


        if (!orderId || !fileId) {

            alert(
                "Unable to locate this attachment."
            );

            return;
        }


        const originalText =
            button.textContent;


        button.disabled = true;


        button.textContent =
            action === "download"
                ? "Downloading..."
                : "Opening...";


        try {

            const response =
                await fetch(
                    `/api/admin/orders/${encodeURIComponent(
                        orderId
                    )}/files/${encodeURIComponent(
                        fileId
                    )}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


            if (!response.ok) {

                let message =
                    "Unable to access attachment.";


                try {

                    const data =
                        await response.json();

                    message =
                        data.message ||
                        message;

                } catch (error) {}


                throw new Error(
                    message
                );
            }


            const blob =
                await response.blob();


            if (!blob.size) {

                throw new Error(
                    "The attachment is empty."
                );
            }


            const url =
                URL.createObjectURL(
                    blob
                );


            if (action === "download") {

                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    url;


                link.download =
                    button
                        .closest(".admin-file")
                        ?.querySelector(
                            ".admin-file-name"
                        )
                        ?.textContent
                        ?.trim() ||
                    "attachment";


                document.body.appendChild(
                    link
                );


                link.click();


                link.remove();


                saveAttachmentState(
                    orderId,
                    fileId,
                    "downloaded"
                );


                button.textContent =
                    "✓ Downloaded";


                button.classList.add(
                    "attachment-action-completed"
                );


                setTimeout(
                    () => {
                        URL.revokeObjectURL(
                            url
                        );
                    },
                    1500
                );


            } else {

                const newWindow =
                    window.open(
                        "",
                        "_blank"
                    );


                if (!newWindow) {

                    URL.revokeObjectURL(
                        url
                    );


                    throw new Error(
                        "Your browser blocked the new window. Please allow pop-ups for this site."
                    );
                }


                newWindow.location.href =
                    url;


                saveAttachmentState(
                    orderId,
                    fileId,
                    "opened"
                );


                button.textContent =
                    "✓ Opened";


                button.classList.add(
                    "attachment-action-completed"
                );


                setTimeout(
                    () => {
                        URL.revokeObjectURL(
                            url
                        );
                    },
                    60000
                );
            }


        } catch (error) {

            console.error(
                "Attachment action error:",
                error
            );


            alert(
                error.message ||
                "Unable to access attachment."
            );


            button.textContent =
                originalText;


            button.classList.remove(
                "attachment-action-completed"
            );


        } finally {

            button.disabled = false;
        }
    }
);


loadOrders();
