import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name:{
        type: String,
        required: true,
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    description:{
        type: String,
        required: true,
        maxLength: [100, "Description cannot exceed 100 characters"]
    },
    price:{
        type: Number,
        required: true
    },
    categorie:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: "sin_categoria"
    },
},{
        timestamps: true,
        versionKey: false
})

export default model('Product', productSchema);