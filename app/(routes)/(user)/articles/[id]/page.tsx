import { fetchArticleById } from "app/helpers/user/article/fetchArticleById";
import { Metadata } from "next";
import WrapperClientPage from "./components/WrapperClientPage";
import { notFound } from "next/navigation";

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}): Promise<Metadata> {
    if (!params.id) return { title: "Invalid Request" };

    try {
        const article = await fetchArticleById(params.id);

        if (!article) 
            notFound();

        return {
            title: `TechNest | ${article.title}` || "TechNest",
            description: article.description || "An interesting article.",
            openGraph: {
                title: `TechNest | ${article.title}` || "TechNest",
                description: article.description || "An interesting article.",
                images: [
                    {
                        url:
                            `TechNest | ${article.title}` ||
                            "/assets/images/full-back-article.jpeg",
                        width: 800,
                        height: 600,
                        alt: "Article Thumbnail",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: `TechNest | ${article.title}` || "TechNest",
                description: article.description || "An interesting article.",
                images: [
                    article.thumbnail || "/assets/images/full-back-article.jpeg",
                ],
            },
        };
    } catch (error) {
        console.error("Error fetching article:", error);
        notFound();
    }
}

export default function ReadArticlePage() {
    return <WrapperClientPage />;
}
