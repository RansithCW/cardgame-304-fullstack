import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

export default function() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
                {/* Renders all children as children here as the main components
                    Probly helps with tyling the navbar */}
            </main>
        </>
    )

}