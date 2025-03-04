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
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
    status:{
        type: Boolean,
        default: true
    }
},{
    versionKey: false,
    timeStamps: true
})

export default model('Product', productSchema);
