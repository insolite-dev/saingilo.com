import "@/styles/globals.css"
import Bg from "../../public/bg.jpg"
import Image from "next/image"
import Header from "../components/header"
import Footer from "../components/footer"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <div>
                <div className="relative h-screen">
                    <Image
                        priority
                        src={Bg}
                        alt="ქურმუხი, ქართული ეკლესია აზ. რ. კახის რაიონში"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="top"
                    />
                    <div className="absolute left-8 bottom-10 text-white">
                        <p className="text-4xl font-extrabold" style={{ lineHeight: '45px' }}>
                            ჩვენ ვართ ეროვნების <br />
                            დავიწყების კარზე მიმდგარი <br />
                            ქართველები! <br />
                            და ეს ჩვენი ვებ გვერდია, <br />
                            სადაც ვცდილობთ <br />
                            რაც შეგვინარჩუნეს <br />
                            გავაგრძელოთ ... <br />
                        </p>
                    </div>
                </div>
                <div className="absolute top-0 left-0 right-0 bg-black/50 backdrop-blur-md">
                    <header>
                        <Header />
                    </header>
                </div>
                <main>
                    <Component {...pageProps} />
                </main>

                <footer className="bg-[#111111] py-6">
                    <Footer />
                </footer>
            </div>
        </>
    )
}
