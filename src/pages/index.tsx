import Bg from "@/components/bg"
import Head from "next/head"

export default function Home() {
    return (
        <>
            <Head>
                <title>საინგილო</title>
                <meta
                    name="description"
                    content="დამოუკიდებელი საინფორმაციო ვებ გვერდი ისტორიულ ჰერეთზე/საინგილოზე"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:image" content="/saingilo_preview.png" />
                <link rel="icon" href="/logovazi.svg" />
            </Head>

            <div className="relative h-screen">
                <Bg />
                <div className="absolute left-8 bottom-10 text-white">
                    <p className="bgtext">
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
        </>
    )
}
