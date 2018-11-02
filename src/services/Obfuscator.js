import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const IV_LENGTH = 16; // For AES, this is always 16

const getPasswordHash = (password) => {
    let hash = crypto.createHash('sha256');
    let hashUpdate = hash.update(password, 'utf8');
    return hashUpdate.digest();
}

export const Obfuscator = {
    encrypt: (text, password) => {
        let hashedPassword = getPasswordHash(password);
        let iv = crypto.randomBytes(IV_LENGTH);
        var cipher = crypto.createCipheriv(algorithm, hashedPassword, iv)
        var encryptedString = cipher.update(text,'utf8','hex')
        encryptedString += cipher.final('hex');

        return JSON.stringify({
            iv: iv,
            payload: encryptedString
        });
    },

    decrypt: (text, password) => {
        let encryptionData = JSON.parse(text);
        if(!(encryptionData.iv || encryptionData.payload)) {
            return text;
        }
        else {
            let hashedPassword = getPasswordHash(password);
            let iv = Buffer.from(encryptionData.iv);
            var decipher = crypto.createDecipheriv(algorithm, hashedPassword, iv)
            var decryptedText = decipher.update(encryptionData.payload,'hex','utf8')
            decryptedText += decipher.final('utf8');
            return decryptedText;
        }
    }
}