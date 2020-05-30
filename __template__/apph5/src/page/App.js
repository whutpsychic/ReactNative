import React from "react";
import "./App.css";
import Zlist from "../components/Zlist/index";

const renderItem = (item, i) => {
  return <div style={{ textAlign: "center", padding: 20 }}>{item}</div>;
};

function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <div className="app-contents">
          <div className="con">
            {
              <Zlist
                ref={ref => (this.list = ref)}
                data={genData()}
                onRefresh={this.onRefresh}
                renderItem={(item, i) => {
                  return renderItem(item, i);
                }}
              />
            }
          </div>
        </div>
      </div>
    );
  }

  onRefresh = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(2);
      }, 1000);
    });
  };
}

export default App;
