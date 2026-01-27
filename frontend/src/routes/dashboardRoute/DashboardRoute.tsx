import API, { HangoutRow } from "../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
    Search,
    Plus,
    MapPin,
    X,
    Utensils,
    Trees,
    Sparkles,
    Clapperboard,
    ChevronDown,
} from "lucide-react";
import { cn } from "../../lib/utils";

const TAG_METADATA: Record<string, { color: string; icon: any }> = {
    food: { color: "bg-orange-500", icon: Utensils },
    outdoor: { color: "bg-green-500", icon: MapPin },
    activity: { color: "bg-blue-500", icon: Sparkles },
    entertainment: { color: "bg-purple-500", icon: Sparkles },
};

function HangoutCard({ hangoutItem }: { hangoutItem: HangoutRow }) {
    const metadata = TAG_METADATA[hangoutItem.tag.toLowerCase()] || {
        color: "bg-gray-500",
        icon: Sparkles,
    };
    const Icon = metadata.icon;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-2 relative w-full max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-gray-800">
                    {hangoutItem.name}
                </h3>
                <div
                    className={cn(
                        "flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-medium",
                        metadata.color,
                    )}
                >
                    <Icon size={12} />
                    <span>{hangoutItem.tag}</span>
                </div>
            </div>

            <div className="flex items-center gap-1 text-blue-500 text-sm">
                <MapPin size={14} />
                <a
                    href={hangoutItem.googleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-medium"
                >
                    {hangoutItem.location}
                </a>
            </div>

            <p className="text-gray-600 mt-2 text-base leading-relaxed">
                {hangoutItem.description}
            </p>

            <button className="absolute top-6 right-6 text-gray-300 hover:text-gray-500 transition-colors">
                <X size={20} />
            </button>
        </div>
    );
}

export default function DashboardRoute() {
    const navigate = useNavigate();
    const [hangouts, setHangouts] = useState<HangoutRow[]>([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    useEffect(() => {
        if (!API.isLoggedIn()) {
            navigate("/login");
            return;
        }

        const fetchHangouts = async () => {
            try {
                const data = await API.getAllRows();
                if (data) {
                    setHangouts(data);
                }
            } catch (error) {
                console.error("Failed to fetch hangouts:", error);
            }
        };

        fetchHangouts();
    }, [navigate]);

    return (
        <div className="dashboard w-full min-h-screen pb-20">
            {/* Header section */}
            <div className="max-w-4xl mx-auto px-4 pt-12 pb-8">
                <h1 className="text-center text-5xl font-extrabold text-gray-900 tracking-tight flex items-center justify-center gap-2">
                    Hangout Ideas <span className="text-4xl">🎉</span>
                </h1>
                <p className="text-center text-blue-600 text-lg mt-2 font-medium">
                    Never forget a great idea again
                </p>
            </div>

            {/* Controls section */}
            <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-3 mb-8">
                <div className="relative flex-1">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search ideas, places, activities..."
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        className="w-full md:w-48 px-4 py-3 bg-white border border-gray-200 rounded-xl flex items-center justify-between text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <span>{selectedCategory}</span>
                        <ChevronDown
                            size={18}
                            className={cn(
                                "text-gray-400 transition-transform",
                                isCategoryOpen && "rotate-180",
                            )}
                        />
                    </button>

                    {isCategoryOpen && (
                        <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-lg z-10 py-1 overflow-hidden">
                            {[
                                "All Categories",
                                "food",
                                "outdoor",
                                "activity",
                                "entertainment",
                            ].map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setIsCategoryOpen(false);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700 capitalize"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95">
                    <Plus size={20} />
                    <span>Add Idea</span>
                </button>
            </div>

            {/* List section */}
            <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4">
                {hangouts
                    .filter((h) => {
                        const matchesSearch =
                            h.name
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                            h.description
                                .toLowerCase()
                                .includes(search.toLowerCase());
                        const matchesCategory =
                            selectedCategory === "All Categories" ||
                            h.tag.toLowerCase() ===
                                selectedCategory.toLowerCase();
                        return matchesSearch && matchesCategory;
                    })
                    .map((hangout) => (
                        <HangoutCard key={hangout.id} hangoutItem={hangout} />
                    ))}
                {hangouts.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        No hangout ideas found. Start adding some!
                    </div>
                )}
            </div>
        </div>
    );
}
