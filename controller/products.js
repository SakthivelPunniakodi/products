const { Validator } = require('node-input-validator');
const { ConvertCurrency } = require('../config/lib/convertCurrency');
const { Product, Op } = require('../config/lib/db');

exports.getProduct = async (req, res) => {
    const validate = new Validator(req.query, {
        id: 'required|numeric',
        currency: 'string'
    });
    await validate.check().then((matched) => {
        req.query.currency = req.query.currency || "USD";
        if (!matched) {
            res.status(422).send({
                message: validate.errors,
                issuccess: false
            });
        } else if (!["USD", "CAD", "EUR", "GBP"].includes(req.query.currency.toUpperCase())) {
            res.status(422).send({
                message: {
                    "currency": {
                        "message": "Currency allows only USD/CAD/EUR/GBP",
                        "rule": "required"
                    }
                },
                issuccess: false
            });
        }
        else {
            Product.findOne(
                { where: { Id: req.query.id } }
            ).then(async val => {
                let result = {
                    issuccess: true
                }
                if (val && val.dataValues) {
                    await Product.update(
                        { Viewed: val.dataValues.Viewed + 1 },
                        { where: { Id: val.dataValues.Id } },
                    )
                    result.data = val.dataValues;
                    result.message = "Retrieve Product successfully.";
                    result.data.Currency = req.query.currency.toUpperCase();
                    if ("USD" != req.query.currency.toUpperCase()) {
                        result.data.Price = await ConvertCurrency(result.data.Price, "USD", req.query.currency.toUpperCase())
                    }
                } else {
                    result.data = {}
                    result.message = "No such Product available.";
                }
                res.status(200).send(result);
            }).catch(err => {
                res.status(422).send({
                    issuccess: false,
                    message: err.message
                })
            });
        }
    })
}

exports.DeleteProduct = async (req, res) => {
    const validate = new Validator(req.query, {
        id: 'required|numeric'
    });
    await validate.check().then((matched) => {
        if (!matched) {
            res.status(422).send({
                message: validate.errors,
                issuccess: false
            });
        } else {
            Product.update(
                { IsActive: 0 },
                { where: { Id: req.query.id } },
            ).then(val => {
                res.status(200).send({
                    issuccess: true,
                    message: "Product deleted successfully."
                })
            }).catch(err => {
                res.status(422).send({
                    issuccess: false,
                    message: err.message
                })
            });
        }
    })
}

exports.CreateProduct = async (req, res) => {
    const validate = new Validator(req.body, {
        name: 'required|maxLength:250',
        price: 'required|numeric'
    });

    await validate.check().then((matched) => {
        if (!matched) {
            res.status(422).send({
                message: validate.errors,
                issuccess: false
            });
        } else {
            Product.findOrCreate({
                where: {
                    Name: req.body.name
                },
                defaults: {
                    Description: req.body.description || '',
                    Price: req.body.price
                }
            }).then(val => {
                res.status(200).send({
                    issuccess: true,
                    message: "Product inserted successfully."
                })
            }).catch(err => {
                res.status(422).send({
                    issuccess: false,
                    message: err.message
                })
            });
        }
    });
}

exports.ListMostViewed = async (req, res) => {
    const validate = new Validator(req.query, {
        count: 'numeric'
    });
    await validate.check().then((matched) => {
        if (!matched) {
            res.status(422).send({
                message: validate.errors,
                issuccess: false
            });
        } else {
            Product.findAll(
                {
                    limit: +req.query.count || 5,
                    order: [["Viewed", 'DESC']],
                    where: {
                        Viewed: {
                            [Op.gt]: 0
                        },
                        IsActive: 1
                    }
                }
            ).then(val => {
                res.status(200).send({
                    issuccess: true,
                    message: "Most viewed prodcuts.",
                    data: val.map(x => x.dataValues)
                })
            }).catch(err => {
                res.status(422).send({
                    issuccess: false,
                    message: err.message
                })
            });
        }
    });
}
