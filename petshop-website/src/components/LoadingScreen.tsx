import Image from 'next/image'
import React from 'react'

type Props = {}

export default function LoadingScreen({ }: Props) {
    return (
        <div className="w-full h-full bg-white flex items-center justify-center">

            <div className="rounded-lg">
                <div className="w-32 h-32 px-2">
                    <Image
                        className="rounded-lg"
                        src={"https://static.vecteezy.com/system/resources/thumbnails/005/601/776/small/pet-shop-logo-vector.jpg"}
                        alt=""
                        width={128}
                        height={128}
                    />
                    <div className="grid gap-5 grid-cols-5 py-5">
                        <span className="animate-bounce inline-flex h-3 w-3 rounded-full bg-black opacity-75" />
                        <span className="animate-bounce delay-200 inline-flex h-3 w-3 rounded-full bg-black opacity-75" />
                        <span className="animate-bounce delay-300 inline-flex h-3 w-3 rounded-full bg-black opacity-75" />
                        <span className="animate-bounce delay-500 inline-flex h-3 w-3 rounded-full bg-black opacity-75" />
                        <span className="animate-bounce delay-700 inline-flex h-3 w-3 rounded-full bg-black opacity-75" />
                    </div>
                </div>
            </div>
        </div>
    )
}