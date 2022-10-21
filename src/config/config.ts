export default {
    DB :{
        URI: process.env.MONGODB_URI || 'mongodb+srv://dzambranob:root_UNcademy_conGrades@cluster0.gpxjjtn.mongodb.net/UNcademy_ConGrades_db?retryWrites=true&w=majority',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASS
    }
}