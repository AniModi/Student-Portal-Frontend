import React from 'react';
import "./FinanceDepartmentHome.scss";
import { CiBank } from 'react-icons/ci';
import { BiReceipt } from 'react-icons/bi';


export default function FinanceDepartmentHome() {
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

    return (
        <div className="finance_department_home_container">
            <div className="home_container__title">
                Home
            </div>
            <div className="home_container__cards">
                {
                    cards.map((card, index) => {
                        return (
                            <div className="home_container__cards__card" key={index}>
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
