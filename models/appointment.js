const {Schema, model} = require("mongoose");

const AppointmentSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true
    },
    datetime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled'], default: 'active'
    }
});

AppointmentSchema.index({ datetime: 1, user: 1 }, { unique: true }); // evita duplicados por usuario en mismo horario

module.exports = model("Appointment", AppointmentSchema, "appointments");