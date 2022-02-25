import React from "react";

import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { routeNames } from "routes";
import useTransaction from "./hooks/useTransaction";

const Actions = () => {
  const { sendTransaction } = useTransaction();

  const onClaimRewards = async (): Promise<void> => {
    try {
      await sendTransaction({
        value: "0",
        type: "claimRewards",
        args: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onDelegate = async (): Promise<void> => {
    try {
      await sendTransaction({
        value: "10",
        type: "stake",
        args: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex mt-4 justify-content-center">
      <div className="action-btn">
        <button className="btn" onClick={onDelegate}>
          <FontAwesomeIcon icon={faArrowUp} className="text-primary" />
        </button>
        <a
          href={routeNames.home}
          onClick={onDelegate}
          className="text-white text-decoration-none"
        >
          Stake
        </a>
      </div>

      <div className="action-btn">
        <button className="btn" onClick={onClaimRewards}>
          <FontAwesomeIcon icon={faArrowDown} className="text-primary" />
        </button>
        <a
          href="/"
          onClick={onClaimRewards}
          className="text-white text-decoration-none"
        >
          Claim rewards
        </a>
      </div>
    </div>
  );
};

export default Actions;
