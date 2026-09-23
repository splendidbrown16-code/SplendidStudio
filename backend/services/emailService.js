const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

function getServiceName(service) {
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

function getOrderTypeName(orderType) {
    const types = {
        "design": "Design",
        "print": "Print",
        "design-print": "Design + Print",
        "design-print-delivery": "Design + Print + Delivery"
    };

    return types[orderType] || orderType;
}

function escapeHtml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

async function sendNewOrderNotification(order) {

    const orderId =
        `#SS-${String(order._id).slice(-6).toUpperCase()}`;

    const serviceName =
        getServiceName(order.service);

    const orderTypeName =
        getOrderTypeName(order.orderType);

    const description =
        order.description || "No description provided.";

    const submitted =
        new Date(order.createdAt).toLocaleString("en-NG", {
            dateStyle: "medium",
            timeStyle: "short"
        });

    const files =
        Array.isArray(order.files)
            ? order.files
            : [];

    const attachmentHtml =
        files.length
            ? files.map((file) => `
                <div style="
                    padding:10px 12px;
                    margin-bottom:8px;
                    border:1px solid #2a2a2a;
                    border-radius:10px;
                    background:#151515;
                    color:#d7d7d7;
                    font-size:13px;
                ">
                    📎 ${escapeHtml(file.name || "Unnamed file")}
                </div>
            `).join("")
            : `
                <div style="
                    padding:12px;
                    border:1px solid #2a2a2a;
                    border-radius:10px;
                    background:#151515;
                    color:#888;
                    font-size:13px;
                ">
                    No attachments
                </div>
            `;

    const attachmentText =
        files.length
            ? files.map(
                (file) =>
                    `- ${file.name || "Unnamed file"}`
              ).join("\n")
            : "No attachments";

    const message = `
NEW SPLENDID STUDIO ORDER

Order ID: ${orderId}

Service: ${serviceName}
Order Type: ${orderTypeName}

Description:
${description}

Attachments:
${attachmentText}

Status: ${order.status}

Submitted: ${submitted}

Splendid Studio
Design • Print • Deliver
`;

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Splendid Studio Order</title>
</head>

<body style="
    margin:0;
    padding:0;
    background:#080808;
    font-family:Arial,Helvetica,sans-serif;
    color:#ffffff;
">

<table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
        <td align="center" style="padding:30px 15px;">

            <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                    max-width:600px;
                    background:#101010;
                    border:1px solid #292929;
                    border-radius:18px;
                    overflow:hidden;
                "
            >

                <!-- Header -->
                <tr>
                    <td style="
                        padding:28px 25px;
                        background:#0b0b0b;
                        border-bottom:1px solid #292929;
                    ">

                        <div style="
                            color:#d4af37;
                            font-size:12px;
                            font-weight:bold;
                            letter-spacing:2px;
                            margin-bottom:8px;
                        ">
                            SPLENDID STUDIO
                        </div>

                        <div style="
                            font-size:25px;
                            font-weight:bold;
                            color:#ffffff;
                        ">
                            New Order Received
                        </div>

                        <div style="
                            margin-top:8px;
                            color:#888888;
                            font-size:13px;
                        ">
                            A new customer order has been submitted.
                        </div>

                    </td>
                </tr>

                <!-- Order ID -->
                <tr>
                    <td style="padding:25px 25px 10px;">

                        <div style="
                            color:#888888;
                            font-size:11px;
                            text-transform:uppercase;
                            letter-spacing:1.5px;
                            margin-bottom:7px;
                        ">
                            Order ID
                        </div>

                        <div style="
                            display:inline-block;
                            padding:10px 14px;
                            border-radius:10px;
                            background:#19160b;
                            border:1px solid #5a4815;
                            color:#d4af37;
                            font-size:17px;
                            font-weight:bold;
                        ">
                            ${escapeHtml(orderId)}
                        </div>

                    </td>
                </tr>

                <!-- Main Details -->
                <tr>
                    <td style="padding:15px 25px;">

                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>

                                <td width="50%" valign="top" style="padding-right:8px;">
                                    <div style="
                                        color:#888888;
                                        font-size:11px;
                                        text-transform:uppercase;
                                        letter-spacing:1px;
                                        margin-bottom:6px;
                                    ">
                                        Service
                                    </div>

                                    <div style="
                                        color:#ffffff;
                                        font-size:14px;
                                        font-weight:bold;
                                    ">
                                        ${escapeHtml(serviceName)}
                                    </div>
                                </td>

                                <td width="50%" valign="top" style="padding-left:8px;">
                                    <div style="
                                        color:#888888;
                                        font-size:11px;
                                        text-transform:uppercase;
                                        letter-spacing:1px;
                                        margin-bottom:6px;
                                    ">
                                        Order Type
                                    </div>

                                    <div style="
                                        color:#ffffff;
                                        font-size:14px;
                                        font-weight:bold;
                                    ">
                                        ${escapeHtml(orderTypeName)}
                                    </div>
                                </td>

                            </tr>
                        </table>

                    </td>
                </tr>

                <!-- Description -->
                <tr>
                    <td style="padding:10px 25px 20px;">

                        <div style="
                            color:#888888;
                            font-size:11px;
                            text-transform:uppercase;
                            letter-spacing:1px;
                            margin-bottom:8px;
                        ">
                            Customer Description
                        </div>

                        <div style="
                            padding:14px;
                            background:#151515;
                            border:1px solid #292929;
                            border-radius:10px;
                            color:#d8d8d8;
                            font-size:14px;
                            line-height:1.6;
                        ">
                            ${escapeHtml(description)}
                        </div>

                    </td>
                </tr>

                <!-- Attachments -->
                <tr>
                    <td style="padding:0 25px 20px;">

                        <div style="
                            color:#888888;
                            font-size:11px;
                            text-transform:uppercase;
                            letter-spacing:1px;
                            margin-bottom:8px;
                        ">
                            Submitted Files (${files.length})
                        </div>

                        ${attachmentHtml}

                    </td>
                </tr>

                <!-- Status -->
                <tr>
                    <td style="padding:5px 25px 25px;">

                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>

                                <td valign="middle">
                                    <div style="
                                        color:#888888;
                                        font-size:11px;
                                        text-transform:uppercase;
                                        letter-spacing:1px;
                                        margin-bottom:6px;
                                    ">
                                        Status
                                    </div>

                                    <span style="
                                        display:inline-block;
                                        padding:7px 12px;
                                        border-radius:20px;
                                        background:#19160b;
                                        border:1px solid #5a4815;
                                        color:#d4af37;
                                        font-size:12px;
                                        font-weight:bold;
                                    ">
                                        ${escapeHtml(order.status)}
                                    </span>
                                </td>

                                <td align="right" valign="middle">
                                    <div style="
                                        color:#888888;
                                        font-size:11px;
                                        text-transform:uppercase;
                                        letter-spacing:1px;
                                        margin-bottom:6px;
                                    ">
                                        Submitted
                                    </div>

                                    <div style="
                                        color:#d0d0d0;
                                        font-size:12px;
                                    ">
                                        ${escapeHtml(submitted)}
                                    </div>
                                </td>

                            </tr>
                        </table>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td align="center" style="
                        padding:22px;
                        background:#0b0b0b;
                        border-top:1px solid #292929;
                    ">

                        <div style="
                            color:#d4af37;
                            font-size:14px;
                            font-weight:bold;
                            margin-bottom:6px;
                        ">
                            SPLENDID STUDIO
                        </div>

                        <div style="
                            color:#777777;
                            font-size:12px;
                        ">
                            Design • Print • Deliver
                        </div>

                    </td>
                </tr>

            </table>

        </td>
    </tr>
</table>

</body>
</html>
`;

    await transporter.sendMail({
        from: `"Splendid Studio" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `🔔 New Splendid Studio Order ${orderId}`,
        text: message,
        html
    });
}

module.exports = {
    sendNewOrderNotification
};
