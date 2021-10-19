import React from "react";
import { connect } from "react-redux";
import { incrCount } from "./reducer.actions";
import { ContextTester } from "./context-tester";
import { loadComponent } from "./loadComponent";
import "./App.css";

function App({ incrCount, count }) {
  const tiles = [
    {
      url: "http://localhost:3001/remoteEntry.js",
      tileName: "MFE1",
      exposedComponent: "Button",
    },
    {
      url: "http://localhost:3002/remoteEntry.js",
      tileName: "MFE3",
      exposedComponent: "Button3",
      props: {
        callback: incrCount,
        name: "dynamically-loaded button"
      },
    },
    {
      url: "http://localhost:3002/remoteEntry.js",
      tileName: "MFE3",
      exposedComponent: "Input",
    },
    {
      url: "http://localhost:3003/remoteEntry.js",
      tileName: "MFEDynamic",
      exposedComponent: "Tile",
    },
  ];

  const getDynamicComponent = (t) => {
    const DynamicComponent = React.lazy(
      loadComponent({
        remote: {
          url: t.url,
          name: t.tileName,
        },
        component: t.exposedComponent,
      })
    );

    return (
      <React.Suspense fallback={`loading ${t.tileName}`}>
        <DynamicComponent {...t.props} />
      </React.Suspense>
    );
  };

  const loadDynamicComponents = () => {
    return tiles.map((t) => getDynamicComponent(t));
  };

  return (
    <div>
      <h1>MFE-Host</h1>
      <ContextTester />
      <div>
        {loadDynamicComponents()}
        <h2>{count}</h2>
      </div>
      <h2>MFE-Host</h2>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    incrCount: () => dispatch(incrCount()),
  };
};

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
