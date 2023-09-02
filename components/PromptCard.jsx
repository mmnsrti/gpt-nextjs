"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt).then(() => {
      setTimeout(() => {
        setCopied("");
      }, 2000);
    });
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={50}
            height={50}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-700 font-satoshi ">
              {post.creator.userName}
            </h3>
            <p className="font-inter text-sm text-gray-400">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-600">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient flex flex-row space-x-1">
        {post.tag.map((tag) => (
          <div
            className="mr-2 cursor-pointer"
            key={tag}
            onClick={() => handleTagClick && handleTagClick(tag)}
          >
            #{tag}
          </div>
        ))}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="flex-center mt-5 border-t border-gray-150 pt-3  gap-8">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm text-red-700 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
