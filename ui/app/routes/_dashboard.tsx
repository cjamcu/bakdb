import { Link, Outlet, useNavigate } from "@remix-run/react";
import { Home, Settings, LogOut, Menu, User } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { pb } from "~/lib/pocketbase";


export default function DashboardLayout() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const user =  pb.authStore.model?.email || ''; 

    function handleLogout(): void {
        localStorage.removeItem('pocketbase_auth');
        navigate('/login');
    }

    const username = user?.split('@')[0] || 'User';

    return (
        <div className="min-h-screen bg-background fixed top-0 w-screen">
            <nav className="bg-background border-b fixed w-full top-0 z-10 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-2xl font-bold text-primary">Bakdb</span>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground">
                                    <Home className="mr-2 h-4 w-4" />
                                    Tasks
                                </Link>
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <div className="relative">
                                <Button 
                                    variant="ghost" 
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center"
                                >
                                    <User className="mr-2 h-4 w-4" />
                                    {username}
                                </Button>
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-background border rounded-md shadow-lg">
                                        <Button 
                                            variant="ghost" 
                                            onClick={handleLogout} 
                                            className="w-full justify-start px-4 py-2"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Cerrar sesión
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center sm:hidden">
                            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <Menu className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            <Link to="/" className="block px-3 py-2 text-base font-medium text-foreground">
                                <Home className="inline-block mr-2 h-4 w-4" />
                                Tasks
                            </Link>

                            <div className="px-3 py-2">
                                <Button 
                                    variant="ghost" 
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center w-full justify-start"
                                >
                                    <User className="mr-2 h-4 w-4" />
                                    {username}
                                </Button>
                                {isUserMenuOpen && (
                                    <Button 
                                        variant="ghost" 
                                        onClick={handleLogout} 
                                        className="w-full justify-start pl-8 py-2"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Cerrar sesión
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
            <main className="max-w-7xl mx-auto p-8 mt-12">
                <Outlet />
            </main>
        </div>
    );
}