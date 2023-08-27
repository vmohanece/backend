import CryptoJS from "crypto-js";

export const encrypt = (data) => {
    return CryptoJS.AES.encrypt(data, process.env.AES_AUTH_SECRET).toString();
};

export const decrypt = (data) => {
    const bytes  = CryptoJS.AES.decrypt(data, process.env.AES_AUTH_SECRET);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};