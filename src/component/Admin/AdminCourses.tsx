import { Fragment, useEffect, useState } from "react";
import { api } from "../../lib/api";

type Course = {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  category: string;
  totalModules: number;
  isActive: boolean;
};

type CourseModule = {
  id: string;
  title: string;
  slug: string;
  order: number;
};

const EMPTY_COURSE = { title: "", description: "", category: "climate" };

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [form, setForm] = useState(EMPTY_COURSE);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleJson, setModuleJson] = useState(
    JSON.stringify(
      {
        description: "Short description",
        duration: "30 min",
        learningOutcomes: ["Outcome 1"],
        sections: [
          { id: "intro", title: "Introduction", type: "content", order: 0, paragraphs: ["..."] },
        ],
      },
      null,
      2,
    ),
  );
  const [submitting, setSubmitting] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Editing a course's title/description
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

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
      });
      setForm(EMPTY_COURSE);
      load();
    } finally {
      setSubmitting(false);
    }
  };

  const startEditCourse = (c: Course) => {
    setEditingCourseId(c.id);
    setEditForm({ title: c.title, description: c.description ?? "" });
  };

  const saveEditCourse = async (id: string) => {
    setSubmitting(true);
    try {
      await api.patch(`/courses/${id}`, {
        title: editForm.title || undefined,
        description: editForm.description,
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

  const addModule = async () => {
    if (!selectedCourseId || !moduleTitle) return;
    let content;
    try {
      content = JSON.parse(moduleJson);
      setJsonError(null);
    } catch {
      setJsonError("Content isn't valid JSON — fix it before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      await api.post(`/courses/${selectedCourseId}/modules`, { title: moduleTitle, content });
      setModuleTitle("");
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

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
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
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
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
          Raw JSON for now — for uploading a whole course's worth of chapters at once, use{" "}
          <code>gmbtebac/scripts/upload_course_content.py</code> instead of typing JSON here
          module by module.
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
        </div>

        <textarea
          value={moduleJson}
          onChange={(e) => setModuleJson(e.target.value)}
          rows={10}
          className="mt-2 w-full rounded border border-gray-300 px-2 py-1 font-mono text-xs"
        />
        {jsonError && <p className="mt-1 text-xs text-red-600">{jsonError}</p>}

        <button
          onClick={addModule}
          disabled={submitting || !selectedCourseId || !moduleTitle}
          className="mt-3 rounded bg-[#001F3F] px-3 py-1.5 text-sm text-white disabled:opacity-50"
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
                        </div>
                      ) : (
                        c.title
                      )}
                    </td>
                    <td className="py-2 pr-3">{c.category}</td>
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
                    <tr key={`${c.id}-chapters`} className="border-b border-gray-100 bg-gray-50">
                      <td colSpan={5} className="py-3 px-3">
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
