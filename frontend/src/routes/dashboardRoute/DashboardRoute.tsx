import API, { HangoutRow } from "../../api";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Plus,
  MapPin,
  Utensils,
  Sparkles,
  ChevronDown,
  Globe,
  CheckCircle2,
  ThumbsUp,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import HangoutEditor, {
  HangoutFormFields,
} from "./subComponents/HangoutEditor";
import { UpvoteHistory } from "../../UpvoteCache";

const PAGE_SIZE_OPTIONS = [6, 12, 18];
const DEFAULT_ITEMS_PER_PAGE = PAGE_SIZE_OPTIONS[0];

const TAG_METADATA: Record<string, { color: string; icon: any }> = {
  food: { color: "bg-orange-500", icon: Utensils },
  outdoor: { color: "bg-green-500", icon: MapPin },
  activity: { color: "bg-blue-500", icon: Sparkles },
  entertainment: { color: "bg-purple-500", icon: Sparkles },
};

function HangoutCard({
  hangoutItem,
  onEdit,
  onUpvote,
  isUpvoting,
}: {
  hangoutItem: HangoutRow;
  onEdit: (item: HangoutRow) => void;
  onUpvote: (id: string) => void;
  isUpvoting: boolean;
}) {
  const isUpvoted = UpvoteHistory.isIDInHistory(hangoutItem.id);
  const metadata = TAG_METADATA[hangoutItem.tag.toLowerCase()] || {
    color: "bg-gray-500",
    icon: Sparkles,
  };
  const Icon = metadata.icon;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-row gap-6 relative w-full max-w-4xl mx-auto overflow-hidden">
      <div className="flex flex-col items-center justify-center border-r border-gray-100 pr-6 md:min-w-[60px] w-[10px]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className={cn(
                "transition-colors",
                isUpvoted
                  ? "text-blue-600 cursor-default"
                  : "text-gray-400 hover:text-blue-600 hover:bg-blue-50",
                isUpvoting && "animate-pulse opacity-70",
              )}
              onClick={() => !isUpvoted && !isUpvoting && onUpvote(hangoutItem.id)}
              disabled={isUpvoted || isUpvoting}
            >
              <ThumbsUp size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isUpvoted ? "already upvoted" : "upvote this idea"}
          </TooltipContent>
        </Tooltip>
        <span className="text-sm font-semibold text-gray-500 mt-1">
          {hangoutItem.upvotes || 0}
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-2 ">
        <div className="flex flex-col md:flex-row items-start gap-3">
          <h3 className="text-xl font-bold text-gray-800 wrap-break-word w-full">
            {hangoutItem.name}
          </h3>
          <div className="flex flex-row w-auto md:w-full gap-2 flex-wrap">
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

        <div className="w-full md:flex-row flex justify-between flex-wrap items-center">
          <p className="text-gray-600 text-base leading-relaxed">
            {hangoutItem.description}
          </p>
          <Button
            variant="ghost"
            size="sm"
            // style={{ margin: "0px !important" }}
            className=" text-blue-600 font-semibold hover:text-blue-500 hover:bg-blue-50 bg-blue-50 transition-colors w-fit mt-3 md:mt-0"
            onClick={() => onEdit(hangoutItem)}
          >
            Edit
          </Button>
        </div>
      </div>
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
  const [sortBy, setSortBy] = useState("Newest");
  const [randomSeed, setRandomSeed] = useState(0);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [upvotingIds, setUpvotingIds] = useState<Set<string>>(new Set());

  const filteredHangouts = useMemo(() => {
    const filtered = hangouts.filter((h) => {
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
        matchesSearch && matchesCategory && matchesStatus && matchesExperience
      );
    });

    const sorted = [...filtered];

    if (sortBy === "Random") {
      // Fisher-Yates shuffle
      for (let i = sorted.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
      }
      return sorted;
    }

    return sorted.sort((a, b) => {
      if (sortBy === "Most Upvoted") {
        return (b.upvotes || 0) - (a.upvotes || 0);
      }
      // Default: Newest (dateCreated)
      const dateA = a.dateCreated ? new Date(a.dateCreated).getTime() : 0;
      const dateB = b.dateCreated ? new Date(b.dateCreated).getTime() : 0;
      return dateB - dateA;
    });
  }, [
    hangouts,
    search,
    selectedCategory,
    statusFilter,
    experienceFilter,
    sortBy,
    randomSeed,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredHangouts.length / itemsPerPage),
  );
  const paginatedHangouts = filteredHangouts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const pageStart =
    filteredHangouts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const pageEnd = Math.min(filteredHangouts.length, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    selectedCategory,
    statusFilter,
    experienceFilter,
    itemsPerPage,
    sortBy,
    randomSeed,
  ]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

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
    if (editorMode === "add") {
      setCurrentPage(1);
    }
  };

  const handleEditorDelete = (id: string) => {
    setHangouts((prev) => prev.filter((h) => h.id !== id));
  };

  const handleEditorClose = () => {
    setIsEditorOpen(false);
  };

  const handleUpvote = async (id: string) => {
    if (UpvoteHistory.isIDInHistory(id) || upvotingIds.has(id)) return;

    const hangout = hangouts.find((h) => h.id === id);
    if (!hangout) return;

    setUpvotingIds((prev) => new Set(prev).add(id));

    const newUpvotes = (hangout.upvotes || 0) + 1;

    // Update local state immediately for better UX
    setHangouts((prev) =>
      prev.map((h) => (h.id === id ? { ...h, upvotes: newUpvotes } : h)),
    );

    try {
      const updatedRow = await API.updateRow(id, { upvotes: newUpvotes });
      if (updatedRow) {
        UpvoteHistory.saveId(id);
        // Ensure local state is in sync with server response
        setHangouts((prev) => prev.map((h) => (h.id === id ? updatedRow : h)));
      } else {
        // Rollback on failure
        setHangouts((prev) =>
          prev.map((h) =>
            h.id === id ? { ...h, upvotes: hangout.upvotes } : h,
          ),
        );
      }
    } catch (error) {
      console.error("Failed to upvote:", error);
      // Rollback on failure
      setHangouts((prev) =>
        prev.map((h) => (h.id === id ? { ...h, upvotes: hangout.upvotes } : h)),
      );
    } finally {
      setUpvotingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
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
      <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:flex md:flex-row gap-3 mb-8 flex-wrap">
        <div className="col-span-2 w-full">
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

        <div className="relative grow">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-full">
              <Button
                variant="outline"
                className="w-full  h-12 bg-white border-gray-200 rounded-xl flex items-center justify-between text-gray-700 hover:bg-gray-50 transition-colors shadow-sm font-normal"
              >
                <span>{selectedCategory}</span>
                <ChevronDown size={18} className="text-gray-400 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-full bg-white border-gray-100 rounded-xl shadow-lg"
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

        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-44 h-12 bg-white border-gray-200 rounded-xl flex items-center justify-between text-gray-700 hover:bg-gray-50 transition-colors shadow-sm font-normal"
              >
                <div className="flex items-center gap-2 truncate">
                  <ArrowUpDown size={14} className="text-gray-400" />
                  <span>{sortBy}</span>
                </div>
                <ChevronDown
                  size={18}
                  className="text-gray-400 opacity-50 flex-shrink-0"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-44 bg-white border-gray-100 rounded-xl shadow-lg"
            >
              {["Newest", "Most Upvoted", "Random"].map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    if (option === "Random") {
                      setRandomSeed(Math.random());
                    }
                  }}
                  className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          onClick={openAddEditor}
          className="col-span-2 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white h-12 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
        >
          <Plus size={20} />
          <span>Add Idea</span>
        </Button>
      </div>

      <div className="separator w-[calc(100%-8rem)] bg-zinc-300 h-[2px] mx-[4rem] mb-8 rounded-[0.5px]"></div>

      {/* List section */}
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-4">
        {paginatedHangouts.map((hangout) => (
          <HangoutCard
            key={hangout.id}
            hangoutItem={hangout}
            onEdit={openEditEditor}
            onUpvote={handleUpvote}
            isUpvoting={upvotingIds.has(hangout.id)}
          />
        ))}
        {filteredHangouts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No hangout ideas found. Start adding some!
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-500">
          Showing {pageStart}-{pageEnd} of {filteredHangouts.length} ideas
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="whitespace-nowrap">Per page</span>
            <select
              className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 shadow-sm outline-none focus:border-blue-500"
              value={itemsPerPage}
              onChange={(event) => setItemsPerPage(Number(event.target.value))}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              <ArrowLeft size={14} />
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              disabled={currentPage >= totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
            >
              Next
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </div>

      <HangoutEditor
        open={isEditorOpen}
        mode={editorMode}
        id={editingId}
        initialValues={editorValues}
        onClose={handleEditorClose}
        onSubmit={handleEditorSubmit}
        onDelete={handleEditorDelete}
      />
    </div>
  );
}
