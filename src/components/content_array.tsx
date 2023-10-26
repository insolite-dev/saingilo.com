import { useEffect, useState } from 'react';
import { doc, collection } from "firebase/firestore";
import { getData } from '../lib/fetcher';
import { ContentArray } from '../lib/types';
import { db } from "../api/firebase";

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

    const renderContent = () => {
        if (!data || !data.data) return null;

        return data.data.map((item, index) => {
            const isEven = (index + 1) % 2 === 0;
            const alignImageRight = isEven ? true : false;

            return (
                <div>
                    <div
                        key={index} className={`content-array ${alignImageRight ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={"first-obj"} dangerouslySetInnerHTML={{ __html: item?.content || '' }} />
                        {item.image && (
                            <div className={`second-obj`}>
                                <img src={item.image} alt={item.content} />
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
