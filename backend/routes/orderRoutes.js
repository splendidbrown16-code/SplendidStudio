const express = require("express");
const Order = require("../models/orderModel");
const upload = require("../middleware/uploadMiddleware");
const { requireAuth } = require("../middleware/authMiddleware");
const { sendNewOrderNotification } = require("../services/emailService");

const router = express.Router();

/*
 * TEMPORARY FILE UPLOAD
 *
 * Files are physically saved to:
 * backend/uploads/orders/
 *
 * The returned metadata is later attached to
 * the final order when the customer submits it.
 */
router.post(
    "/upload",
    requireAuth,
    upload.array("files", 10),
    async (req, res) => {
        try {
            const files = Array.isArray(req.files)
                ? req.files.map((file) => ({
                    name: file.originalname,
                    type: file.mimetype,
                    size: file.size,
                    filename: file.filename,
                    path: `/uploads/orders/${file.filename}`
                }))
                : [];

            return res.status(201).json({
                success: true,
                message: "Files uploaded successfully.",
                files
            });

        } catch (error) {
            console.error(
                "File upload error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to upload files."
            });
        }
    }
);


/*
 * GET CUSTOMER ORDERS
 *
 * Customers can only see orders belonging
 * to their authenticated account.
 */
router.get(
    "/",
    requireAuth,
    async (req, res) => {
        try {
            const orders = await Order.find({
                user: req.user.userId
            })
                .sort({ createdAt: -1 })
                .lean();

            return res.json({
                success: true,
                orders
            });

        } catch (error) {
            console.error(
                "Fetch orders error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to fetch orders."
            });
        }
    }
);


/*
 * CREATE ORDER
 */
router.post(
    "/",
    requireAuth,
    async (req, res) => {
        try {
            const {
                service,
                orderType,
                description
            } = req.body;

            let files = req.body.files;

            if (!service || !orderType) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Service and order type are required."
                });
            }

            if (!Array.isArray(files)) {
                files = [];
            }

            while (
                files.length === 1 &&
                Array.isArray(files[0])
            ) {
                files = files[0];
            }

            files = files
                .filter(
                    (file) =>
                        file &&
                        typeof file === "object" &&
                        !Array.isArray(file)
                )
                .map((file) => ({
                    name: String(file.name || ""),
                    type: String(file.type || ""),
                    size: Number(file.size || 0),
                    filename: String(
                        file.filename || ""
                    ),
                    path: String(
                        file.path || ""
                    )
                }));

            const order = await Order.create({
                user: req.user.userId,
                service,
                orderType,
                description: description || "",
                files
            });

            try {
                await sendNewOrderNotification(order);
            } catch (emailError) {
                console.error(
                    "New order email notification error:",
                    emailError
                );
            }

            return res.status(201).json({
                success: true,
                message:
                    "Order submitted successfully.",
                order: {
                    id: order._id,
                    service: order.service,
                    orderType: order.orderType,
                    status: order.status,
                    createdAt: order.createdAt
                }
            });

        } catch (error) {
            console.error(
                "Create order error:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Unable to submit order."
            });
        }
    }
);


module.exports = router;
