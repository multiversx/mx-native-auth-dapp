import moment from "moment";

export type LocalKeyType = "maiarExchangeAccounts" | "darkTheme" | "tokenData";
export type LocalAccountKeyType = "tolerance" | "txDeadlineSec";

export const setItem = (key: LocalKeyType, item: any, ttl = 3600) => {
  const expires = moment().unix() + ttl;
  localStorage.setItem(
    String(key),
    JSON.stringify({
      expires,
      data: item,
    }),
  );
};

export const setAccountItem = ({
  address,
  item,
  ttl = 3600,
}: {
  address: string;
  item: { [key in LocalAccountKeyType]?: string };
  ttl: number;
}) => {
  const existingAccounts = getItem("maiarExchangeAccounts");
  let accounts;
  try {
    accounts = existingAccounts ? JSON.parse(existingAccounts) : {};
  } catch {
    accounts = {};
  }
  setItem(
    "maiarExchangeAccounts",
    JSON.stringify({
      ...accounts,
      [address]: {
        ...(address in accounts ? accounts[address] : {}),
        ...item,
      },
    }),
    ttl,
  );
};

export const getItem = (key: LocalKeyType): any => {
  const item = localStorage.getItem(String(key));
  if (!item) {
    return null;
  }

  const deserializedItem = JSON.parse(item);
  if (!deserializedItem) {
    return null;
  }

  if (
    !deserializedItem.hasOwnProperty("expires") ||
    !deserializedItem.hasOwnProperty("data")
  ) {
    return null;
  }

  const expired = moment().unix() >= deserializedItem.expires;
  if (expired) {
    localStorage.removeItem(String(key));
    return null;
  }

  return deserializedItem.data;
};

export const getAccountItem = ({
  address,
  key,
}: {
  address: string;
  key: LocalAccountKeyType;
}) => {
  const existingAccounts = getItem("maiarExchangeAccounts");
  try {
    const accounts = existingAccounts ? JSON.parse(existingAccounts) : {};
    if (address && address in accounts) {
      return accounts[address][key];
    }
    return undefined;
  } catch {
    return undefined;
  }
};

export const removeItem = (key: LocalKeyType) =>
  localStorage.removeItem(String(key));
