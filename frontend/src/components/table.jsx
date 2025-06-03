import React from "react";
import table_background from '../assets/table_background.png'

function Table({ children }){

    return (
        <div className="relative flex items-center justify-center mb-8 w-full max-w-4xl mx-auto px-8 pt-8" >
            <img
            src={table_background}
            className="w-full max-w-10xl rounded-lg shadow-lg object-cover filter brightness-70 justify-center"
            alt="Table background"
            />    
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="pointer-events-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Table;
