import {Schema,model, version} from 'mongoose'
import Event from './Event'


const codigo= new Schema({

    nombre:{
        type:String,
        require:true
    },
    edad:{
        type:Number,
        requiere:true
    },
    idEvent:{
        type: Schema.ObjectId,
        ref :"Event"

    }
},
{
    timestamps:false,
    versionKey:false
}

)

export default model("Codigos",codigo)