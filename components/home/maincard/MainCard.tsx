import Card from "./Card";
export const staticData = [
  {
    title: "Mental Note Vol. 24",
    text: "Merry Christmas and Happy Holidays...",
    author: "Ryan Fan",
    date: "Oct 1",
    views: 479,
    comments: 8,
    imageUrl: "/assets/images/150x150.jpeg",
    id: 0,
  },
  {
    title: "Your Brain On Coronavirus",
    text: "A guide to the curious and troubling impact of the pandemic...",
    author: "Simon Spichak",
    date: "Sep 23",
    views: 320,
    comments: 5,
    imageUrl: "/assets/images/150x150.jpeg", // Replace with real image URL
    id: 1,
  },
];

export default function Home() {
  return (
    <div className="p-4">
      {staticData.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          text={item.text}
          author={item.author}
          date={item.date}
          views={item.views}
          comments={item.comments}
          imageUrl={item.imageUrl}
          id={item.id}
        />
      ))}
    </div>
  );
}
