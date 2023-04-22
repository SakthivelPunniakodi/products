const axios = require('axios');

exports.ConvertCurrency = (amount, from, to) => {
    return new Promise((resolve, reject) => {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://api.apilayer.com/currency_data/convert?amount=5&from=USD&to=EUR',
                headers: {
                    'apikey': '2ggR49hn1hK2zS6vFc4SJc1lJLZSE7ow'
                }
            };
            axios.request(config)
                .then((response) => {
                    if(response.data.success){
                    resolve(response.data.result);
                    }else{
                        throw new Error("Currency conversion got failed (Use Default currency USD).")
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        } catch (error) {
            reject(error);
        }
    })
}



