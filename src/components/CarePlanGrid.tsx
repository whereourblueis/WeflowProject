import { Heart, Zap, Rocket, PiggyBank, Headset, LifeBuoy } from "lucide-react";

const ITEMS = [
  { icon: Heart, title: "WEFLOW 케어플랜" },
  { icon: Zap, title: "제작+운영+광고+관리 원터치" },
  { icon: Rocket, title: "빠른 제작", desc: "3~7일 로켓배송" },
  { icon: PiggyBank, title: "합리적인 가성비" },
  { icon: Headset, title: "24시간 상담대기", desc: "빠른 상담 및 피드백" },
  { icon: LifeBuoy, title: "운영 · 광고 지원", desc: "사후관리서비스" },
];

export default function CarePlanGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {ITEMS.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="flex flex-col items-center gap-2 rounded-xl border border-border bg-white px-3 py-6 text-center shadow-card"
        >
          <Icon className="h-6 w-6 text-accent-600" />
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {desc && <p className="text-xs text-gray-500">{desc}</p>}
        </div>
      ))}
    </div>
  );
}
