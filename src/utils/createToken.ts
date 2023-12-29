// import tokenGenerator from "otp-generator";
// import Token from "../models/tokenSchema";

// interface tokenInstance {
//   email: string;
//   token: string;
// }

// const createToken = async (
//   email: string,
//   exp: number
// ): Promise<tokenInstance> => {
//   const newToken = tokenGenerator.generate(20, {
//     upperCaseAlphabets: true,
//     specialChars: true,
//     lowerCaseAlphabets: true,
//     digits: true,
//   });

//   const tokenInstance: tokenInstance = {
//     email,
//     token: newToken,
//   };

//   await Token.createWithExpiration(tokenInstance, exp);

//   return tokenInstance;
// };

// export { createToken };
