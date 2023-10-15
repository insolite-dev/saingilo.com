import Head from "next/head"

export default function Home() {
    return (
        <>
            <Head>
                <title>მთავარი | საინგილო</title>
                <meta
                    name="description"
                    content="საინგილოს დამოუკიდებელი საინფორმაციო ვებ გვერდი"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:image" content="/saingilo_preview.png" />
                <link rel="icon" href="/logovazi.svg" />
            </Head>
        </>
    )
}
