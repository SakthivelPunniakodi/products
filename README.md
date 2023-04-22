# products
We would like you to create a REST API for managing products. The API should allow the following actions:
  1. Create a new product
  2. Get a single product
  3. List the most viewed products
  4. Delete a product
  
When creating a new product, the name and price of the product need to be provided. Optionally, a description can also be provided. The
price is assumed to be in USD. The product should be saved to a SQL database.
When a single product is requested, all fields of that product are returned and the view-count for that product is incremented. The request can
optionally specify a currency, in which case the price should be converted to the requested currency before being returned. We need to support
the following currencies:
  * USD
  * CAD
  * EUR
  * GBP
  
The latest exchange rates can be retrieved from the public API https://currencylayer.com/ (or any similar API).
When a list of the most viewed products is requested, the API should return the products with the highest view-counts. By default, the top 5
products will be returned, but the request can also specify a custom number of products to return. Only products with at least 1 view should be
included. A specific currency can also be specified in which case all the prices should be returned in that currency.
When a product is deleted, it should no longer be included in any of the API responses but should remain in the database for audit purposes.
Your solution should include a working API and, some automated tests that verify the behavior of the API. Feel free to use available libraries
(such as NPM modules if using NodeJS) to avoid writing everything from scratch.
Please include all of your source files (excluding 3rd party libraries such as node_modules) in your submission. Please include the schema for
your database in the submission as well.

**Details**
We used Mysql and Nodejs for the development.

For Mysql, we free license from https://www.db4free.net/

# **Create Product**

**URL** : /product/create

**Content Type** : JSON

**Method** : POST

**Note** : name and price is required field. 

**Input** : {
    "name": "<sample product name>",
    "description":"<product description>",
    "price": 111
}
  
**output** : {
    "issuccess": true,
    "message": "Product inserted successfully."
}

# **Delete Product**
  
**URL** : /product/delete?id=<any product id>
  
**Method** : DELETE
  
**Note** : id is required field (its a product id)
  
**Output** : {
    "issuccess": true,
    "message": "Product deleted successfully."
}

# **Get Product**
**URL** : /product/get?id=<any product id>&currency=USD
  
**Method** : GET
  
**Note** : id is required field (its a product id) and currency is option (USD is default and allowed inputs are CAD,EUR,GBP,USD)
  
**Output** : {
    "issuccess": true,
    "data": {
        "Id": 3,
        "Name": "<product name>",
        "Description": "<product description>",
        "Price": "124.00",
        "Viewed": 0,
        "IsActive": true,
        "createdAt": "2023-04-22T11:16:25.000Z",
        "updatedAt": "2023-04-22T11:16:25.000Z",
        "Currency": "USD"
    },
    "message": "Retrieve Product successfully."
}

# **Get Most viewed Products**
  
**URL** : /product/mostviewed?count=1
  
**Method** : GET
  
**Note** : count is optional (default value is 5)
  
**Output** : {
    "issuccess": true,
    "message": "Most viewed prodcuts.",
    "data": [
        {
            "Id": 1,
            "Name": "<product name>",
            "Description": "<product description>",
            "Price": "98.10",
            "Viewed": 9,
            "IsActive": true,
            "createdAt": "2023-04-22T09:25:40.000Z",
            "updatedAt": "2023-04-22T11:16:50.000Z"
        }
    ]
}
