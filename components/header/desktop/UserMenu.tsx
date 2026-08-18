'use client'
import { useUser } from "@/features/user/useUser";
import { capitalizeFirstLetter } from "@/utils/truncate";
import Image from 'next/image';



export default function UserMenu() {

    const { data: currentUser } = useUser();

    const isLoggedIn = !!currentUser;

    return (
        <ul className="flex items-center list-none p-0 m-0">

            {isLoggedIn &&
                <>
                    <li className="flex items-center text-white text-[20px] relative group border-gray-300">
                        {currentUser.name}
                    </li>

                    <li className="pl-[7px] flex items-center text-[1.7rem] relative">

                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            {currentUser.profileImageUrl ? (
                                <Image
                                    width={500}
                                    height={500}
                                    src={currentUser.profileImageUrl}
                                    alt={currentUser.name}
                                    unoptimized
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="bg-[#f0eded] text-black flex items-center justify-center w-full h-full">
                                    {capitalizeFirstLetter(currentUser.name)}
                                </div>
                            )}
                        </div>

                    </li>
                </>
            }
        </ul>
    );
};
