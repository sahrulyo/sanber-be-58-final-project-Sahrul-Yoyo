
import mongoose, { Document, Schema } from "mongoose";
// const Schema = mongoose.Schema;
// const ProductsSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     images: {
//       type: [String],
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     qty: {
//       type: Number,
//       required: true,
//       min: [1, "Quantity cannot be less than 1"],
//     },
//     slug: {
//       type: String,
//       unique: true,
//     },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Categories",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// ProductsSchema.pre("save", function (next) {
//   const product = this;
//   if (!product.slug) {
//     product.slug = product.name.toLowerCase().split(" ").join("-");
//   }
//   next();
// });

// const ProductsModel = mongoose.model("Products", ProductsSchema);

//export default ProductsModel;

// Interface untuk Product
export interface IProduct extends Document {
  name: string;
  description: string;
  images: string[];
  price: number;
  qty: number;
  slug: string;
  category: mongoose.Schema.Types.ObjectId;
}

// Schema Product
const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: [1, "Quantity cannot be less than 1"],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware untuk membuat slug sebelum menyimpan produk ---------------->
ProductSchema.pre("save", function (next) {
  const product = this as IProduct;
  if (!product.slug) {
    // Mengubah nama menjadi slug: lowercase, mengganti spasi dengan "-", dan menghapus karakter non-alfanumerik
    product.slug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Membuat model Product ------------------------------------------>
const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;