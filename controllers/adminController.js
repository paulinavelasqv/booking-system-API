const Appointment = require('../models/appointment');
const Availability = require('../models/availability');

const getAllAppointments = async (req, res) => {

    try {
        const appointments = await Appointment.find().populate('user', 'name email');

        if(!appointments) return res.status(404).json({message: "No existen appointments."});

        return res.status(200).json({
            status: "Success",
            message: "Listado de citas.",
            appointments
        });

    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener citas' });
    }   
}

const createAvailability = async (req, res) => {

    const params = req.body;
    try {
        if(params.dayOfWeek < 0 || params.dayOfWeek > 6 || !params.startTime || !params.endTime){
            return res.status(400).json({ status: 'error', message: 'Datos inválidos' });
        }

        const availability = new Availability({dayOfWeek: params.dayOfWeek, startTime: params.startTime, endTime: params.endTime});
    
        await availability.save();

        return res.status(200).json({
                status: "Success",
                message: "Disponibilidad de citas creada.",
                availability
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al crear disponibilidad', error: err.message });
    } 
}

const getAvailability = async(req, res) => {

    try {
        const availability = await Availability.find().sort({ dayOfWeek: 1, startTime: 1 });

        return res.status(200).json({
            status: "success",
            message: "Listado de disponibilidad de citas",
            availability
        });

    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener disponibilidad' });
    }
}

const deleteAvailability = async (req, res) => {

    const availabilityId = req.params.id;

    try {
        const availability = await Availability.findByIdAndDelete(availabilityId);

        if(!availability) return res.status(404).json({
            status: "error",
            message: "No existe disponibilidad para eliminar."
        });
        
        return res.status(200).json({
                status: "success",
                message: "Disponibilidad eliminada exitosamente.",
                availability
            });

    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al eliminar disponibilidad' });
    }
}

module.exports = {
    getAllAppointments,
    createAvailability,
    getAvailability,
    deleteAvailability
}