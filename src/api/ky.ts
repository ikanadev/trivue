import kyOriginal from "ky";

export const ky = kyOriginal.create({ prefixUrl: 'http://localhost:4000/' });
