import { Menu, Transition } from '@headlessui/react'
import { TfiWorld } from 'react-icons/tfi';

export default function LanguageChange({
    changeLanguage,
}: {
    changeLanguage: (language: string) => void;
}) {
    return (
        <div className="flex items-center justify-center">
            <div className="relative inline-block text-left">
                <Menu>
                    {({ open }) => (
                        <>
                            <span className="rounded-md">
                                <Menu.Button className="text-gray-500 hover:text-white rounded-md text-sm font-medium language-select">
                                    <TfiWorld className="language-icon" />
                                </Menu.Button>
                            </span>

                            <Transition
                                show={open}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    static
                                    className="absolute right-0 w-56 mt-6 origin-top-right bg-black bg-opacity-70 backdrop-blur divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                                >
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => changeLanguage("ka")}
                                                    className={`${active
                                                        ? "bg-gray-900 bg-opacity-70 text-white"
                                                        : "text-white"
                                                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                                >
                                                    ქართული
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => changeLanguage("en")}
                                                    className={`${active
                                                        ? "bg-gray-900 bg-opacity-70 text-white"
                                                        : "text-white"
                                                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                                >
                                                    English
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => changeLanguage("az")}
                                                    className={`${active
                                                        ? "bg-gray-900 bg-opacity-70 text-white"
                                                        : "text-white"
                                                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                                >
                                                    Azərbaycan Dili
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>
        </div>
    );
}
