import React from 'react';
import "./Home.scss";
import { FaUser } from "react-icons/fa";
import { MdOutlineAssignment } from "react-icons/md";
import { CiBank } from "react-icons/ci";
import { IoMdDocument } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";


export default function Home() {
    
    const cards = [
        {
            type: "Profile",
            icon: <FaUser></FaUser>,
        },
        {
            type: "Registration",
            icon: <MdOutlineAssignment></MdOutlineAssignment>,
        },
        {
            type: "Verify Fees",
            icon: <CiBank></CiBank>
        },
        {
            type: "Documents",
            icon: <IoMdDocument></IoMdDocument>,
        },
        {
            type: "Contact Us",
            icon: <IoCallOutline></IoCallOutline>,
        }
    ];

    return (
        <div className="home_container">
            <div className="home_container__title">
                Home
            </div>
            <div className="home_container__cards">
                {/* <div className="home_container__cards__card">
                    <FaUser></FaUser>Profile
                </div> */}
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
