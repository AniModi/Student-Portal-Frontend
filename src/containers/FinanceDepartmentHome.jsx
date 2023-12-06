import React from 'react';
import "./FinanceDepartmentHome.scss";
import { CiBank } from 'react-icons/ci';
import { BiReceipt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function FinanceDepartmentHome() {
    const navigate = useNavigate();
    const cards = [
        {
            type: "Verify Fees",
            icon: <CiBank></CiBank>
        },
        {
            type: "Upload Fees Receipts",
            icon: <BiReceipt />,
        },
    ];

    const handleCardClick = (card) => {
        if (card.type === "Verify Fees") {
            navigate("/finance/students");
        } else if (card.type === "Upload Fees Receipts") {
            navigate("/finance/upload");
        }
    }


    return (
        <div className="finance_department_home_container">
            <div className="home_container__title">
                Home
            </div>
            <div className="home_container__cards">
                {
                    cards.map((card, index) => {
                        return (
                            <div className="home_container__cards__card" key={index} onClick={() => {handleCardClick(card)}}>
                                {card.icon}
                                {card.type}
                            </div>
                        );
                    })
                }
                
            </div>
        </div>
    );
};
