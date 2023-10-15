
import Image from "next/image"
import Link from "next/link"
import Logo from "../../public/saingilo_logo.svg"

const navigation = [
    { name: "Instagram", href: "https://instagram.com/saingilo_com" },
    { name: "Facebook", href: "https://facebook.com/saingilo_com" },
    { name: "Twitter", href: "https://twitter.com/saingilo_com" },
]

const Footer = () => {
    return (
        <div className="bg-[#111111] flex flex-col sm:flex-rov items-center space-y-2 justify-start mx-6 py-2">
            <div className="flex flex-col sm:flex-row flex-shrink-0 items-center">
                <div style={{ paddingBottom: "15px" }}>
                    <Image
                        priority
                        src={Logo}
                        alt="saingilo.com"
                        height={60}
                        className="block h-8 w-auto lg:hidden"
                    />
                </div>
                <Image
                    priority
                    src={Logo}
                    alt="saingilo.com"
                    height={60}
                    className="hidden h-8 w-auto lg:block"
                />

                <p className="text-white mx-4 font-light"> © 2022 Insolite, Inc. All rights reserved.</p>
                <nav>
                    <ul>
                        <li className="space-x-3 my-2 sm:my-0 sm:space-x-4">
                            {navigation.map(item => (
                                <Link className="text-gray-400 hover:text-white" key={item.name} href={item.href}>
                                    {item.name}
                                </Link>
                            ))}
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Footer
