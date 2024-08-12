import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

const FeedCard: React.FC = () => {
    return (
        <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
            <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1">
                    <Image src={"https://avatars.githubusercontent.com/u/148090007?s=400&v=4"} alt="user-image" height={50} width={50}/>
                </div>
                <div className="col-span-11">
                    <h5>Study-Code </h5>
                    <p>
                        contenthgsdj jnccjndcc njnxs ijkwd jksjxk
                        nknwwix iimwjx 
                    </p>
                    <div className="flex justify-between p-2 w-[90%] mt-5 text-xl items-center">
                        <div>
                            <BiMessageRounded />
                        </div>
                        <div>
                            <FaRetweet />
                        </div>
                        <div>
                            <AiOutlineHeart />
                        </div>
                        <div>
                            <BiUpload />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedCard;