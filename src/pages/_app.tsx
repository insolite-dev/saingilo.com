import "@/styles/globals.css"
import { BgContainer } from "../components/bg"
import Header from "../components/header"
import Footer from "../components/footer"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    return (
        <div className="fixedbody">
            <div className="scroll">
                {router.pathname === "/" && <BgContainer /> }
                {router.pathname === "/" ? (
                    <div className="absolute top-0 left-0 right-0 bg-black/70 backdrop-blur-md">
                        <header> <Header /> </header>
                    </div>
                ) : (
                    <div className="bg-black/90 backdrop-blur-md">
                        <header> <Header /> </header>
                    </div>
                )}
                <main> <Component {...pageProps} /> </main>
                <footer className="bg-[#111111] py-6">
                    <Footer />
                </footer>
            </div>
        </div>
    )
}
