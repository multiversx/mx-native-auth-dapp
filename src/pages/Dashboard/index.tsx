import * as React from "react";
import { refreshAccount } from "@elrondnetwork/dapp-core/utils";
import axios from "axios";
import PageState from "components/PageState";
import Actions from "./Actions";
import TopInfo from "./TopInfo";

const Dashboard = () => {
  const ref = React.useRef(null);
  const [userData, setUserData] = React.useState<any | null>(null);
  const [fetchingData, setFetchingData] = React.useState(true);

  const fetchData = async () => {
    await refreshAccount();
    try {
      const response = await axios.get("http://localhost:3000/auth");
      setUserData(response?.data);
    } catch (err) {
      console.log("Unable to fetch user info", err);
    } finally {
      setFetchingData(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  if (fetchingData) {
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

                  {userData != null ? (
                    <div className="text-white d-flex flex-column mt-3">
                      <span className={"mt-2"}>{"API response: "}</span>
                      <span
                        className={"mt-2"}
                      >{`Address: ${userData.address}`}</span>
                      <span className={"mt-2"}>{`Token issued at: ${new Date(
                        userData.issued * 1000,
                      )}`}</span>
                      <span className={"mt-2"}>{`Token expires at: ${new Date(
                        userData.expires * 1000,
                      )}`}</span>
                    </div>
                  ) : (
                    <div className="text-white d-flex flex-column mt-3">
                      <span>Unable to fetch user data</span>
                    </div>
                  )}
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
