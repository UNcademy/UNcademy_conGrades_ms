export default {
    DB :{
        URI: process.env.MONGODB_URI || 'mongodb://jubustamantem:root@ac-wf5jnft-shard-00-00.gpxjjtn.mongodb.net:27017,ac-wf5jnft-shard-00-01.gpxjjtn.mongodb.net:27017,ac-wf5jnft-shard-00-02.gpxjjtn.mongodb.net:27017/UNcademy_ConGrades_db?ssl=true&replicaSet=atlas-10uzpc-shard-0&authSource=admin&retryWrites=true&w=majority',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASS
    }
}