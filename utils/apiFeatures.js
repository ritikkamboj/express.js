class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;

    }
    //queryString toh wo hai jo postman ki request mein daal rahe hai hum

    // what is this.query here ?????
    filter() {
        const queryObj = { ...this.queryString };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);
        // console.log(req.requestTime);
        // console.log(req.query, queryObj);
        // console.log('isse niche');

        //mongoDb way of filtering
        // const tours = await Tour.find({ duration: 5, difficulty: 'easy' });
        // console.log('jai maata di 1')

        let queryStr = JSON.stringify(queryObj);
        // console.log('jai maata di 2')

        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);


        // let query = Tour.find(JSON.parse(queryStr));

        this.query = this.query.find(JSON.parse(queryStr));
        // how we write query in mongoDB vs how we are getting through req.query
        // { difficulty: 'easy', duration : { $gte: 5 } } vs { difficulty: 'easy', duration: { gte: '5' } }
        // console.log('jai maata di ')
        // console.log('karan', query.getQuery());

        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            console.log('yeh waala', sortBy);
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            console.log(fields);

            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select('-__v')
        }
        return this;
    }
    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        // if (this.queryString.page) {
        //   const numTours = await Tour.countDocuments();
        //   console.log('ganesh ji ')
        //   if (skip >= numTours) throw new Error('This page does not exist');
        // }
        return this;
    }
}

module.exports = APIFeatures;