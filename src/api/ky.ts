import kyOriginal from "ky";

export const ky = kyOriginal.create({ prefixUrl: 'http://192.168.0.8:4000/' });
