import React from 'react';
import "./Home.scss";
import { FaUser } from "react-icons/fa";
import { MdOutlineAssignment } from "react-icons/md";
import { CiBank } from "react-icons/ci";
import { IoMdDocument } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { GrStatusUnknown } from "react-icons/gr";

export default function Home() {

    const navigate = useNavigate();
    
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
            type: "Registration Status",
            icon: <GrStatusUnknown></GrStatusUnknown>,
        },
        {
            type: "Fees Status",
            icon: <GrStatusUnknown></GrStatusUnknown>,
        }
    ];

    const handleRedirect = (e) => {
        const target = e.target.getAttribute("name");

        if(target === "Profile"){
            navigate("/student/profile");
        }
        else if(target === "Registration"){
            navigate("/student/semester-registration");
        }
        else if(target === "Verify Fees"){
            navigate("/student/fee-verification");
        }
        else if(target === "Documents"){
            navigate("/student/select-document");
        }
        else if(target === "Registration Status"){
            navigate("/student/registration-status");
        }
        else if(target === "Fees Status"){
            navigate("/student/fee-verification-status");
        }

    }

    return (
        <div className="home_container">
            <div className="home_container__title">
                Home
            </div>
            <div className="home_container__cards">
                {
                    cards.map((card, index) => {
                        return (
                            <div className="home_container__cards__card" key={index} onClick={handleRedirect} name = {card.type}>
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
