import React from "react";
import Header from "./Header";

const Dashboard = () => {
  return (
    <div className="main-content">
      <Header />
      {/* Dashboard Section */}
      <section className="dashboard">
        <div className="widget">
          <h3>כמות החברות</h3>
          <p>47</p>
        </div>
        <div className="widget">
          <h3>כמות המלצרים</h3>
          <p>230</p>
        </div>
        <div className="widget">
          <h3>רווח חודשי</h3>
          <p>$5000</p>
        </div>
        <div className="widget">
          <h3>חברות שמחכות לאישור</h3>
          <p>11</p>
        </div>
        <div className="widget">
          <h3>מלצרים שמחכים לאישור</h3>
          <p>25</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
