import { useEffect, useState } from 'react';
import { doc, collection } from "firebase/firestore";
import { getData } from '../lib/fetcher';
import { ContentArray } from '../lib/types';
import { db } from "../api/firebase";
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function ContentArrayComponent() {
    const [data, setData] = useState<ContentArray | null>(null);

    useEffect(() => {
        const mainCol = collection(db, 'main');
        const docRef = doc(mainCol, 'content');

        const fetchData = async () => {
            const firestoreData = await getData<ContentArray>(docRef);
            setData(firestoreData);
        };

        fetchData();
    }, []);

    const locale = useRouter().locale || 'ka';

    const renderContent = () => {
        if (!data || !data.data) return null;

        return data.data.map((item, index) => {
            const isEven = (index + 1) % 2 === 0;
            const content = (item.content && item.content[locale]);
            return (
                <div key={index}>
                    <div
                        className={`content-array ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={"content-array-item-content"} dangerouslySetInnerHTML={{ __html: content || '' }} />
                        {item.image && (
                            <div className={"content-array-item-image"}>
                                <Image
                                    src={item.image}
                                    alt={content}
                                    width={100}
                                    height={100}
                                    layout="responsive"
                                    objectFit="cover"
                                    style={{
                                        borderRadius: '0.5rem',
                                        boxShadow: '0 8px 10px rgba(155, 172, 181, 0.5)',
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    {index < data.data.length - 1 && (<div className="divider"> </div>)}
                </div>
            );
        });
    };

    return (
        <div className="content-array-container">
            <div className='spacerBottom' />
            {renderContent()}
            <div className='spacerBottom' />
        </div>
    );
};
