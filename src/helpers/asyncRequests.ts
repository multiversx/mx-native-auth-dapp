import { Address, IDappProvider, SignableMessage } from "@elrondnetwork/erdjs";
import axios from "axios";
import moment from "moment";

import { network } from "config";

interface GetLatestTransactionsType {
  apiAddress: string;
  address: string;
  contractAddress: string;
  timeout: number;
  page?: number;
  url?: string;
}

const fetchTransactions = (url: string) =>
  async function getTransactions({
    apiAddress,
    address,
    contractAddress,
    timeout,
  }: GetLatestTransactionsType) {
    try {
      const { data } = await axios.get(`${apiAddress}${url}`, {
        params: {
          sender: address,
          receiver: contractAddress,
          condition: "must",
          size: 25,
        },
        timeout,
      });

      return {
        data: data,
        success: data !== undefined,
      };
    } catch (err) {
      return {
        success: false,
      };
    }
  };

export const getCurrentBlockHash = async () => {
  try {
    const response = await axios.get(`${network.apiAddress}/blocks?size=1`);
    return { hash: response.data[0].hash, success: true };
  } catch (error) {
    return {
      success: false,
    };
  }
};

const signedTokenHeader = {
  type: "JWT",
  alg: "ELROND",
};
export const getSignedToken = async (
  address: string,
  provider: IDappProvider,
): Promise<string> => {
  const currentBlockHashResponse = await getCurrentBlockHash();
  if (!currentBlockHashResponse?.success) {
    alert("there was an error while the token, please try again");
    return "";
  }
  const { hash } = currentBlockHashResponse;
  const messagePayload = {
    hash,
    sub: address,
    iat: moment().utc().unix(),
    exp: moment().utc().add(2, "hour").unix(),
    iss: window.location.origin,
    data: {
      extra: "someExtraData",
      extra2: "someRandomData2",
    },
  };

  const encodedHeader = encode(JSON.stringify(signedTokenHeader));
  const encodedPayload = encode(JSON.stringify(messagePayload));
  const message = `${encodedHeader}.${encodedPayload}`;
  const msg = new SignableMessage({
    message: Buffer.from(message, "utf8"),
    address: new Address(address),
  });

  const response = await provider.signMessage(msg);
  const signature = response.signature;
  const token = `${message}.${signature.hex()}`;
  return token;
};

function escape(str: string) {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function encode(str: string) {
  return escape(Buffer.from(str, "utf8").toString("base64"));
}

export const getTransactions = fetchTransactions("/transactions");
export const getTransactionsCount = fetchTransactions("/transactions/count");
