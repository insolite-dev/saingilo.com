import "@/styles/globals.css"
import Bg from "../components/bg"
import Header from "../components/header"
import Footer from "../components/footer"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    return (
        <>
            <div>
                {router.pathname === "/" &&
                    <div className="relative h-screen">
                        <Bg />
                        <div className="absolute left-8 bottom-10 text-white">
                            <p className="bgtext">
                                ჩვენ ვართ ისტორიული <br />
                                ქართული კუთხის - საინგილოს <br />
                                მკვიდრი ქართველები <br /> და ვცდილობთ შევინარჩუნოთ <br />
                                დედა ენა, ეროვნული იდენტობა <br />
                                და წინაპართაგან <br />
                                გადმოცემული ტრადიციები <br />
                            </p>
                        </div>
                    </div>
                }
                {router.pathname === "/" ? (
                    <div className="absolute top-0 left-0 right-0 bg-black/70 backdrop-blur-md">
                        <header>
                            <Header />
                        </header>
                    </div>
                ) : (
                    <div className="bg-black/90 backdrop-blur-md">
                        <header>
                            <Header />
                        </header>
                    </div>
                )}
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
