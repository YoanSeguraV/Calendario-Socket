import mongoose from 'mongoose'

async function dbconnection(){
try {
   await  mongoose.connect(process.env.URI_MONGO) 
   console.log("conexion Db ok")
} catch (error) {
    console.log("error de conexion Db"+ error)
}
}

export default dbconnection;




