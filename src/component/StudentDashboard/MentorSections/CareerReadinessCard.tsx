import { useEffect, useState } from "react";
import { Target, Sparkles, Check, Circle } from "lucide-react";
import { Card, CardContent } from "./mentorsDashboard";
import CardSkeleton from "../shared/CardSkeleton";
import {
  fetchActiveCareerPaths,
  fetchMyReadiness,
  setMyCareerGoal,
  type CareerPath,
  type CareerReadiness,
} from "../../../lib/mentorsApi";

export default function CareerReadinessCard() {
  const [readiness, setReadiness] = useState<CareerReadiness | null>(null);
  const [paths, setPaths] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [choosing, setChoosing] = useState(false);
  const [selectedPathId, setSelectedPathId] = useState<string>("");
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    fetchMyReadiness()
      .then(setReadiness)
      .catch(() => setReadiness({ hasGoal: false }))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openPicker = () => {
    setChoosing(true);
    if (paths.length === 0) {
      fetchActiveCareerPaths()
        .then(setPaths)
        .catch(() => setPaths([]));
    }
  };

  const handleSave = async () => {
    if (!selectedPathId || saving) return;
    setSaving(true);
    try {
      await setMyCareerGoal(selectedPathId);
      setChoosing(false);
      load();
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <CardSkeleton />;

  // No goal set yet, or actively choosing/changing one
  if (!readiness?.hasGoal || choosing) {
    return (
      <Card className="rounded-xl sm:rounded-2xl border-[#0000001A] shadow-md">
        <CardContent className="p-4 sm:p-6">
          <div className="mb-3 flex items-center gap-2">
            <Target className="h-5 w-5 text-[#001F3F]" />
            <h3 className="text-base font-bold text-[#001F3F] sm:text-lg">
              {readiness?.hasGoal ? "Change your career path" : "Set a career path"}
            </h3>
          </div>
          <p className="mb-3 text-sm text-gray-500">
            Pick where you're headed and we'll track your readiness against the skills that path actually needs.
          </p>

          {paths.length === 0 ? (
            <button
              onClick={openPicker}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Browse career paths
            </button>
          ) : (
            <div className="space-y-2">
              <select
                value={selectedPathId}
                onChange={(e) => setSelectedPathId(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a path…</option>
                {paths.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
              {selectedPathId && (
                <p className="text-xs text-gray-400">
                  Requires: {paths.find((p) => p.id === selectedPathId)?.requiredSkills.map((s) => s.skillName).join(", ")}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={!selectedPathId || saving}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? "Saving…" : "Set this path"}
                </button>
                {readiness?.hasGoal && (
                  <button
                    onClick={() => setChoosing(false)}
                    className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Has a goal — show readiness
  return (
    <Card className="rounded-xl sm:rounded-2xl border-[#0000001A] shadow-md">
      <CardContent className="p-4 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-[#001F3F]" />
            <h3 className="text-base font-bold text-[#001F3F] sm:text-lg">{readiness.careerPath.title}</h3>
          </div>
          <button onClick={openPicker} className="text-xs font-medium text-blue-600 hover:text-blue-700">
            Change path
          </button>
        </div>

        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
            <span>Readiness</span>
            <span className="font-semibold text-[#001F3F]">{readiness.readinessPercent}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${readiness.readinessPercent}%` }}
            />
          </div>
        </div>

        {readiness.aiSummary && (
          <div className="mb-4 rounded-xl bg-blue-50 p-3">
            <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-blue-700">
              <Sparkles className="h-3.5 w-3.5" /> Where you stand
            </p>
            <p className="text-xs text-gray-700">{readiness.aiSummary.summary}</p>
            {readiness.aiSummary.priorities.length > 0 && (
              <p className="mt-1.5 text-xs text-gray-600">
                <span className="font-medium">Focus next:</span> {readiness.aiSummary.priorities.join(", ")}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {readiness.matched.map((s) => (
            <div key={s.skillName} className="flex items-center gap-1.5 text-xs text-gray-700">
              <Check className="h-3.5 w-3.5 shrink-0 text-green-600" />
              {s.skillName}
              {!s.confirmed && <span className="text-[10px] text-gray-400">(unconfirmed)</span>}
            </div>
          ))}
          {readiness.missing.map((s) => (
            <div key={s.skillName} className="flex items-center gap-1.5 text-xs text-gray-400">
              <Circle className="h-3.5 w-3.5 shrink-0" />
              {s.skillName}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
