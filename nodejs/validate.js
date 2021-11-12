const axios = require("axios");
const token = require("./token");
const {
  SignableMessage,
  Address,
  UserPublicKey,
  UserVerifier,
} = require("@elrondnetwork/erdjs");
const { Signature } = require("@elrondnetwork/erdjs/out/signature");

const expectedIssuers = ["http://localhost:3000", "https://localhost:3001"];
const blockTimestampDeltaMs = 7000;

const errors = {
  invalidToken: "Invalid token",
  invalidAlgorithm: "Invalid header algorithm",
  invalidType: "Invalid header type",
  tokenExpired: "Token expired",
  invalidIssuer: "Invalid issuer",
  invalidSignature: "Invalid signature",
};

async function validateToken(tokenToValidate) {
  try {
    const [address, body, signature] = tokenToValidate.split(".");
    const parsedAddress = Buffer.from(address, "base64").toString("ascii");
    const parsedBody = Buffer.from(body, "base64").toString("ascii");
    const [iss, hash, ttl] = parsedBody.split(".");
    if (!expectedIssuers.some((issuer) => issuer.includes(iss))) {
      console.log(errors.invalidIssuer);
      return errors.invalidIssuer;
    }
    const blockInfo = await axios.get(
      `https://devnet-api.elrond.com/blocks/${hash}`,
    );
    if (blockInfo == null) {
      console.log(errors.invalidSignature);
      return errors.invalidSignature;
    }
    const blockTimestamp = blockInfo.data.timestamp;
    const adjustedBlockTime = blockTimestamp * 1000 + blockTimestampDeltaMs;
    const expires = Number(adjustedBlockTime) + Number(ttl * 1000);
    const isExpiresValid = expires > Date.now();
    if (!isExpiresValid) {
      console.log(errors.tokenExpired, expires, adjustedBlockTime);
      return errors.tokenExpired;
    }

    const signedMessage = `${parsedAddress}${parsedBody}{}`;
    const signedM = new SignableMessage({
      address: new Address(parsedAddress),
      message: Buffer.from(signedMessage, "utf8"),
      signature: new Signature(signature),
    });
    const publicKey = new UserPublicKey(
      Address.fromString(parsedAddress).pubkey(),
    );
    const verifier = new UserVerifier(publicKey);
    const valid = verifier.verify(signedM);

    if (!valid) {
      console.error(errors.invalidSignature);
      return;
    }
    const response = {
      isTokenValid: valid,
      issued: new Date(adjustedBlockTime),
      blockTimestamp: new Date(adjustedBlockTime),
      expires: new Date(expires),
      isTimestampValid: isExpiresValid,
    };
    console.log(response);
    return response;
  } catch (err) {
    console.log("error", err);
    return errors.invalidToken;
  }
}

const args = process.argv.slice(2);
const argument = args[0];
const tkn = argument || token;
validateToken(tkn);
