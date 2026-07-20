import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type Course = {
  id: string;
  title: string;
  slug: string;
  category: string;
  totalModules: number;
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

  const load = () => {
    api
      .get("/courses")
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
        ) : (
          <table className="mt-3 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 pr-3">Title</th>
                <th className="py-2 pr-3">Category</th>
                <th className="py-2">Chapters</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id} className="border-b border-gray-100">
                  <td className="py-2 pr-3">{c.title}</td>
                  <td className="py-2 pr-3">{c.category}</td>
                  <td className="py-2">{c.totalModules}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
