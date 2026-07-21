import { Fragment, useEffect, useState } from "react";
import { api } from "../../lib/api";

type Course = {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  category: string;
  tags: string[];
  isFeatured: boolean;
  totalModules: number;
  isActive: boolean;
};

type CourseModule = {
  id: string;
  title: string;
  slug: string;
  order: number;
};

const EMPTY_COURSE = { title: "", description: "", category: "climate", tagsText: "", isFeatured: false };

// One section in the chapter builder — plain strings in the form, turned
// into the ModuleContentDto shape the backend expects only on submit.
// This is what replaced the raw-JSON textarea: same underlying shape
// (see backgmb's ModuleContentDto/ModuleSectionDto), just as input boxes.
type SectionDraft = {
  id: string;
  title: string;
  type: "content" | "example" | "case-study" | "activity" | "summary" | "questions";
  paragraphsText: string;
  pointsText: string;
};

const EMPTY_SECTION = (): SectionDraft => ({
  id: `section-${Math.random().toString(36).slice(2, 8)}`,
  title: "",
  type: "content",
  paragraphsText: "",
  pointsText: "",
});

const splitLines = (text: string) =>
  text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [form, setForm] = useState(EMPTY_COURSE);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  // Chapter (module) builder
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [moduleDuration, setModuleDuration] = useState("");
  const [learningOutcomesText, setLearningOutcomesText] = useState("");
  const [sections, setSections] = useState<SectionDraft[]>([EMPTY_SECTION()]);

  const [submitting, setSubmitting] = useState(false);

  // Editing a course's title/description/category/tags/featured
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", tagsText: "", isFeatured: false });

  // Expanded course's chapter list, for editing/removing chapters
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
  const [chapters, setChapters] = useState<CourseModule[] | null>(null);
  const [chaptersLoading, setChaptersLoading] = useState(false);
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [chapterTitleDraft, setChapterTitleDraft] = useState("");

  const load = () => {
    api
      .get("/courses", { params: { includeInactive: "true" } })
      .then(({ data }) => setCourses(data?.data ?? data ?? []))
      .catch(() => setCourses([]));
  };

  useEffect(load, []);

  const createCourse = async () => {
    if (!form.title) return;
    setSubmitting(true);
    try {
      await api.post("/courses", {
        title: form.title,
        description: form.description || undefined,
        category: form.category,
        tags: splitLines(form.tagsText.replace(/,/g, "\n")),
        isFeatured: form.isFeatured,
      });
      setForm(EMPTY_COURSE);
      load();
    } finally {
      setSubmitting(false);
    }
  };

  const startEditCourse = (c: Course) => {
    setEditingCourseId(c.id);
    setEditForm({
      title: c.title,
      description: c.description ?? "",
      tagsText: c.tags.join(", "),
      isFeatured: c.isFeatured,
    });
  };

  const saveEditCourse = async (id: string) => {
    setSubmitting(true);
    try {
      await api.patch(`/courses/${id}`, {
        title: editForm.title || undefined,
        description: editForm.description,
        tags: splitLines(editForm.tagsText.replace(/,/g, "\n")),
        isFeatured: editForm.isFeatured,
      });
      setEditingCourseId(null);
      load();
    } finally {
      setSubmitting(false);
    }
  };

  // Soft-delete / restore — courses are never hard-deleted so progress
  // history and anything referencing them survives.
  const toggleCourseActive = async (c: Course) => {
    setSubmitting(true);
    try {
      await api.patch(`/courses/${c.id}`, { isActive: !c.isActive });
      load();
    } finally {
      setSubmitting(false);
    }
  };

  const loadChaptersRefresh = (courseId: string) => {
    api
      .get(`/courses/${courseId}/modules`)
      .then(({ data }) => setChapters(data?.data ?? data ?? []))
      .catch(() => setChapters([]));
  };

  const loadChapters = (courseId: string) => {
    if (expandedCourseId === courseId) {
      setExpandedCourseId(null);
      setChapters(null);
      return;
    }
    setExpandedCourseId(courseId);
    setChaptersLoading(true);
    api
      .get(`/courses/${courseId}/modules`)
      .then(({ data }) => setChapters(data?.data ?? data ?? []))
      .catch(() => setChapters([]))
      .finally(() => setChaptersLoading(false));
  };

  const startEditChapter = (m: CourseModule) => {
    setEditingChapterId(m.id);
    setChapterTitleDraft(m.title);
  };

  const saveChapterTitle = async (courseId: string, moduleId: string) => {
    if (!chapterTitleDraft) return;
    setSubmitting(true);
    try {
      await api.patch(`/courses/${courseId}/modules/${moduleId}`, { title: chapterTitleDraft });
      setEditingChapterId(null);
      loadChaptersRefresh(courseId);
    } finally {
      setSubmitting(false);
    }
  };

  const removeChapter = async (courseId: string, moduleId: string) => {
    if (!confirm("Remove this chapter? This can't be undone.")) return;
    setSubmitting(true);
    try {
      await api.delete(`/courses/${courseId}/modules/${moduleId}`);
      loadChaptersRefresh(courseId);
      load(); // totalModules changed
    } finally {
      setSubmitting(false);
    }
  };

  const addSectionDraft = () => setSections((s) => [...s, EMPTY_SECTION()]);
  const removeSectionDraft = (id: string) => setSections((s) => s.filter((sec) => sec.id !== id));
  const updateSectionDraft = (id: string, patch: Partial<SectionDraft>) =>
    setSections((s) => s.map((sec) => (sec.id === id ? { ...sec, ...patch } : sec)));

  const addModule = async () => {
    if (!selectedCourseId || !moduleTitle) return;
    setSubmitting(true);
    try {
      await api.post(`/courses/${selectedCourseId}/modules`, {
        title: moduleTitle,
        content: {
          description: moduleDescription || undefined,
          duration: moduleDuration || undefined,
          learningOutcomes: splitLines(learningOutcomesText),
          sections: sections.map((s, i) => ({
            id: s.id,
            title: s.title || `Section ${i + 1}`,
            type: s.type,
            paragraphs: splitLines(s.paragraphsText),
            points: splitLines(s.pointsText),
            order: i,
          })),
        },
      });
      setModuleTitle("");
      setModuleDescription("");
      setModuleDuration("");
      setLearningOutcomesText("");
      setSections([EMPTY_SECTION()]);
      load();
      if (expandedCourseId === selectedCourseId) loadChaptersRefresh(selectedCourseId);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Create a course</h2>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          >
            <option value="climate">Climate (Green Impact)</option>
            <option value="education">Education (Academy)</option>
          </select>
          <input
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
          />
          <input
            placeholder="Tags, comma-separated (e.g. Web Development, Beginner)"
            value={form.tagsText}
            onChange={(e) => setForm({ ...form, tagsText: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
          />
          <label className="flex items-center gap-2 text-xs text-gray-600 sm:col-span-2">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
            />
            Feature this course (surfaces it first on the Academy/Green Impact landing page)
          </label>
        </div>

        <button
          onClick={createCourse}
          disabled={submitting || !form.title}
          className="mt-3 rounded bg-[#001F3F] px-3 py-1.5 text-sm text-white disabled:opacity-50"
        >
          Create course
        </button>
      </div>

      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Add a chapter (module)</h2>
        <p className="mt-1 text-xs text-gray-400">
          For uploading a whole course's worth of chapters at once instead of one at a time, use{" "}
          <code>gmbtebac/scripts/upload_course_content.py</code>.
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          >
            <option value="">Select a course…</option>
            {(courses ?? []).map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.category})
              </option>
            ))}
          </select>
          <input
            placeholder="Chapter title"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            placeholder="Short description (optional)"
            value={moduleDescription}
            onChange={(e) => setModuleDescription(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            placeholder="Duration, e.g. 30 min (optional)"
            value={moduleDuration}
            onChange={(e) => setModuleDuration(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
        </div>

        <label className="mt-2 block text-xs text-gray-500">
          Learning outcomes — one per line
          <textarea
            value={learningOutcomesText}
            onChange={(e) => setLearningOutcomesText(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-sm"
            placeholder={"Understand X\nBe able to do Y"}
          />
        </label>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#001F3F]">Sections</h3>
            <button
              onClick={addSectionDraft}
              type="button"
              className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-600"
            >
              + Add section
            </button>
          </div>

          <div className="mt-2 space-y-3">
            {sections.map((s, i) => (
              <div key={s.id} className="rounded border border-gray-200 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">Section {i + 1}</span>
                  {sections.length > 1 && (
                    <button
                      onClick={() => removeSectionDraft(s.id)}
                      type="button"
                      className="text-xs text-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <input
                    placeholder="Section title"
                    value={s.title}
                    onChange={(e) => updateSectionDraft(s.id, { title: e.target.value })}
                    className="rounded border border-gray-300 px-2 py-1 text-sm"
                  />
                  <select
                    value={s.type}
                    onChange={(e) => updateSectionDraft(s.id, { type: e.target.value as SectionDraft["type"] })}
                    className="rounded border border-gray-300 px-2 py-1 text-sm"
                  >
                    <option value="content">Content</option>
                    <option value="example">Example</option>
                    <option value="case-study">Case study</option>
                    <option value="activity">Activity</option>
                    <option value="summary">Summary</option>
                    <option value="questions">Questions</option>
                  </select>
                </div>
                <label className="mt-2 block text-xs text-gray-500">
                  Paragraphs — one per line
                  <textarea
                    value={s.paragraphsText}
                    onChange={(e) => updateSectionDraft(s.id, { paragraphsText: e.target.value })}
                    rows={3}
                    className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-sm"
                  />
                </label>
                <label className="mt-2 block text-xs text-gray-500">
                  Bullet points — one per line (optional, used for activity/questions/summary)
                  <textarea
                    value={s.pointsText}
                    onChange={(e) => updateSectionDraft(s.id, { pointsText: e.target.value })}
                    rows={2}
                    className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-sm"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={addModule}
          disabled={submitting || !selectedCourseId || !moduleTitle}
          className="mt-4 rounded bg-[#001F3F] px-3 py-1.5 text-sm text-white disabled:opacity-50"
        >
          Add chapter
        </button>
      </div>

      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Courses</h2>
        {courses === null ? (
          <p className="mt-3 text-sm text-gray-500">Loading…</p>
        ) : courses.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">No courses created yet.</p>
        ) : (
          <table className="mt-3 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 pr-3">Title</th>
                <th className="py-2 pr-3">Category</th>
                <th className="py-2 pr-3">Tags</th>
                <th className="py-2 pr-3">Chapters</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <Fragment key={c.id}>
                  <tr className={`border-b border-gray-100 ${!c.isActive ? "opacity-50" : ""}`}>
                    <td className="py-2 pr-3">
                      {editingCourseId === c.id ? (
                        <div className="flex flex-col gap-1">
                          <input
                            value={editForm.title}
                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                            className="rounded border border-gray-300 px-2 py-1 text-sm"
                          />
                          <input
                            value={editForm.description}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            placeholder="Description"
                            className="rounded border border-gray-300 px-2 py-1 text-sm"
                          />
                          <input
                            value={editForm.tagsText}
                            onChange={(e) => setEditForm({ ...editForm, tagsText: e.target.value })}
                            placeholder="Tags, comma-separated"
                            className="rounded border border-gray-300 px-2 py-1 text-sm"
                          />
                          <label className="flex items-center gap-2 text-xs text-gray-600">
                            <input
                              type="checkbox"
                              checked={editForm.isFeatured}
                              onChange={(e) => setEditForm({ ...editForm, isFeatured: e.target.checked })}
                            />
                            Featured
                          </label>
                        </div>
                      ) : (
                        <>
                          {c.title} {c.isFeatured && <span className="text-xs text-[#D7263D]">★</span>}
                        </>
                      )}
                    </td>
                    <td className="py-2 pr-3">{c.category}</td>
                    <td className="py-2 pr-3 text-xs text-gray-500">{c.tags?.join(", ") || "—"}</td>
                    <td className="py-2 pr-3">{c.totalModules}</td>
                    <td className="py-2 pr-3">{c.isActive ? "Active" : "Removed"}</td>
                    <td className="py-2">
                      <div className="flex flex-wrap gap-2">
                        {editingCourseId === c.id ? (
                          <>
                            <button
                              onClick={() => saveEditCourse(c.id)}
                              disabled={submitting}
                              className="rounded bg-[#001F3F] px-2 py-1 text-xs text-white disabled:opacity-50"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingCourseId(null)}
                              className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-600"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => startEditCourse(c)}
                            className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-600"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => toggleCourseActive(c)}
                          disabled={submitting}
                          className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-600 disabled:opacity-50"
                        >
                          {c.isActive ? "Remove" : "Restore"}
                        </button>
                        <button
                          onClick={() => loadChapters(c.id)}
                          className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-600"
                        >
                          {expandedCourseId === c.id ? "Hide chapters" : "Manage chapters"}
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedCourseId === c.id && (
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td colSpan={6} className="py-3 px-3">
                        {chaptersLoading ? (
                          <p className="text-xs text-gray-500">Loading chapters…</p>
                        ) : !chapters || chapters.length === 0 ? (
                          <p className="text-xs text-gray-500">No chapters uploaded for this course yet.</p>
                        ) : (
                          <ul className="space-y-1">
                            {chapters.map((m) => (
                              <li key={m.id} className="flex items-center justify-between gap-2 text-xs">
                                {editingChapterId === m.id ? (
                                  <>
                                    <input
                                      value={chapterTitleDraft}
                                      onChange={(e) => setChapterTitleDraft(e.target.value)}
                                      className="flex-1 rounded border border-gray-300 px-2 py-1"
                                    />
                                    <div className="flex gap-1">
                                      <button
                                        onClick={() => saveChapterTitle(c.id, m.id)}
                                        className="rounded bg-[#001F3F] px-2 py-1 text-white"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={() => setEditingChapterId(null)}
                                        className="rounded border border-gray-300 px-2 py-1 text-gray-600"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-gray-700">{m.title}</span>
                                    <div className="flex gap-1">
                                      <button
                                        onClick={() => startEditChapter(m)}
                                        className="rounded border border-gray-300 px-2 py-1 text-gray-600"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => removeChapter(c.id, m.id)}
                                        className="rounded border border-red-300 px-2 py-1 text-red-600"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
