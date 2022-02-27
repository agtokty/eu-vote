import * as functions from "firebase-functions";

import pako = require("pako");
import base45 = require("base45");
const cbor = require('cbor');

/**
 * 
 * @param greenpassBody 
 * @returns 
 */
const decodeData = (greenpassBody: string) => {
    greenpassBody = greenpassBody.substring(4);
    try {
        const decodedData = base45.decode(greenpassBody);
        const output = pako.inflate(decodedData);

        const results = cbor.decodeAllSync(output);
        const [headers1, headers2, cbor_data, signature] = results[0].value;

        // functions.logger.debug("headers1 : ", headers1);
        // functions.logger.debug("headers2 : ", headers2);
        // functions.logger.debug("cbor_data : ", cbor_data);
        // functions.logger.debug("signature : ", signature);

        const greenpassData = cbor.decodeAllSync(cbor_data);
        const greenpassDataJson = JSON.stringify(greenpassData[0].get(-260).get(1), null, 2);

        return JSON.parse(greenpassDataJson);
    } catch (e) {
        return {};
    }
}

/**
 * 
 */
export const decodeGreenPassBody = functions.https.onRequest((request, response) => {

    response.set('Access-Control-Allow-Origin', '*');

    if (request.method === 'OPTIONS') {
        response.set('Access-Control-Allow-Methods', 'POST');
        response.set('Access-Control-Max-Age', '3600');
        response.status(204).send('');
        return;
    }

    functions.logger.info("on decodeGreenPassBody");

    if (request.body.greenpassBody) {
        let resultData = decodeData(request.body.greenpassBody)

        response.json({ result: true, data: resultData });
    } else {
        response.json({ result: false });
    }
});
