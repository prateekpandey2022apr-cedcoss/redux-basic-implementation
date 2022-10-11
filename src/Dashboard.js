import { Page, Badge, Card, Button } from "@shopify/polaris";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { addSession, deleteSession } from "./redux/sessionReducer";

function Dashboard(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const payload = sessionStorage.getItem("details");
    // debugger;
    if (!payload) {
      props.setError({ generalError: "Login to view the page." });
      return navigate("/");
    } else {
      props.addSession(JSON.parse(payload));
    }
  }, []);

  return (
    <>
      {Object.keys(props?.details).length > 0 ? (
        <>
          <Navbar details={props.details} />
          <Page>
            <Card title="Credit card" sectioned>
              <p>User info:</p>
              <div>Customer Name: {props.details.customer_name}</div>
              <div>Username: {props.details.username}</div>
              <Button
                primary={true}
                href="#"
                onClick={() => {
                  props.deleteSession();
                  sessionStorage.removeItem("details");
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </Card>
          </Page>
        </>
      ) : (
        <p>Loading ...</p>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  //   debugger;
  console.log(state);
  return {
    details: state.details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSession: (session) => dispatch(addSession(session)),
    deleteSession: () => dispatch(deleteSession()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

// export default Dashboard;
