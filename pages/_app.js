import Link from "next/link"
import { useRouter } from "next/router"
import "../styles/global.css"
import React from 'react';

export default function App({ Component, pageProps }) {
    const router = useRouter()

    return (
        <>
            <header>
                <h1>Chronicles</h1>
                <nav className="header-nav">
                    <ul>
                        <li>
                            <Link className={router.pathname == "/" ? "active" : ""} href="/">
                            Home
                            </Link>
                        </li>
                        <li>
                            <Link className={router.pathname == "/about" ? "active" : ""} href="/about">
                            About
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <Component {...pageProps} />
            <footer></footer>
        </>
    )
}