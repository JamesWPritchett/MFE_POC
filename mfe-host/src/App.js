import React from "react";
import { connect } from "react-redux";
import { incrCount } from "./reducer.actions";
import { ContextTester } from "./context-tester";
import { loadComponent } from "./loadComponent";
import "./App.css";

function App({ incrCount, count }) {

  const DynamicTile = React.lazy(
    loadComponent({
      remote: {
        url: "http://localhost:3003/remoteEntry.js",
        name: "MFEDynamic",
      },
      component: "Tile",
    })
  );

  const MFE1_Button = React.lazy(
    loadComponent({
      remote: {
        url: "http://localhost:3001/remoteEntry.js",
        name: "MFE1",
      },
      component: "Button",
    })
  );

  const MFE3_Button = React.lazy(
    loadComponent({
      remote: {
        url: "http://localhost:3002/remoteEntry.js",
        name: "MFE3",
      },
      component: "Button3",
    })
  );

  const MFE3_Input = React.lazy(
    loadComponent({
      remote: {
        url: "http://localhost:3002/remoteEntry.js",
        name: "MFE3",
      },
      component: "Input",
    })
  );

  return (
    <div>
      <h1>MFE-Host</h1>
      <ContextTester />
      <div>
        <React.Suspense fallback="Loading MFE1 Button">
          <MFE1_Button />
        </React.Suspense>
        <React.Suspense fallback="Loading MFE3 Button">
          <MFE3_Button name={"MFE3 Button Prop"} callback={incrCount} />
        </React.Suspense>
        <React.Suspense fallback="Loading MFE3 Input">
          <MFE3_Input />
        </React.Suspense>
        <React.Suspense fallback="Loading DynamicTile...">
          <DynamicTile />
        </React.Suspense>
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
