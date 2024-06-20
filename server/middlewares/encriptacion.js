const CryptoJS = require('crypto-js');
const convert = require('xml-js');
const secretKey = 'ProyectoSeguridad1215';

function decryptWith3DES(encryptedData) {
    const bytes = CryptoJS.TripleDES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

function encryptWith3DES(data) {
    const encrypted = CryptoJS.TripleDES.encrypt(JSON.stringify(data), secretKey).toString();
    return encrypted;
}

function authenticateWithMD5(data) {
    const md5Hash = CryptoJS.MD5(data).toString();
    return md5Hash;
}

const ConvertirXml = (encryptedData, md5Hash) => {
    try {
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const xmlData = convert.json2xml(
            {
                response: {
                    encryptedData,
                    md5Hash
                }
            }, options);
        return xmlData;
    } catch (error) {
        console.error('Error al convertir JSON a XML:', error);
        return null;
    }
};

function desencriptar(req, res, next) {
    try {
        const encryptedData = req.body.encrypteddata;
        const receivedAuth = req.headers['x-md5-hash'];

        if (!encryptedData) {
            console.log('No se encontraron datos encriptados en la solicitud.');
            return next();
        }

        if (receivedAuth) {
            const calculatedAuth = authenticateWithMD5(encryptedData);

            if (receivedAuth !== calculatedAuth) {
                throw new Error('Autenticación no válida. Los datos podrían haber sido modificados.');
            }
        } else {
            console.warn('ADVERTENCIA: No se encontró el hash MD5 en la solicitud. La autenticación no se realizó.');
        }

        const decryptedData = decryptWith3DES(encryptedData);

        const decryptedObject = JSON.parse(decryptedData);
        req.body = decryptedObject;

        next();
    } catch (error) {
        console.error('Error al desencriptar y autenticar datos:', error);
        return res.status(400).json({ error: 'Error al desencriptar y autenticar datos' });
    }
}


function encriptar(req, res, next) {
    const originalSend = res.send;

    res.send = function (body) {
        if (!res.headersSent) {
            const encryptedData = encryptWith3DES(body);
            const md5Hash = authenticateWithMD5(encryptedData);

            res.set('Content-Type', 'application/xml');
            res.set('X-MD5-Hash', md5Hash);

            const xmlResponse = ConvertirXml(encryptedData, md5Hash);
            originalSend.call(this, xmlResponse);
        } else {
            originalSend.call(this, body);
        }
    };

    next();
}


module.exports = {
    encriptar,
    desencriptar
};