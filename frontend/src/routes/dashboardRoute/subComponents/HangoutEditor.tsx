import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import API, { HangoutRow } from "../../../api";
import { toast } from "sonner";

export type HangoutFormFields = Omit<
  HangoutRow,
  "id" | "dateCreated" | "upvotes"
>;

const EMOJI_OPTIONS = ["🎉", "🍕", "🌿", "🎭", "🍹", "🛶", "🧭", "🍔", "🏕️"];
const TAG_OPTIONS = ["Other", "food", "outdoor", "activity", "entertainment"];

interface HangoutEditorProps {
  open: boolean;
  mode: "add" | "edit";
  id?: string;
  initialValues: HangoutFormFields;
  onClose: () => void;
  onSubmit: (row: HangoutRow) => void;
  onDelete?: (id: string) => void;
}

export default function HangoutEditor({
  open,
  mode,
  id,
  initialValues,
  onClose,
  onSubmit,
  onDelete,
}: HangoutEditorProps) {
  const [formValues, setFormValues] = useState(initialValues);
  const [touched, setTouched] = useState({ name: false, description: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteCount, setDeleteCount] = useState(4);

  useEffect(() => {
    if (open) {
      setFormValues(initialValues);
      setTouched({ name: false, description: false });
      setIsSubmitting(false);
      setIsDeleting(false);
      setDeleteCount(4);
    }
  }, [initialValues, open]);

  const isNameValid = formValues.name.trim().length > 0;
  const isDescriptionValid = formValues.description.trim().length > 0;
  const isValid = isNameValid && isDescriptionValid;

  const handleChange = <K extends keyof HangoutFormFields>(
    field: K,
    value: HangoutFormFields[K],
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const toggleBoolean = (field: "tried" | "offline") => {
    setFormValues((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleDeleteClick = async () => {
    if (deleteCount > 1) {
      setDeleteCount((prev) => prev - 1);
      return;
    }

    if (!id || !onDelete || isDeleting) return;

    setIsDeleting(true);
    try {
      const success = await API.deleteRow(id);
      if (success) {
        toast.success("Hangout idea deleted!", { position: "top-center" });
        onDelete(id);
        onClose();
      } else {
        toast.error("Failed to delete hangout idea. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting hangout:", error);
      toast.error("An unexpected error occurred.", { position: "top-center" });
    } finally {
      setIsDeleting(false);
      setDeleteCount(4);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ name: true, description: true });

    if (!isValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      let result: HangoutRow | null = null;
      if (mode === "add") {
        result = await API.createRow(formValues);
      } else if (mode === "edit" && id) {
        result = await API.updateRow(id, formValues);
      }

      if (result) {
        toast.success(
          mode === "add" ? "Hangout idea added!" : "Hangout idea updated!",
          { position: "top-center" },
        );
        onSubmit(result);
        onClose();
      } else {
        toast.error("Failed to save hangout idea. Please try again.");
      }
    } catch (error) {
      console.error("Error saving hangout:", error);
      toast.error("An unexpected error occurred.", { position: "top-center" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        aria-hidden
        className={`fixed inset-0 bg-slate-950/70 transition-opacity duration-300 z-40 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={isSubmitting ? undefined : onClose}
      />

      <div
        className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-2xl bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-6 space-y-4 transform transition-all duration-300 ease-out sm:mx-4 ${
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {mode === "add" ? "Add a new hangout" : "Update this hangout"}
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                {mode === "add" ? "Add New Hangout Idea" : "Edit Hangout Idea"}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-600"
              htmlFor="hangout-name"
            >
              Title *
            </label>
            <input
              id="hangout-name"
              type="text"
              disabled={isSubmitting}
              className={`w-full rounded-2xl px-4 py-3 focus:outline-none transition ${
                touched.name && !isNameValid
                  ? "border-red-500 focus:border-red-500 focus:ring-0"
                  : "border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              } bg-white disabled:opacity-60`}
              placeholder="Try that new pizza place"
              value={formValues.name}
              onChange={(event) => handleChange("name", event.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
            />
            {touched.name && !isNameValid && (
              <p className="text-xs text-red-500">Title is required</p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-600"
                htmlFor="hangout-tag"
              >
                Category
              </label>
              <select
                id="hangout-tag"
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition disabled:opacity-60"
                value={formValues.tag}
                onChange={(event) => handleChange("tag", event.target.value)}
              >
                {TAG_OPTIONS.map((tagOption) => (
                  <option key={tagOption} value={tagOption}>
                    {tagOption.charAt(0).toUpperCase() + tagOption.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-600"
                htmlFor="hangout-location"
              >
                Location (optional)
              </label>
              <input
                id="hangout-location"
                type="text"
                disabled={isSubmitting}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition disabled:opacity-60"
                placeholder="Downtown, 123 Main St"
                value={formValues.location}
                onChange={(event) =>
                  handleChange("location", event.target.value)
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-600"
              htmlFor="hangout-google-link"
            >
              Google Maps link (optional)
            </label>
            <input
              id="hangout-google-link"
              type="text"
              disabled={isSubmitting}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition disabled:opacity-60"
              placeholder="https://maps.app.goo.gl/..."
              value={formValues.googleLink}
              onChange={(event) =>
                handleChange("googleLink", event.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-600"
              htmlFor="hangout-description"
            >
              Description *
            </label>
            <textarea
              id="hangout-description"
              rows={4}
              disabled={isSubmitting}
              className={`w-full rounded-2xl px-4 py-3 focus:outline-none transition ${
                touched.description && !isDescriptionValid
                  ? "border-red-500 focus:border-red-500 focus:ring-0"
                  : "border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              } bg-white disabled:opacity-60`}
              placeholder="Add any notes or details..."
              value={formValues.description}
              onChange={(event) =>
                handleChange("description", event.target.value)
              }
              onBlur={() =>
                setTouched((prev) => ({ ...prev, description: true }))
              }
            />
            {touched.description && !isDescriptionValid && (
              <p className="text-xs text-red-500">Description is required</p>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">Emoji</p>
            <div className="grid grid-cols-5 gap-2">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleChange("emoji", emoji)}
                  className={`rounded-2xl border px-0.5 py-2 text-2xl transition ${
                    formValues.emoji === emoji
                      ? "border-sky-500 bg-sky-50"
                      : "border-slate-200 bg-white"
                  } disabled:opacity-60`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-700">
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 cursor-pointer">
              <input
                type="checkbox"
                disabled={isSubmitting}
                checked={formValues.tried}
                onChange={() => toggleBoolean("tried")}
                className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 disabled:opacity-60"
              />
              Tried it before
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 cursor-pointer">
              <input
                type="checkbox"
                disabled={isSubmitting}
                checked={formValues.offline}
                onChange={() => toggleBoolean("offline")}
                className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 disabled:opacity-60"
              />
              Offline activity
            </label>
          </div>

          {mode === "edit" && (
            <button
              type="button"
              disabled={isSubmitting || isDeleting}
              onClick={handleDeleteClick}
              className="w-full rounded-2xl px-4 py-3 font-medium transition bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 disabled:opacity-50"
            >
              {isDeleting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={18} className="animate-spin" /> Deleting...
                </span>
              ) : deleteCount === 4 ? (
                "Delete Idea"
              ) : (
                `Click "${deleteCount}" more times to confirm`
              )}
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isDeleting}
            className="w-full rounded-2xl px-4 py-3 font-semibold shadow-lg transition bg-gradient-to-r from-sky-500 to-indigo-500 text-white disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {(isSubmitting && !isDeleting) && (
              <Loader2 size={18} className="animate-spin" />
            )}
            {mode === "add" ? "Add Idea" : "Save Changes"}
          </button>
        </form>
      </div>
    </>
  );
}
