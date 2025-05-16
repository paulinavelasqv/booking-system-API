const {Schema, model} = require("mongoose");

const AvailabilitySchema = Schema({
    dayOfWeek: {
        type: Number,
        required: true
    }, // 0 (domingo) a 6 (sábado)
    startTime: {
        type: String,
        required: true
    }, // formato "HH:mm
    endTime: {
        type: String,
        required: true
    } // formato "HH:mm"
});

AvailabilitySchema.index({ dayOfWeek: 1, startTime: 1, endTime: 1 }, { unique: true });

module.exports = model("Availability", AvailabilitySchema);