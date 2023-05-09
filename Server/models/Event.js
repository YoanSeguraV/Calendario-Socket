import { Schema, model } from "mongoose";

const Event = new Schema(
  {
    codigo:{
      type:String,
        require:true
    },
    title: {
      type: String,
      require: true,
    },
    start: {
      type: Date,
      require: true,
    },
    end: {
      type: Date,
      require: true,
    },
  },
  {
    timestamps: false,
  }
);

export default model("Event", Event);
