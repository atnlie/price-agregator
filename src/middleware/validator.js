const Joi = require('joi');

const validator = (schema) => (payload) => schema.validate(payload, { aboardedEarly: false });

const customerSchema = Joi.object({
    customer_id: Joi.string()
        .min(3)
        .max(20)
        .required(),
    code_area: Joi.number()
        .min(1)
        .max(999)
        .required(),
    city: Joi.string()
        .min(3)
        .max(100)
        .required(),
    address: Joi.string()
        .min(10)
        .max(100)
        .required(),
    state: Joi.string()
        .min(3)
        .max(100)
        .required(),
});

exports.validateCustomer = validator(customerSchema);

const deliverySchema = Joi.object({
    po_id: Joi.string()
        .min(32)
        .max(36)
        .required(),
});

exports.validateDelivery = validator(deliverySchema);

const logisticSchema = Joi.object({
    fleet_type: Joi.string()
        .min(3)
        .max(50)
        .required(),
    capacity: Joi.string()
        .min(3)
        .max(50)
        .required(),
    source: Joi.string()
        .min(3)
        .max(100)
        .required(),
    destination: Joi.string()
        .min(3)
        .max(100)
        .required(),
    cost: Joi.number()
        .min(1)
        .max(999999999999999)
        .required(),
    code_area: Joi.number()
        .min(1)
        .max(999)
        .required(),
});

exports.validateLogistic = validator(logisticSchema);

const pricelistSchema = Joi.object({
    supplier_id: Joi.string()
        .min(3)
        .max(20)
        .required(),
    sku_id: Joi.string()
        .min(3)
        .max(50)
        .required(),
    price_per_unit: Joi.string()
        .min(3)
        .max(100)
        .required(),
    stock: Joi.number()
        .min(1)
        .max(999999999999999)
        .required(),
});

exports.validatePricelist = validator(pricelistSchema);

const productSchema = Joi.object({
    sku_id: Joi.string()
        .min(3)
        .max(50)
        .required(),
    name: Joi.string()
        .min(3)
        .max(100)
        .required(),
    unit_of_measurement: Joi.string()
        .min(3)
        .max(100)
        .required(),
    weight_in_kg: Joi.number()
        .min(1)
        .max(999999999999999)
        .required(),
});

exports.validateProduct = validator(productSchema);

const quotationSchema = Joi.object({
    customer_id: Joi.string()
        .min(3)
        .max(20)
        .required(),
    sku_id: Joi.string()
        .min(3)
        .max(50),
    qty: Joi.string()
        .min(1)
        .max(50),
    rfq: Joi.array()
});

exports.validateQuotation = validator(quotationSchema);

const supplierSchema = Joi.object({
    supplier_id: Joi.string()
        .min(3)
        .max(20)
        .required(),
    code_area: Joi.number()
        .min(1)
        .max(999)
        .required(),
    city: Joi.string()
        .min(3)
        .max(100)
        .required(),
    address: Joi.string()
        .min(10)
        .max(100)
        .required(),
    state: Joi.string()
        .min(3)
        .max(100)
        .required(),
});

exports.validateSupplier = validator(supplierSchema);

const pricelistStockSchema = Joi.object({
    supplier_id: Joi.string()
        .min(3)
        .max(20)
        .required(),
    sku_id: Joi.string()
        .min(3)
        .max(50)
        .required(),
    stock: Joi.number()
        .min(1)
        .max(999999999999999)
        .required(),
});

exports.validatePricelistStock = validator(pricelistStockSchema);


const pricelistPriceSchema = Joi.object({
    supplier_id: Joi.string()
        .min(3)
        .max(20)
        .required(),
    sku_id: Joi.string()
        .min(3)
        .max(50)
        .required(),
    price: Joi.number()
        .min(1)
        .max(999999999999999)
        .required(),
});

exports.validatePricelistPrice = validator(pricelistPriceSchema);

const logisticCostSchema = Joi.object({
    logistic_id: Joi.number()
        .min(1)
        .max(999999999999999)
        .required(),
    cost: Joi.number()
        .min(1)
        .max(999999999999999)
        .required(),
});

exports.validateLogisticCost = validator(logisticCostSchema);

const logisticCodeAreaSchema = Joi.object({
    logistic_id: Joi.number()
        .min(1)
        .max(999999999999999)
        .required(),
    code_area: Joi.number()
        .min(1)
        .max(999)
        .required(),
});

exports.validateLogisticCodeArea = validator(logisticCodeAreaSchema);
