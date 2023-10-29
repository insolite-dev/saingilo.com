import { useEffect, useState } from "react"
import Image from "next/image"
import { Disclosure, Transition } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Logo from "../../public/saingilo_logo.svg"
import { Fragment } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import getLocale from "../lib/locale"
import LanguageChange from "./language_select"

interface INavigationProps {
    name: string
    href: string
    current?: boolean
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}

export default function Header() {
    const [mounted, setMounted] = useState(false)

    const router = useRouter()

    const locale = getLocale(router.locale)

    const navigation: INavigationProps[] = [
        { name: locale.navbar_main, href: `/${router.locale}`, current: true },
        { name: locale.navbar_contact, href: `/${router.locale}/contact`, current: false },
        { name: locale.navbar_news, href: `/${router.locale}/news`, current: false },
    ]

    const pathName = `/${router.locale}${router.pathname}`.replace(/\/$/, '');

    useEffect(() => {
        const handleRouteChangeStart = () => {
            setMounted(true)
        }

        router.events.on("routeChangeStart", handleRouteChangeStart)
        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart)
        }
    }, [])

    const changeLanguage = (locale: string) => {
        router.push(router.route, router.asPath, { locale });
    };

    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <Disclosure as="nav">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">გახსენი მთავარი მენუ</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link href="/">
                                        <Image
                                            priority
                                            src={Logo}
                                            alt="saingilo.com"
                                            width={100}
                                            height={100}
                                            className="block h-8 w-auto lg:hidden"
                                        />
                                    </Link>
                                    <Link href="/">
                                        <Image
                                            priority
                                            src={Logo}
                                            alt="saingilo.com"
                                            width={100}
                                            height={100}
                                            className="hidden h-8 w-auto lg:block"
                                        />
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {/* Navbar on desktop */}
                                        {Object.keys(navigation).map((item: any) => {
                                            const current = navigation[item].href === pathName
                                            return (
                                                <a
                                                    key={navigation[item].name}
                                                    href={navigation[item].href}
                                                    className={classNames(
                                                        current
                                                            ? "text-white"
                                                            : "text-gray-500 hover:text-white",
                                                        "px-3 py-2 rounded-md text-sm font-medium"
                                                    )}
                                                    aria-current={navigation[item].current ? "page" : undefined}
                                                >
                                                    {navigation[item].name}
                                                </a>
                                            )
                                        })}
                                        <LanguageChange changeLanguage={changeLanguage} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Disclosure.Panel className="sm:hidden">
                                <div className="space-y-1 px-2 pt-2 pb-3">
                                    {/* Navbar on mobile */}
                                    {Object.keys(navigation).map((item: any) => {
                                        const current = navigation[item].href === pathName
                                        return (
                                            <Disclosure.Button
                                                key={navigation[item].name}
                                                as="a"
                                                href={navigation[item].href}
                                                className={classNames(
                                                    current
                                                        ? "text-white"
                                                        : "text-gray-500 hover:text-white",
                                                    "block px-3 py-2 rounded-md text-base font-medium"
                                                )}
                                                aria-current={navigation[item].current ? "page" : undefined}
                                            >
                                                {navigation[item].name}
                                            </Disclosure.Button>
                                        )
                                    })}
                                    <LanguageChange changeLanguage={changeLanguage} />
                                </div>
                            </Disclosure.Panel>
                        </Transition>
                    </div>
                </>
            )}
        </Disclosure>
    )
}
