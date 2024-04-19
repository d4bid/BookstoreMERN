import React from 'react';
import BackButton from '../components/BackButtonHome';
import Team from '../assets/Devs/OJT.jpg';
import Dav from '../assets/Devs/1.png';
import Kyl from '../assets/Devs/2.png';
import JC from '../assets/Devs/3.png';
import Rhs from '../assets/Devs/4.png';

const AdminPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between items-center bg-white overflow-hidden">
            <div className="flex-grow"></div>
            <div className="flex flex-col items-center mt-8 scale-150">
                <button
                    className="bg-white-500 text-white rounded-full p-4 flex items-center justify-center"
                    style={{
                        width: '15vw',
                        height: '15vw',
                        backgroundImage: 'url("../../src/assets/SMU.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></button>

                <h2 className="text-base lg:text-xl text-black font-semibold mt-4 lg:mt-6">Developed by SMU OJT: </h2>
                <div className="flex flex-wrap justify-center">
                    {/* David */}
                    <div className="text-center mx-2 mb-8" style={{ width: '150px', padding: '10px' }}>
                        <img
                            src={Dav}
                            className="mx-auto mb-2 w-24 rounded-lg"
                            alt="David" />
                        <h5 className="mb-1 text-lg font-medium leading-tight">David Cabrito</h5>
                        <p>BSIT</p>
                        <p className="text-neutral-500 dark:text-neutral-400 italic text-sm">dvdcabrito@gmail.com</p>
                    </div>
                    {/* Kyle */}
                    <div className="text-center mx-2 mb-8" style={{ width: '150px', padding: '10px' }}>
                        <img
                             src={Kyl}
                            className="mx-auto mb-2 w-24 rounded-lg"
                            alt="Kyle" />
                        <h5 className="mb-1 text-lg font-medium leading-tight">Kyle Lejao</h5>
                        <p>BSIT</p>
                        <p className="text-neutral-500 dark:text-neutral-400 italic text-sm">plejao009@gmail.com</p>
                    </div>
                    {/* JC */}
                    <div className="text-center mx-2 mb-8" style={{ width: '150px', padding: '10px' }}>
                        <img
                             src={JC}
                            className="mx-auto mb-2 w-24 rounded-lg"
                            alt="JC" />
                        <h5 className="mb-1 text-lg font-medium leading-tight">JC Macalalay</h5>
                        <p>BSIT</p>
                        <p className="text-neutral-500 dark:text-neutral-400 italic text-sm">macalalayjc@gmail.com</p>
                    </div>
                    {/* Sir Rhess */}
                    <div className="text-center mx-2 mb-8" style={{ width: '150px', padding: '10px' }}>
                        <img
                             src={Rhs}
                            className="mx-auto mb-2 w-24 rounded-lg"
                            alt="JC" />
                        <h5 className="mb-1 text-lg font-medium leading-tight">Rhessan Mamoransing</h5>
                        <p>Supervisor</p>
                        <p className="text-neutral-500 dark:text-neutral-400 italic text-sm"></p>
                    </div>
                </div>
            </div>
            <div className='flex-grow'></div>
            <img
                src={Team}
                className="flex-fill mx-auto mb-4 w-full rounded-lg"
                alt="Team" />
            <div className="flex-grow"></div>
            <div className="w-full flex items-center justify-between px-4">
                <BackButton destination="/home" visibility="hidden" />
            </div>
        </div>
    );
};

export default AdminPage;
