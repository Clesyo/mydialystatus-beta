import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import Link from 'next/link';


const NavLink = ({href, children}) => {
    return(
        <Link href={href}>
            <a className="p-2 hover:underline hover:text-red-600">{children}</a>
        </Link>
    )
}
const NavLinkLogout = ({href, children}) => {
    return(
            <a href={href} className="p-2 hover:text-red-600 "> <FiLogOut className="inline" /> </a>
                
    )
}

const NavBar = () => {
    return (
            
            <div className="bg-gray-500 py-4 text-center">
            
                <NavLink href="/sobre" >Sobre</NavLink>
                <NavLink href="/cadastro" >Cadastro</NavLink>
                <NavLink href="/entrar" >Entrar</NavLink>            
                
                <NavLinkLogout href="/api/logout" ></NavLinkLogout>
                
            </div>
    )
}

export default NavBar