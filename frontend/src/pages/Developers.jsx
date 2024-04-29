import React, { useState } from 'react';
import BackButton from '../components/BackButtonHome';
import Dav from '../assets/Devs/1.png';
import Kyl from '../assets/Devs/2.png';
import JC from '../assets/Devs/3.png';
import Rhs from '../assets/Devs/4.png';
import KP_QR from '../assets/Devs/LN/KP_QR.png'
import JC_QR from '../assets/Devs/LN/JC_QR.png'
import DV_QR from '../assets/Devs/LN/DV_QR.png'
import { motion } from 'framer-motion';

const AdminPage = () => {
    const [flips, setFlips] = useState([false, false, false, false]);

    const developers = [
        { name: "Engr. Rhessan Mamoransing", course: "Supervisor", email: "rhessanjan@hytecpower.com", image: Rhs, num: "+63 977 6520 964" },
        { name: "David Cabrito", course: "BSIT", email: "dvdcabrito@gmail.com", image: Dav, qr: DV_QR, num: "+63 917 3887 798" },
        { name: "Kyle Lejao", course: "BSIT", email: "plejao009@gmail.com", image: Kyl, qr: KP_QR, num: "+63 936 0631 100"},
        { name: "JC Macalalay", course: "BSIT", email: "macalalayjc@gmail.com", image: JC, qr: JC_QR, num: "+63 928 7082 283"  }
    ];

    const handleFlip = (index) => {
        const newFlips = flips.map((flip, i) => i === index ? !flip : flip);
        setFlips(newFlips);
    }

    return (
        <div className="min-h-screen flex flex-col justify-between items-center bg-white overflow-hidden ">
            <div className="flex-grow"></div>

            <button
                className="bg-white-500 text-white rounded-full p-4 flex items-center justify-center animate-pulse"
                style={{
                    width: '15vw',
                    height: '15vw',
                    backgroundImage: 'url("../../src/assets/SMU.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></button>
            <h2 className="text-base lg:text-xl text-black font-semibold mt-4 lg:mt-6">Developed by SMU OJT: </h2>
            <div className="flex-grow"></div>

            <div className="flex flex-col items-center mt-8 scale-150">
                <div className="py-8 px-8  flex flex-col justify-center items-center">
                    {developers.map((developer, index) => (
                        <motion.div
                            key={index}
                            className={`py-8 px-8 mb-8 w-full max-w-md mx-auto rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 ${flips[index] ? 'bg-white text-blue-950 border-blue-950 border-4' : 'bg-blue-950 text-white border-white border-4'}`}
                            style={{ height: '10rem', width: '20rem' }}
                            onClick={() => handleFlip(index)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{ rotateY: flips[index] ? 180 : 0 }}
                        >
                            <div className={flips[index] ? "hidden" : "block"}>
                                <div className="flex">
                                    <img className="block h-24 rounded-full sm:mx-0 sm:shrink-0 mr-4" src={developer.image} alt={developer.name} />
                                    <div className="ml-10 mt-5 text-left">
                                        <p className="text-lg font-semibold">{developer.name}</p>
                                        <p className="text-slate-500 font-medium">{developer.course}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={flips[index] ? "block" : "hidden "}>
                                <div className="flex items-center">
                                    <img className="block h-12 " src={developer.qr} />
                                    <div className="flex flex-col justify-center mx-5">
                                        <p className="font-medium" style={{ transform: "rotateY(-180deg)" }}>{developer.email}</p>
                                        <p className="font-medium" style={{ transform: "rotateY(-180deg)" }}>{developer.num}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="flex-grow"></div>
            <div className="w-full flex items-center justify-between px-4">
                <BackButton destination="/home" visibility="hidden" />
            </div>
        </div>
    );
};

export default AdminPage;
