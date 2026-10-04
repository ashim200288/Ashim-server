const { Schema, model } = require('mongoose');
const CATEGORIES = ['Painting', 'Digital', 'Sculpture', 'Photography', 'Illustration', 'Mixed Media'];
const schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    category: { type: String, enum: CATEGORIES, required: true },
    image: { type: String, required: true },
    artist: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sold: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Artwork = model('Artwork', schema);
Artwork.CATEGORIES = CATEGORIES;
module.exports = Artwork;
