import Head from "next/head"

const news = () => {
    return (
        <>
            <Head>
                <title>სიახლეები | საინგილო</title>
                <meta
                    name="description"
                    content="საინგილოს დამოუკიდებელი საინფორმაციო ვებ გვერდი"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:image" content="/saingilo_preview.png" />
                <link rel="icon" href="/logovazi.svg" />
            </Head>

            <div className="pg bg-black">
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <p className="bgtext" style={{ color: "white", textAlign: "center" }}>
                        სიახლეების გვერდი მალე ხელმისაწვდომი იქნება
                    </p>
                </div>
            </div>
        </>
    )
}

export default news
