const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: ""
        },

        type: {
            type: String,
            default: ""
        },

        size: {
            type: Number,
            default: 0
        },

        filename: {
            type: String,
            default: ""
        },

        path: {
            type: String,
            default: ""
        }
    },
    {
        _id: true
    }
);

const orderSchema = new mongoose.Schema(
    {
        service: {
            type: String,
            required: true
        },

        orderType: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ""
        },

        files: {
            type: [fileSchema],
            default: []
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "In Progress",
                "Ready",
                "Completed"
            ],
            default: "Pending"
        },

        adminSeen: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);
