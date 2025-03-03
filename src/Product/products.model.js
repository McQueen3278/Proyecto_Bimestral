import { Schema, SchemaType, model } from 'mongoose';

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
<<<<<<< HEAD
    category: {
        type: Schema.Types.ObjectId,
        ref: Category,
        required: false
    }
})
=======
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
>>>>>>> 244858bed00a7e879740d5eabc69dca1561fd2ae
