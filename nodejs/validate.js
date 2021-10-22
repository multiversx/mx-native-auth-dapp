const axios = require("axios");
const token = require("./token");
const {
  SignableMessage,
  Address,
  UserPublicKey,
  UserVerifier,
} = require("@elrondnetwork/erdjs");
const { Signature } = require("@elrondnetwork/erdjs/out/signature");

const expectedIssuers = ["http://localhost:3000"];
const blockTimestampDeltaMs = 7000;
const algorithm = "ELROND";
const type = "JWT";

const errors = {
  invalidAlgorithm: "Invalid header algorithm",
  invalidType: "Invalid header type",
  tokenExpired: "Token expired",
  invalidIssuedAt: "Invalid issuance date",
  invalidIssuer: "Invalid issuer",
  invalidSignature: "Invalid signature",
};

async function validateToken(tokenToValidate) {
  const [header, body, signature] = tokenToValidate.split(".");
  const parsedHeader = JSON.parse(
    Buffer.from(header, "base64").toString("ascii"),
  );
  const parsedBody = JSON.parse(Buffer.from(body, "base64").toString("ascii"));

  const { hash, iss, iat, exp, sub, data } = parsedBody;

  if (!expectedIssuers.includes(iss)) {
    console.error(errors.invalidIssuer);
    return;
  }
  if (parsedHeader.type !== type) {
    console.error(errors.invalidType);
    return;
  }
  if (parsedHeader.alg !== algorithm) {
    console.error(errors.invalidAlgorithm);
    return;
  }

  const issuedAt = iat * 1000;
  const expires = exp * 1000;
  const blockInfo = await axios.get(
    `https://devnet-api.elrond.com/blocks/${hash}`,
  );
  if (blockInfo == null) {
    console.error("invalid signature");
    return;
  }
  const blockTimestamp = blockInfo.data.timestamp;
  const adjustedBlockTime = blockTimestamp * 1000 + blockTimestampDeltaMs;
  const isIssuedAtValid = issuedAt < adjustedBlockTime;
  const isExpiresValid = expires > new Date();

  if (!isIssuedAtValid) {
    console.error(errors.invalidIssuedAt);
    return;
  }
  if (!isExpiresValid) {
    console.error(errors.tokenExpired);
    return;
  }

  const signedMessage = `${header}.${body}`;

  const signedM = new SignableMessage({
    address: new Address(sub),
    message: Buffer.from(signedMessage, "utf8"),
    signature: new Signature(signature),
  });
  const publicKey = new UserPublicKey(Address.fromString(sub).pubkey());
  const verifier = new UserVerifier(publicKey);
  const valid = verifier.verify(signedM);

  if (!valid) {
    console.error(errors.invalidSignature);
    return;
  }

  console.log({
    isTokenValid: valid,
    issued: new Date(issuedAt),
    blockTimestamp: new Date(adjustedBlockTime),
    expires: new Date(expires),
    isTimestampValid: isExpiresValid && isIssuedAtValid,
    data,
  });
}

const args = process.argv.slice(2);
const argument = args[0];
const tkn = argument || token;
validateToken(tkn);
