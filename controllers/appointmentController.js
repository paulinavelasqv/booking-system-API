const Appointment = require("../models/appointment");
const Availability = require("../models/availability");

const createAppointment = async (req, res) =>{

    try {
        const {dateTime} = req.body;

        if(!dateTime) return res.status(400).json({
            status: "error",
            message: "datetime es requerido."
        });

        const appointmentDate = new Date(dateTime);
        if(appointmentDate < new Date()){
            return res.status(400).json({
                status: "error",
                message: "No se puede agendar en el pasado."
            });
        }

        // Validacion de disponibilidad de cita

        // Extraer dia y hora
        const dayOfWeek = appointmentDate.getDay();
        const hour = appointmentDate.getHours().toString().padStart(2,'0');
        const minutes = appointmentDate.getMinutes().toString().padStart(2, '0');
        const timeString = `${hour}:${minutes}`;

        // Buscar bloques de disponibilidad para ese día
        const availableSlots = await Availability.find({dayOfWeek});

        const isWithinAvailability = availableSlots.some(slot => {
            return timeString >= slot.startTime && timeString < slot.endTime;
        });

        if (!isWithinAvailability) {
            return res.status(400).json({
                status: "error",
                message: "El horario solicitado no está dentro de los bloques disponibles."
            });
        }

        // Verifica si ya existe una cita activa en ese horario
        const existing = await Appointment.findOne({
            datetime: appointmentDate,
            status: "active"
        });

        if(existing) return res.status(409).json({
            status: "error",
            message: "Ese horario ya está reservado por otro usuario."
        });

        // Solo permitir citas en intervalos de 30 minutos
        const validIntervals = [0, 30];
        const appointmentMinutes = appointmentDate.getMinutes();

        if (!validIntervals.includes(appointmentMinutes)) {
            return res.status(400).json({
                status: "error",
                message: "Solo se permiten citas en intervalos de 30 minutos (ej: 09:00, 09:30, 10:00)."
            });
        }

        const appointment = new Appointment({
            user: req.user.id,
            datetime: appointmentDate
        });

        await appointment.save();


        return res.status(200).json({
            status: "success",
            message:"Cita reservada correctamente.",
            appointment
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al agendar cita."
        });
    }
}

const getMyAppointments = async (req, res) =>{
    
    try {
        const appointments = await Appointment.find({ user: req.user.id }).sort({ datetime: 1 });

        return res.status(200).json({
            status: "success",
            message: "Lista de citas.",
            appointments
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al obtener citas."
        });
    }
}

const cancelAppointment = async (req, res) => {

    // Obtenemos ID de appointment
    const appointmentId = req.params.id;
    const userId = req.user.id;

    try {
        const appointment = await Appointment.findOne({_id: appointmentId, user: userId});

        if(!appointment){
            return res.status(404).json({
            status: "error",
            message: "Cita no encontrada."
        });
        }

        if(appointment.status === 'cancelled'){
            return res.status(400).json({
                status: "error",
                message: "La cita ya se encuentra cancelada."
            });
        }

        if(appointment.datetime < new Date()){
            return res.status(400).json({
                status: "error",
                message: "No se puede cancelar una cita pasada."
            });
        }

        appointment.status = 'cancelled';
        await appointment.save();

        return res.status(200).json({
            status: "success",
            message: "Cita cancelada correctamente.",
            appointment
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al cancelar cita.",
            error: error.message
        });
    }
}

module.exports = {
    createAppointment,
    getMyAppointments,
    cancelAppointment
}