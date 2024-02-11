import { useState, useEffect } from 'react';
import { doc, collection, DocumentReference } from "firebase/firestore";
import { db } from "../api/firebase";
import { Initial } from "../lib/types";
import Image from 'next/image';
import { getData } from '../lib/fetcher';
import { useRouter } from 'next/router';

const defaultSlog: Record<string, string> = {
    "ka": "ჩვენ ვართ ისტორიული <br /> ქართული კუთხის - საინგილოს <br /> მკვიდრი ქართველები <br /> და ვცდილობთ შევინარჩუნოთ <br /> დედა ენა, ეროვნული იდენტობა <br /> და წინაპართაგან <br /> გადმოცემული ტრადიციები <br />",
    "en": "We are native Georgians <br /> from the historical <br /> Georgian corner, Saingilo,<br/> and we strive to preserve <br/> our mother tongue, national <br /> identity, and the traditions <br/> handed down from our ancestors.<br/>",
    "az": "Biz tarixi Saingilo guşəsindən <br /> olan yerli gürcülərik və biz <br /> ana dilimizi, şəxsiyyətimiz, <br/> və əcdadlarımızdan miras qalmış <br/> adət-ənənələrimizi qorumağa çalışırıq.<br/>",
};

const Bg = ({ image }: { image: string | undefined }) => {
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/saingilo-com.appspot.com/o/bg1.png?alt=media&token=07dcf4e7-9b28-4b04-a6a5-2cccc7afc48d";
    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <Image
                src={image || defaultImage}
                alt="Random Background Image"
                layout="fill"
                objectFit="cover"
                objectPosition="top"
            />
        </div>
    );
}

const BgContainer = () => {
    const [initial, setInitial] = useState<Initial | null>(null);

    useEffect(() => {
        const mainCol = collection(db, 'main');
        const docRef = doc(mainCol, 'initial');

        const fetchData = async () => {
            const firestoreData = await getData<Initial>(docRef as DocumentReference<Initial>);
            setInitial(firestoreData);
        };

        fetchData();
    }, []);

    const locale = useRouter().locale || 'ka';
    const slog = (initial && initial.slog[locale]) || defaultSlog[locale];

    const randomIndex = Math.floor(Math.random() * (initial?.bgs?.length || 0));
    return (
        <div className="relative h-screen">
            <Bg image={initial?.bgs?.[randomIndex]} />
            <div className="absolute left-8 bottom-10 text-white">
                <p className="bgtext" dangerouslySetInnerHTML={{ __html: slog || '' }}></p>
            </div>
        </div>
    )
}

export { Bg, BgContainer }
