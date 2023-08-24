import { createConnections } from "@/lib/mongoose";
import { Product } from "@/models/products";

/** endpoints for category */
export default async function products(req, res) {

    await createConnections();
    const { categories, sort, ...otherFilter } = req.query
    const productQuery = {
        category: categories.split(',')
    }
    const [sortField, sortOrder] = sort.split('-')

    /** check if the filter object is 0
     * loop through all key of the (otherFilter)
     * set the property name, to the filters name
     */
    if (Object.keys(otherFilter).length > 0) {

        Object.keys(otherFilter).forEach((filterName) => {
            productQuery[`properties.${filterName}`] = otherFilter[filterName]
        })
    }

    res.json(await Product.find(productQuery, null, { sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 } }))
}

