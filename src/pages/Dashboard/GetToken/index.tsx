import * as React from "react";
import { useContext as useDappContext } from "@elrondnetwork/dapp";
import { faSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSignedToken } from "../helpers/asyncRequests";

const GetToken = () => {
  const {
    dapp: { provider },
    address,
  } = useDappContext();
  const [token, setToken] = React.useState<string | undefined>();

  const handleGenerateToken = async () => {
    const generatedToken = await getSignedToken(address, provider);
    setToken(generatedToken);
  };

  return (
    <>
      <div className="action-btn" onClick={handleGenerateToken}>
        <button className="btn">
          <FontAwesomeIcon icon={faSign} className="text-primary" />
        </button>
        <a href="/" className="text-white text-decoration-none">
          generate Auth token
        </a>
        {token != null && <textarea disabled value={token} />}
      </div>
    </>
  );
};
export default GetToken;
