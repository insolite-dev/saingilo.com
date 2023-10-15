import { useState, useEffect } from 'react';
import Image from 'next/image';
import { doc, collection, getDoc } from "firebase/firestore";
import { db } from "../api/firebase";

export default function Bg() {
    const [bgSrc, setBgSrc] = useState('');

    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/saingilo-com.appspot.com/o/bg1.png?alt=media&token=07dcf4e7-9b28-4b04-a6a5-2cccc7afc48d";
    useEffect(() => {
        const mainCol = collection(db, 'main');
        const initialDocRef = doc(mainCol, 'initial');

        const fetchData = async () => {
            try {
                const docSnapshot = await getDoc(initialDocRef);
                if (!docSnapshot.exists()) {
                    console.error('No data found in Firebase');
                    setBgSrc(defaultImage);
                } else {
                    const bgs = docSnapshot.data().bgs;
                    if (bgs && bgs.length > 0) {
                        const randomIndex = Math.floor(Math.random() * bgs.length);
                        console.log("RANDOM INDEX IS: ", randomIndex);
                        console.log("BGS", bgs);
                        const randomBg = bgs[randomIndex];
                        setBgSrc(randomBg);
                    } else {
                        console.error('No backgrounds found in Firebase');
                        setBgSrc(defaultImage);
                    }
                }
            } catch (error) {
                console.error('Error fetching data from Firebase: ', error);
                setBgSrc(defaultImage);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            {bgSrc && (
                <Image
                    priority
                    src={bgSrc}
                    alt="ქურმუხი, ქართული ეკლესია აზ. რ. კახის რაიონში"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                />
            )}
        </div>
    );
}

