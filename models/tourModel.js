const mongoose = require('mongoose');
const slugify = require('slugify');



const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name '],
        unique: true,
        trim: true
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        require: [true, 'A tour must have a gp size']
    },
    difficulty: {
        type: String,
        require: [true, 'A tour must have mention difficulty']
    },
    ratingAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },

    price: {
        type: Number,
        required: [true, 'A tour must have a price ']
    },
    priceDiscount: Number,

    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a summary']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover:
    {
        type: String,
        required: [true, 'A tour must have a cover image']

    },
    image: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date]

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
});

// Document Middleware 
// only runs before .save and .create 
tourSchema.pre('save', function (next) {
    // console.log(this);          // here this represent current document object.
    this.slug = slugify(this.name, { lower: true });
    next();
})

tourSchema.post('save', function (doc, next) {
    console.log(doc);
    next();

})
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;