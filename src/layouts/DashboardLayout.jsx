import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">

            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <div className="lg:ml-72">

                <Navbar
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <main className="p-4">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;