/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { RiMessage3Line } from "react-icons/ri";

const Notification = ({ info }: any) => {

  const [opens, setOpens] = useState<number[]>([]);

  const handleOpens = (index: number) => {
    if (opens.includes(index)) {
      setOpens(opens.filter(x => x !== index));
    }
    else {
      setOpens((prevState) => [...prevState, index]);
    }
  }


  return (
    <div className="drop-down-notify">
      <ul className="drop-down animated">
        <li className="title">
          <div>Notifications</div>
        </li>
      </ul>
      <div id="faq-container-noti">

        {true ? <div className="noti-no-record">
          <h6> <RiMessage3Line size={40} color="#999999" style={{ marginRight: "5px" }} />  </h6>
          <span>No Notifications</span></div> :
          info?.map((item: any, i: number) => (
            <div key={i} className={opens.includes(i) ? "faq active" : "faq"} onClick={() => handleOpens(i)}>
              <h3 className="faq-title">{item.type}</h3>
              <p className="faq-text">{item.details}</p>
              <button className="faq-toggle">
                <i className="fas fa-angle-down"></i>
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Notification;

