'use strict'
const fetch = require('node-fetch');

var controller = {
    getProducts: (req, res) => {
        var query = req.query.q;
        const api_meli_url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;

        (async function () {
            try {
                const response = await fetch(api_meli_url);
                const jsonResp = await response.json();

                if (jsonResp.results.length > 0) {
                    //Author
                    const author = {
                        name: 'Carlos',
                        lastname: 'Garcia'
                    }

                    //Categories
                    const categories = jsonResp.filters.length ? (
                        jsonResp.filters[0].values[0].path_from_root.map((category)=> category.name)
                    ) : [];

                    //Products
                    const products = jsonResp.results.map((product) => {
                        const {
                            id,
                            title,
                            currency_id,
                            thumbnail,
                            condition
                        } = product;
                        const free_shipping = product.shipping.free_shipping;
                        const state_name = product.address.state_name;
                        const [amount, decimals] = product.price.toString().split('.');

                        const items = {
                            id,
                            title,
                            price: {
                                currency: currency_id,
                                amount,
                                decimals
                            },
                            picture: thumbnail,
                            condition,
                            free_shipping,
                            state_name
                        }
                        return (items)
                    });

                    const jsonResult = {
                        author,
                        categories,
                        items: products
                    }
                    return res.status(200).send(jsonResult);
                } else {
                    return res.status(200).send('');
                }
            } catch (e) {
                return res.status(500).send(e);
            }
        })()
    },


    productDetail: (req, res) => {
        var query = req.params.id;
        const api_meli_url = `https://api.mercadolibre.com/items/${query}`;
        const api_meli_url_descrip = `https://api.mercadolibre.com/items/${query}/description`;

        (async function () {
            try {
                const response = await fetch(api_meli_url);
                const response_descrip = await fetch(api_meli_url_descrip);

                const jsonResp = await response.json();
                const jsonResp_descrip = await response_descrip.json();

                if (jsonResp.id.length > 0) {
                    //Author
                    const author = {
                        name: 'Carlos',
                        lastname: 'Garcia'
                    }

                    //Items
                    const {
                        id,
                        title,
                        price,
                        currency_id,
                        condition,
                        sold_quantity
                    } = jsonResp;
                    const free_shipping = jsonResp.shipping.free_shipping;
                    const [amount, decimals] = jsonResp.price.toString().split('.');
                    const picture = jsonResp.pictures[0].url;
                    const description = jsonResp_descrip.plain_text;

                    const item = {
                        id,
                        title,
                        price: {
                            currency: currency_id,
                            amount,
                            decimals
                        },
                        picture,
                        condition,
                        free_shipping,
                        sold_quantity,
                        description
                    }

                    const jsonResult = {
                        author,
                        item
                    }
                    return res.status(200).send(jsonResult);
                } else {
                    return res.status(200).send('');
                }
            } catch (e) {
                return res.status(500).send(e);
            }
        })()
    }
}

module.exports = controller;