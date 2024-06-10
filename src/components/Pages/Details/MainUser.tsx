import React from "react";
import "./Details.css";

import Services from "../Services";

export interface UserInfo {
  username: string;
  pib: string;
  _id: string;
  officialEmail: string;
  email: string;
  phone: string;
  grad: string;
  commercial: string;
}

interface MainUserProps {
  userInfo: UserInfo | null | undefined;
}

let services = [
  "Osnovni podaci",
  "Komercijalni uslovi",
  "Ugovori",
  "Adrese isporuke",
  "Korisnici",
];

const MainUser: React.FC<MainUserProps> = ({ userInfo }) => {
  console.log("useInfo: ", userInfo);
  return (
    <div>
      <div className="mainBox">
        <div>
          <ul className="navBox">
            {services.map((service, idx) => (
              <li key={service + idx} className="serviceBox">
                <Services service={service} idx={idx} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div className="itemRow">
          <div className="itemName">Ime:&nbsp;</div>
          <div>{userInfo?.username}</div>
        </div>
        <div className="itemRow">
          <div className="itemName">PIB:&nbsp;</div>
          <div>{userInfo?.pib}</div>
        </div>
        <div className="itemRow">
          <div className="itemName">Matični broj:&nbsp;</div>
          <div>{userInfo?._id}</div>
        </div>
        <div className="itemRow">
          <div className="itemName">Zvanični E-mail:&nbsp;</div>
          <div>{userInfo?.email}</div>
        </div>
        <div className="itemRow">
          <div className="itemName">E-mail:&nbsp;</div>
          <div>{userInfo?.email}</div>
        </div>
        <div className="itemRow">
          <div className="itemName">Broj telefona:&nbsp;</div>
          <div>{userInfo?.phone}</div>
        </div>
        <div className="itemRow">
          <div className="itemName">Grad:&nbsp;</div>
          <div>{userInfo?.grad}</div>
        </div>
        <div className="itemRow">
          <div className="itemName">Moj komercijalsita:&nbsp;</div>
          <div>{userInfo?.commercial}</div>
        </div>
      </div>
    </div>
  );
};

export default MainUser;
