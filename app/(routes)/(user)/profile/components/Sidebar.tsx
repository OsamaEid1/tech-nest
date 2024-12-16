import Image from 'next/image';
import Link from 'next/link';


function ProfileSidebar({ id, name, pic, followingTopics }) {
    return (
       <div className="text-center">
          <Image
             src={pic || "/assets/images/full-back-user.png"}
             alt="User Image"
             priority
             width={180}
             height={180}
             className="rounded-full shadow shadow-hovers mx-auto"
          />
          <h3 className="mt-5 mb-2 capitalize">{name || "User"}</h3>
          <Link
             href={`edit-profile/${id}`}
             className="duration-300 underline hover:no-underline hover:text-hovers"
          >
             Edit Your Profile
          </Link>

          <div className="mt-3">
             <h3>The Following Topics:</h3>
             <ul className="bg-light flex flex-wrap rounded-main p-2">
                {followingTopics ? (
                   followingTopics.map((topic, index) => (
                      <li
                         key={index}
                         className="m-1 p-2 rounded-full whitespace-nowrap font-medium bg-white"
                      >
                         {topic}
                      </li>
                   ))
                ) : (
                   <li className="text-left">
                      You don't follow any topics yet!
                   </li>
                )}
             </ul>
             <Link
                href="/manage-following-topics"
                className="duration-300 underline hover:no-underline hover:text-hovers"
             >
                Manage Your Following Topics
             </Link>
          </div>
       </div>
    );
}

export default ProfileSidebar