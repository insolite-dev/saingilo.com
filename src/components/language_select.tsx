import { ChangeEventHandler } from "react";

export default function LanguageChange({
    defaultLocale,
    changeLanguage,
}: {
    defaultLocale: any;
    changeLanguage: ChangeEventHandler;
}) {
    return (
        <select
            value={defaultLocale}
            onChange={changeLanguage}
            className="text-gray-500 hover:text-white px-8 py-4 rounded-md text-sm font-medium language-select"
            style={{
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: 0,
            }}
        >
            <option value="ka">ქართული</option>
            <option value="en">English</option>
            <option value="az">Azərbaycan Dili</option>
        </select>
    );
}
