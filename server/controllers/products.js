'use strict'

const fetch = require('node-fetch');

var controller = {
    getProducts: (req, res) => {
        var query = req.query.q;
        const PAG_LIMIT = 5;
        const api_url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=${PAG_LIMIT}`;

        (async function () {
            try {
                const response = await fetch(api_url);
                const jsonResp = await response.json();

                if (jsonResp.results.length > 0) {
                    const author = {
                        name: 'Carlos',
                        lastname: 'Garcia'
                    }

                    const categories = jsonResp.filter.length ? (
                        jsonResp.filter[0].values[0].path_from_root.map((category) => category.name)
                    ) : [];

                    const products = jsonResp.results.map((product) => {
                        const {id, title, currency_id, thumbnail, condition} = product;
                        const free_shipping = product.shipping.free_shipping;
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
                            free_shipping
                        }
                        return(items)
                    });
                    
                    const items = {
                        items: products
                    }

                    const jsonResult = {
                        author,
                        categories,
                        items: products
                    }
                    return res.status(200).send(jsonResult);
                } else {
                    return res.status(200).send('');
                }
            } catch (error) {
                return res.status(500).send(error);
            }
        })()
    },

    productDetail: (req, res) => {
        var query = req.params.id;
        const api_url = `https://api.mercadolibre.com/items/${query}`;
        const api_url_descrip = `https://api.mercadolibre.com/items/${query}/description`;

        (async function () {
            try {
                const response = await fetch(api_url);
                const descriptionResp = await fetch(api_url_descrip);

                const jsonResp = await response.json();
                const jsonDescription = await descriptionResp.json();

                if (jsonResp.id.length > 0) {
                    const author = {
                        name: 'Carlos',
                        lastname: 'Garcia'
                    }

                    const {id, title, currency_id, condition, sold_quantity} = jsonResp;
                    const free_shipping = jsonResp.shipping.free_shipping;
                    const [amount, decimals] = jsonResp.price.toString().split('.');
                    const picture = jsonResp.pictures[0].url;
                    const description = jsonDescription.plain_text;

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
                    return res.status(200).send(jsonResult);
                }
            } catch (error) {
                return res.status(500).send(error);
            }
        })()
    }
}

module.exports = controller;