import * as React from "react";
import { useGetAccount } from "@elrondnetwork/dapp-core/hooks";
import { Denominate } from "@elrondnetwork/dapp-core/UI";
import { contractAddress } from "config";

const TopInfo = () => {
  const { address, balance } = useGetAccount();

  return (
    <div className="text-white" data-testid="topInfo">
      <div className="mb-1">
        <span className="opacity-6 mr-1">Your address:</span>
        <span data-testid="accountAddress"> {address}</span>
      </div>
      <div className="mb-4">
        <span className="opacity-6 mr-1">Contract address:</span>
        <span data-testid="contractAddress"> {contractAddress}</span>
      </div>
      <div>
        <h3 className="py-2">
          <Denominate value={balance} data-testid="balance" />
        </h3>
      </div>
    </div>
  );
};

export default TopInfo;
