import API, { HangoutRow } from "../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Plus,
  MapPin,
  Utensils,
  Trees,
  Sparkles,
  Clapperboard,
  ChevronDown,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import HangoutEditor, {
  HangoutFormFields,
} from "./subComponents/HangoutEditor";

const TAG_METADATA: Record<string, { color: string; icon: any }> = {
  food: { color: "bg-orange-500", icon: Utensils },
  outdoor: { color: "bg-green-500", icon: MapPin },
  activity: { color: "bg-blue-500", icon: Sparkles },
  entertainment: { color: "bg-purple-500", icon: Sparkles },
};

function HangoutCard({
  hangoutItem,
  onEdit,
}: {
  hangoutItem: HangoutRow;
  onEdit: (item: HangoutRow) => void;
}) {
  const metadata = TAG_METADATA[hangoutItem.tag.toLowerCase()] || {
    color: "bg-gray-500",
    icon: Sparkles,
  };
  const Icon = metadata.icon;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-2 relative w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <h3 className="text-xl font-bold text-gray-800">{hangoutItem.name}</h3>
        <div
          className={cn(
            "flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-medium",
            metadata.color,
          )}
        >
          <Icon size={12} />
          <span>{hangoutItem.tag}</span>
        </div>
        {hangoutItem.tried && (
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium border border-green-200">
            <CheckCircle2 size={12} />
            <span>Tried</span>
          </div>
        )}
        {hangoutItem.offline ? (
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium border border-amber-200">
            <MapPin size={12} />
            <span>Offline</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium border border-blue-200">
            <Globe size={12} />
            <span>Online</span>
          </div>
        )}
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

      <Button
        variant="ghost"
        size="sm"
        className="absolute top-6 right-6 text-blue-600 font-semibold hover:text-blue-500 hover:bg-blue-50 transition-colors"
        onClick={() => onEdit(hangoutItem)}
      >
        Edit
      </Button>
    </div>
  );
}

export default function DashboardRoute() {
  const navigate = useNavigate();
  const [hangouts, setHangouts] = useState<HangoutRow[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [experienceFilter, setExperienceFilter] = useState("All History");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [editorValues, setEditorValues] = useState<HangoutFormFields>({
    name: "",
    description: "",
    location: "",
    googleLink: "",
    emoji: "🎉",
    tag: "Other",
    tried: false,
    offline: false,
  });

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

  const openAddEditor = () => {
    setEditorMode("add");
    setEditingId(undefined);
    setEditorValues({
      name: "",
      description: "",
      location: "",
      googleLink: "",
      emoji: "🎉",
      tag: "Other",
      tried: false,
      offline: false,
    });
    setIsEditorOpen(true);
  };

  const openEditEditor = (item: HangoutRow) => {
    setEditorMode("edit");
    setEditingId(item.id);
    setEditorValues({
      name: item.name,
      description: item.description,
      location: item.location,
      googleLink: item.googleLink,
      emoji: item.emoji,
      tag: item.tag,
      tried: item.tried,
      offline: item.offline,
    });
    setIsEditorOpen(true);
  };

  const handleEditorSubmit = (row: HangoutRow) => {
    setHangouts((prev) => {
      const index = prev.findIndex((h) => h.id === row.id);
      if (index !== -1) {
        // Update existing
        const updated = [...prev];
        updated[index] = row;
        return updated;
      } else {
        // Add new (typically to the beginning)
        return [row, ...prev];
      }
    });
  };

  const handleEditorClose = () => {
    setIsEditorOpen(false);
  };

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
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-3 mb-8 flex-wrap">
        <div className="w-full">
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
        </div>

        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-48 h-12 bg-white border-gray-200 rounded-xl flex items-center justify-between text-gray-700 hover:bg-gray-50 transition-colors shadow-sm font-normal"
              >
                <span>{selectedCategory}</span>
                <ChevronDown size={18} className="text-gray-400 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-white border-gray-100 rounded-xl shadow-lg"
            >
              {[
                "All Categories",
                "food",
                "outdoor",
                "activity",
                "entertainment",
              ].map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-40 h-12 bg-white border-gray-200 rounded-xl flex items-center justify-between text-gray-700 hover:bg-gray-50 transition-colors shadow-sm font-normal"
              >
                <span className="truncate">{statusFilter}</span>
                <ChevronDown
                  size={18}
                  className="text-gray-400 opacity-50 flex-shrink-0"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 bg-white border-gray-100 rounded-xl shadow-lg"
            >
              {["All Status", "Online Only", "Offline Only"].map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-40 h-12 bg-white border-gray-200 rounded-xl flex items-center justify-between text-gray-700 hover:bg-gray-50 transition-colors shadow-sm font-normal"
              >
                <span className="truncate">{experienceFilter}</span>
                <ChevronDown
                  size={18}
                  className="text-gray-400 opacity-50 flex-shrink-0"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 bg-white border-gray-100 rounded-xl shadow-lg"
            >
              {["All History", "Tried Only", "Never Tried"].map((exp) => (
                <DropdownMenuItem
                  key={exp}
                  onClick={() => setExperienceFilter(exp)}
                  className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                >
                  {exp}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          onClick={openAddEditor}
          className="  w-full bg-blue-600 hover:bg-blue-700 text-white h-12 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
        >
          <Plus size={20} />
          <span>Add Idea</span>
        </Button>
      </div>

      {/* List section */}
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4">
        {hangouts
          .filter((h) => {
            const matchesSearch =
              h.name.toLowerCase().includes(search.toLowerCase()) ||
              h.description.toLowerCase().includes(search.toLowerCase());
            const matchesCategory =
              selectedCategory === "All Categories" ||
              h.tag.toLowerCase() === selectedCategory.toLowerCase();
            const matchesStatus =
              statusFilter === "All Status" ||
              (statusFilter === "Online Only" && !h.offline) ||
              (statusFilter === "Offline Only" && h.offline);
            const matchesExperience =
              experienceFilter === "All History" ||
              (experienceFilter === "Tried Only" && h.tried) ||
              (experienceFilter === "Never Tried" && !h.tried);

            return (
              matchesSearch &&
              matchesCategory &&
              matchesStatus &&
              matchesExperience
            );
          })
          .map((hangout) => (
            <HangoutCard
              key={hangout.id}
              hangoutItem={hangout}
              onEdit={openEditEditor}
            />
          ))}
        {hangouts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No hangout ideas found. Start adding some!
          </div>
        )}
      </div>

      <HangoutEditor
        open={isEditorOpen}
        mode={editorMode}
        id={editingId}
        initialValues={editorValues}
        onClose={handleEditorClose}
        onSubmit={handleEditorSubmit}
      />
    </div>
  );
}
