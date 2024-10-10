"use client"
import { useState } from 'react';
import Slider from 'components/ui/Slider';

function MainContent() {
    const [savedArticles, setSavedArticles] = useState<string[]>(["Article 1", "Article 2", "Article 3", "Article 4", "Article 5", "Article 6"]);
    const [articles, setArticles] = useState<string[]>([
        "Article 1",
        "Article 2",
        "Article 3",
        "Article 4",
        "Article 5",
        "Article 6",
    ]);

    return (
        <>
            {/* Start Articles */}
            <div className="relative">
                <h2 className="text-3xl font-mono mb-3">Articles</h2>
                <Slider>
                    {articles.length !== 0 &&
                    articles.map((article, indx) => (
                        <div
                            key={indx}
                            className="min-w-[200px] px-20 py-14 border bg-slate-200 rounded-main flex-shrink-0"
                        >
                            {article}
                        </div>
                    ))}
                </Slider>
            </div>
            {/* End Articles */}

            <hr className="my-5 h-[2px] bg-light" />

            {/* Start Saved Articles */}
            <div className="relative">
                <h2 className="text-3xl font-mono mb-3">Saved Articles</h2>
                <Slider>
                    {savedArticles.length !== 0 &&
                    savedArticles.map((article, indx) => (
                        <div
                            key={indx}
                            className="min-w-[200px] px-20 py-14 border bg-slate-200 rounded-main flex-shrink-0"
                        >
                            {article}
                        </div>
                    ))}
                </Slider>
            </div>
            {/* End Saved Articles */}
        </>
    );
}

export default MainContent