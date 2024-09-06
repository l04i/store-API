const Product = require('../models/product');

const getAllProducts = async (req, res) => {
    const { sort, fields, page, limit } = req.query;

    const queryParams = buildQueryParams(req.query);

    let result = Product.find(queryParams);

    const { sort: sortParams, fields: selectParams } = buildSortAndFields(sort, fields);
    if (sortParams) result = result.sort(sortParams);
    if (selectParams) result = result.select(selectParams);


    const { skip, limit: limitNumber } = buildPagination(page, limit);
    result = result.skip(skip).limit(limitNumber);

    const products = await result


    res.status(200).json({ products, nbHits: products.length });
};



const buildNumericFilters = (numericFilters) => {
    const operatorMap = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
        regEx,
        (match) => `-${operatorMap[match]}-`
    );

    const options = ['price', 'rating'];
    const queryParams = {};

    filters = filters.split(',').forEach((item) => {
        const [field, operator, value] = item.split('-');
        if (options.includes(field)) {
            queryParams[field] = { [operator]: Number(value) };
        }
    });
    return queryParams;
}

const buildQueryParams = (reqQuery) => {
    const { featured, company, name, numericFilters } = reqQuery;
    const queryParams = {};

    if (featured) {
        queryParams.featured = featured === "true" ? true : false;

    }
    if (company) {
        queryParams.company = company;
    }
    if (name) {
        queryParams.name = { $regex: name, $options: 'i' };
    }

    if (numericFilters) {
        Object.assign(queryParams, buildNumericFilters(numericFilters));
    }
    return queryParams;
}

const buildSortAndFields = (sort, fields) => {
    let result = {};
    if (sort) {
        result.sort = sort.split(',').join(' ');
    } else {
        result.sort = 'createdAt';
    }

    if (fields) {
        result.fields = fields.split(',').join(' ');
    }

    return result;
}

const buildPagination = (page, limit) => {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    return { skip, limit: limitNumber };
};

module.exports = {
    getAllProducts,
}