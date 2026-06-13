import { Star } from "lucide-react";
import { REVIEWS, type Review } from "@/lib/data/reviews";

const MID = Math.ceil(REVIEWS.length / 2);
const ROW_1 = REVIEWS.slice(0, MID);
const ROW_2 = REVIEWS.slice(MID);

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex w-72 shrink-0 flex-col gap-2 rounded-xl border border-border bg-white p-4 shadow-card">
      <div className="flex items-center gap-1 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
        <span className="ml-1 text-xs font-medium text-gray-400">별다섯개!</span>
      </div>
      <p className="text-sm leading-relaxed text-gray-700">{review.comment}</p>
      <p className="text-xs font-medium text-gray-400">- OO {review.industry} 대표</p>
    </div>
  );
}

function MarqueeRow({ reviews, reverse }: { reviews: Review[]; reverse?: boolean }) {
  const items = [...reviews, ...reviews];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {items.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </div>
  );
}

export default function ReviewMarquee() {
  return (
    <div className="space-y-4">
      <MarqueeRow reviews={ROW_1} />
      <MarqueeRow reviews={ROW_2} reverse />
    </div>
  );
}
