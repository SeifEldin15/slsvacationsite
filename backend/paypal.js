import axios from 'axios';
import * as config from './config.js';

const Paypal = {
    async generateAccessToken() {
        const response = await axios({
            url: `${config.BASE_URL}/v1/oauth2/token`,
            method: 'post',
            data: 'grant_type=client_credentials',
            auth: {
                username: config.CLIENT_ID,
                password: config.CLIENT_SECRET,
            }
        });
        return response.data.access_token; 
    } 
}; 



// exports.createOrder = async () => {
//     const accessToken = await generateAccessToken()
//     const response = await axios ({
//         url: `${config.BASE_URL}/v2/checkout/orders`,
//         method: 'post',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + accessToken,
//         },
//         data: JSON.stringify({
//             intent: 'CAPTURE',
//             purchase_units [
//                 {
//                     items: [{
//                         name: 'trip',
//                         description: 'trips buy',
//                          quantity: 1,
//                          unti_amount{
//                             currency_code: 'USD',
//                             value: '100.00',
//                          }

//                     }],
//                     amount {
//                         currency_code: 'USD',
//                         value: '100.00',
//                         breakdown: {
//                             items_total: {
//                                 currency_code: 'USD',
//                                 value: '100.00',
//                             }
//                         }
//                     }
//                 }
//             ]
//         })
//     })
// } 
