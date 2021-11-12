import * as React from "react";
import * as Dapp from "@elrondnetwork/dapp";
import PageState from "components/PageState";
import { getItem } from "storage/session";
import Actions from "./Actions";
import TopInfo from "./TopInfo";

const Dashboard = () => {
  const ref = React.useRef(null);
  const [userData, setUserData] = React.useState<string | null>(null);
  const refreshAccount = Dapp.useRefreshAccount();

  const fetchData = () => {
    refreshAccount();
    try {
      setUserData("");
    } catch (err) {
      console.log("Unable to fetch transactions", err);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(fetchData, []);

  if (userData == null) {
    return <PageState svgComponent={<></>} spin />;
  }
  return (
    <div className="container py-4" ref={ref}>
      <div className="row">
        <div className="col-12 col-md-10 mx-auto">
          <div className="card shadow-sm rounded border-0">
            <div className="card-body p-1">
              <div className="card rounded border-0 bg-primary">
                <div className="card-body text-center p-4">
                  <TopInfo />
                  <Actions />

                  <div className="text-white d-flex flex-column mt-3">
                    <span className={"mt-2"}>{"Your auth token"}</span>
                    <span className={"mt-2"}>
                      {getItem("tokenData")?.accessToken}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
