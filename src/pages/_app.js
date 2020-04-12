import React from "react";
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/styles.css'

const App = ({ Component, pageProps }) => {
    return (
        <div>
            <Header></Header>
            <div className="min-h-screen container mx-auto">
                <Component {...pageProps}/>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default App