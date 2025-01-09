'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function AddArticleLayout({ children }) {
    const pathname = usePathname();

    return (
        <div className="max-w-4xl mt-[90px] mb-14 mx-auto px-8 py-4 bg-white rounded-main shadow shadow-shadows relative">
            <ul className="bg-slate-100 flex justify-between items-center divide-x-3 rounded-main">
                <li className="flex-1">
                    <Link
                        href="/articles/write"
                        className={`
                            block me-1 py-5 rounded-main text-center font-semibold 
                            ${pathname === '/articles/write' ? 'bg-black text-hovers text-xl' : 'duration-300 hover:bg-black hover:text-hovers text-lg italic'}
                        `}
                            >
                        Write
                    </Link>
                </li>
                <li className='flex-1'>
                    <Link
                        href="/articles/write/outsource"
                        className={`
                            block py-5 rounded-main text-center font-semibold
                            ${pathname === '/articles/write/outsource' ? 'bg-black text-hovers text-xl' : 'duration-300 hover:bg-black hover:text-hovers text-lg italic'}
                        `}
                    >
                        Add Outsource Article
                    </Link>
                </li>
            </ul>
            <div className='mt-4'>
                {children}
            </div>
        </div>
    );
}

export default AddArticleLayout