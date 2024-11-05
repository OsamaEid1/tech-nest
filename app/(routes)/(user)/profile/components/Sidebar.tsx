import Image from 'next/image';
import Link from 'next/link';


function ProfileSidebar() {
    return (
        <div className="text-center">
            <Image
                src="/assets/images/my-pic.png"
                alt="User Image"
                width={150}
                height={150}
                className="rounded-full shadow shadow-hovers mx-auto"
            />
            <h3 className="mt-5 mb-2">Osama Eid</h3>
            <Link
                href="edit-profile"
                className="duration-300 underline hover:no-underline hover:text-hovers"
            >
                Edit User Info
            </Link>

            <div className="mt-3">
                <h3>Following Topics:</h3>
                <ul className="bg-light flex flex-wrap rounded-main p-2">
                    <li
                        className="m-1 p-2 rounded-full whitespace-nowrap font-medium bg-white"
                    >
                        Topic 1
                    </li>
                    <li
                        className="m-1 p-2 rounded-full whitespace-nowrap font-medium bg-white"
                    >
                        Topic 1
                    </li>
                    <li
                        className="m-1 p-2 rounded-full whitespace-nowrap font-medium bg-white"
                    >
                        Topic 1
                    </li>
                    <li
                        className="m-1 p-2 rounded-full whitespace-nowrap font-medium bg-white"
                    >
                        Topic 1
                    </li>
                    <li
                        className="m-1 p-2 rounded-full whitespace-nowrap font-medium bg-white"
                    >
                        Topic 1
                    </li>
                    <li
                        className="m-1 p-2 rounded-full whitespace-nowrap font-medium bg-white"
                    >
                        Topic 1
                    </li>
                    <li
                        className="m-1 p-2 rounded-full whitespace-nowrap font-medium bg-white"
                    >
                        Topic 1
                    </li>
                </ul>
                <Link 
                    href="/manage-following-topics"
                    className="duration-300 underline hover:no-underline hover:text-hovers"
                >Manage Your Following Topics</Link>
            </div>
        </div>
    );
}

export default ProfileSidebar