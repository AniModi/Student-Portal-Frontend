import React from "react";
import "./DocumentSelectionPage.scss";
import { IoMdDocument } from "react-icons/io";
import { FaGraduationCap } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import { useNavigate } from "react-router-dom";


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
  ];

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    switch (card.type) {
      case "Registration Form":
        navigate("registration-form");
        break;
      case "Result":
        navigate("result");
        break;
      case "Fee Receipt":
        navigate("fee-receipt");
        break;
      default:
        break;
    }
  };

  return (
    <div className="document_selection_container">
      <div className="home_container__title">Home</div>
      <div className="home_container__cards">
        {cards.map((card, index) => {
          return (
            <div className="home_container__cards__card" key={index} onClick={
              () => {
                handleCardClick(card);
              }
            }>
              {card.icon}
              {card.type}
            </div>
          );
        })}
      </div>
    </div>
  );
}
