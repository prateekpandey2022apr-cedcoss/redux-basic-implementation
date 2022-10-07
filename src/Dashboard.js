import { Page, Badge, Card, Button } from "@shopify/polaris";
import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { addSession, deleteSession } from "./redux/sessionReducer";

function Dashboard(props) {
  const navigate = useNavigate();

  const token = localStorage.getItem("details");
  if (!token) {
    props.setError({ generalError: "Login to view the page." });
    return navigate("/");
  }

  return (
    <>
      <Navbar details={props.details} />
      <Page
      // breadcrumbs={[{ content: "Products", url: "/products" }]}
      // title="3/4 inch Leather pet collar"
      // titleMetadata={<Badge status="success">Paid</Badge>}
      // subtitle="Perfect for any pet"
      // compactTitle
      // primaryAction={{ content: "Save", disabled: true }}
      // secondaryActions={[
      //   {
      //     content: "Duplicate",
      //     accessibilityLabel: "Secondary action label",
      //     onAction: () => alert("Duplicate action"),
      //   },
      //   {
      //     content: "View on your store",
      //     onAction: () => alert("View on your store action"),
      //   },
      // ]}
      // actionGroups={[
      //   {
      //     title: "Promote",
      //     accessibilityLabel: "Action group label",
      //     actions: [
      //       {
      //         content: "Share on Facebook",
      //         accessibilityLabel: "Individual action label",
      //         onAction: () => alert("Share on Facebook action"),
      //       },
      //     ],
      //   },
      // ]}
      // pagination={{
      //   hasPrevious: true,
      //   hasNext: true,
      // }}
      >
        <Card title="Credit card" sectioned>
          <p>User info:</p>
          <div>Customer Name: {props.details.customer_name}</div>
          <div>Username: {props.details.username}</div>
          <Button
            primary={true}
            href="#"
            onClick={() => {
              props.deleteSession();
              localStorage.removeItem("details");
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Card>
      </Page>
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
