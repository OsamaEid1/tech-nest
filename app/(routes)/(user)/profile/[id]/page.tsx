import { Metadata } from "next";
import WrapperClientPage from "./components/WrapperClientPage";
import { notFound } from "next/navigation";
import { fetchUserProfileAndArticles } from "app/helpers/user/profiles/fetchUserProfileAndArticles";

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    if (!params.id) return { title: "Invalid Request" };

    try {
        const { user, articles } = await fetchUserProfileAndArticles(params.id);

        if (!user) notFound();

        return {
            title: `TechNest | ${user.name}` || "TechNest",
            description: user.description || "Writer Profile",
            openGraph: {
                title: `TechNest | ${user.name}` || "TechNest",
                description: "Writer Profile",
                images: [
                    {
                        url:
                            `TechNest | ${user.name}` ||
                            "/assets/images/full-back-user.png",
                        width: 800,
                        height: 600,
                        alt: "Article Thumbnail",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: `TechNest | ${user.name}` || "TechNest",
                description: "Writer Profile",
                images: [user.thumbnail || "/assets/images/full-back-user.png"],
            },
        };
    } catch (error) {
        console.error("Error fetching userProfile:", error);
        notFound();
    }
}

function BrowseUserProfile() {
    return <WrapperClientPage />
}

export default BrowseUserProfile