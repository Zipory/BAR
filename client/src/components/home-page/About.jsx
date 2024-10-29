import React from "react";

const About = () => {
  return (
    <div className="flex-container ">
      <div className="right">
        <div className=" about-us ">
          <h2>קצת עלינו:</h2>
          <p>אנחנו נותנים קישור ישיר בין מנהלי האירועים לבין מלצרים.</p>
        </div>
      </div>
      <div className="left">
        {" "}
        <div className=" about-us ">
          <h2>הידעת ש...</h2>
          <p>
            כיום ההתנהלות שבין מלצרים לבין מנהלי אירועים נעשת בעיקר על ידי
            תיווך, כך שהרבה מארגני אירועים מתקשים להשיג מלצרים טובים לארועים
            שלהם.
          </p>
        </div>
      </div>
      <div className="right">
        {" "}
        <div className=" about-us ">
          <h2>איך זה עובד:</h2>
          <p>
            כל אחד מהצדדים נרשם למערכת. המנהל מעלה אירוע שיחול בזמן הקרוב המלצר
            רואה ונרשם למתי שנוח לו, ונותן שרות מכל הלב.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
