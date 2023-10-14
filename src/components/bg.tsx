import { useState, useEffect } from 'react';
import Image from 'next/image';
import { doc, collection, getDoc } from "firebase/firestore";
import { db } from "../api/firebase";

export default function Bg() {
    const [bgSrc, setBgSrc] = useState('');

    useEffect(() => {
        const mainCol = collection(db, 'main');
        const initialDocRef = doc(mainCol, 'initial');

        const fetchData = async () => {
            try {
                const docSnapshot = await getDoc(initialDocRef);
                if (docSnapshot.exists()) {
                    const bg = docSnapshot.data().bg;
                    setBgSrc(bg);
                }
            } catch (error) {
                console.error('Error fetching data from Firebase: ', error);
                setBgSrc("https://firebasestorage.googleapis.com/v0/b/saingilo-com.appspot.com/o/bg1.jpeg?alt=media&token=ec04f418-c92d-485a-a093-5bda1381713b&_gl=1*54ha3l*_ga*NDMzMDE5MjQyLjE2ODE5ODc4MDA.*_ga_CW55HF8NVT*MTY5NzI4MTU1NC41My4xLjE2OTcyODc4ODAuMy4wLjA.");
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <Image
                priority
                src={bgSrc}
                alt="ქურმუხი, ქართული ეკლესია აზ. რ. კახის რაიონში"
                layout="fill"
                objectFit="cover"
                objectPosition="top"
            />
        </div>
    );
}
