import React from "react";
import "./DocumentSelectionPage.scss";
import { IoMdDocument } from "react-icons/io";
import { FaGraduationCap } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import { TbCertificate } from "react-icons/tb";

export default function DocumentSelectionPage() {
  const cards = [
    {
      type: "Registration Form",
      icon: <IoMdDocument></IoMdDocument>,
    },
    {
      type: "Result",
      icon: <FaGraduationCap></FaGraduationCap>,
    },
    {
      type: "Fee Receipt",
      icon: <CiBank></CiBank>,
    },
    {
      type: "Bonafide Certificate",
      icon: <TbCertificate></TbCertificate>,
    },
  ];

  return (
    <div className="document_selection_container">
      <div className="home_container__title">Home</div>
      <div className="home_container__cards">
        {cards.map((card, index) => {
          return (
            <div className="home_container__cards__card" key={index}>
              {card.icon}
              {card.type}
            </div>
          );
        })}
      </div>
    </div>
  );
}
