const express = require("express");
const Order = require("../models/orderModel");
const path = require("path");
const fs = require("fs");
const {
    requireAuth,
    requireAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();

/*
 * All routes in this file require:
 * 1. A valid login token
 * 2. Admin role
 */
router.use(requireAuth, requireAdmin);


/*
 * GET /api/admin/orders
 *
 * Get all orders for the admin dashboard.
 */
router.get("/notifications", async (req, res) => {
    try {
        const count = await Order.countDocuments({
            adminSeen: false
        });

        return res.json({
            success: true,
            count
        });

    } catch (error) {
        console.error(
            "Admin notification count error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to fetch notifications."
        });
    }
});


router.patch("/notifications/read", async (req, res) => {
    try {
        const result = await Order.updateMany(
            {
                adminSeen: false
            },
            {
                $set: {
                    adminSeen: true
                }
            }
        );

        return res.json({
            success: true,
            message: "Notifications marked as read.",
            updated: result.modifiedCount
        });

    } catch (error) {
        console.error(
            "Admin mark notifications read error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to mark notifications as read."
        });
    }
});


router.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find()
            .sort({ createdAt: -1 })
            .lean();

        return res.json({
            success: true,
            orders
        });

    } catch (error) {
        console.error("Admin fetch orders error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch admin orders."
        });
    }
});


/*
 * GET /api/admin/orders/:orderId/files/:fileId
 *
 * Securely open/download one order attachment.
 */
router.get(
    "/orders/:orderId/files/:fileId",
    async (req, res) => {
        try {

            const order =
                await Order.findById(
                    req.params.orderId
                );

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found."
                });
            }


            const file =
                order.files.id(
                    req.params.fileId
                );

            if (!file) {
                return res.status(404).json({
                    success: false,
                    message: "Attachment not found."
                });
            }


            if (!file.path) {
                return res.status(404).json({
                    success: false,
                    message: "Attachment file is unavailable."
                });
            }


            const filename =
                path.basename(
                    file.path
                );

            const uploadDirectory =
                path.join(
                    __dirname,
                    "..",
                    "uploads",
                    "orders"
                );

            const filePath =
                path.join(
                    uploadDirectory,
                    filename
                );


            if (!fs.existsSync(filePath)) {
                return res.status(404).json({
                    success: false,
                    message: "Attachment file no longer exists."
                });
            }


            return res.sendFile(
                filePath
            );

        } catch (error) {

            console.error(
                "Admin attachment error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to open attachment."
            });
        }
    }
);



/*
 * GET /api/admin/orders/:id
 *
 * Get one specific order.
 */
router.get("/orders/:id", async (req, res) => {
    try {
        const order = await Order.findById(
            req.params.id
        ).lean();

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        return res.json({
            success: true,
            order
        });

    } catch (error) {
        console.error(
            "Admin fetch order error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Unable to fetch order."
        });
    }
});


/*
 * PATCH /api/admin/orders/:id/status
 *
 * Update an order's status.
 */
router.patch(
    "/orders/:id/status",
    async (req, res) => {
        try {
            const {
                status
            } = req.body;

            const allowedStatuses = [
                "Pending",
                "In Progress",
                "Ready",
                "Completed"
            ];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid order status."
                });
            }

            const order =
                await Order.findByIdAndUpdate(
                    req.params.id,
                    {
                        status
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                ).lean();

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found."
                });
            }

            return res.json({
                success: true,
                message: "Order status updated successfully.",
                order
            });

        } catch (error) {
            console.error(
                "Admin update order status error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Unable to update order status."
            });
        }
    }
);


module.exports = router;
