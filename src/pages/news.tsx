import Head from "next/head"

const news = () => {
    return (
        <>
            <Head>
                <title>სიახლეები | საინგილო</title>
                <meta
                    name="description"
                    content="მთავარი ინფორმაციის და სიახლეების გვერდი ისტორიოულ ჰერეთზე/საინგილოზე"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:image" content="/saingilo_preview.png" />
                <link rel="icon" href="/logovazi.svg" />
            </Head>
        </>
    )
}

export default news
