import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: true,
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    nit:{
        type: String,
        minLength: 8,
        enum: ["C/F"],
        default: "C/F"
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE, CLIENT_ROLE"],
        default: "CLIENT_ROLE"
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

userSchemaSchema.methods.toJSON = function(){
    const{password, _id, ...user} = this.toObject()
    user.uid = _id
    return user
}

export default model("User", userSchema)

