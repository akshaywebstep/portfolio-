"use client";

import React, { useState } from "react";
import { Plus, Edit3, Trash2, Save, X } from "lucide-react";
import { portfolioApi } from "@/lib/api";

interface ProjectsTabProps {
  projects: any[];
  onRefresh: () => void;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export default function ProjectsTab({ projects, onRefresh, onSuccess, onError }: ProjectsTabProps) {
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleOpenAdd = () => {
    setEditingProject({
      title: "",
      tagline: "",
      category: "Enterprise System",
      techStack: "Node.js, Express.js, MySQL",
      metrics: "",
      highlights: JSON.stringify(["Architected backend service with high reliability."]),
      architectureNotes: "",
      order: projects.length,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: any) => {
    setEditingProject({
      ...project,
      highlights:
        typeof project.highlights === "string"
          ? project.highlights
          : JSON.stringify(project.highlightsList || []),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number | string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await portfolioApi.deleteProject(id);
      onSuccess("Project deleted successfully from database");
      onRefresh();
    } catch (err: any) {
      onError(err.message || "Failed to delete project");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isNew = !editingProject.id;
      await portfolioApi.saveProject(editingProject);
      setIsModalOpen(false);
      setEditingProject(null);
      onSuccess(isNew ? "New project created successfully!" : "Project updated successfully!");
      onRefresh();
    } catch (err: any) {
      onError(err.message || "Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#002d5b]">
            Portfolio Systems &amp; Projects
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Data is stored in the database and immediately reflected across the live website.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#ec5b53] hover:bg-[#d94840] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => {
          const highlights = proj.highlightsList || [];
          return (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#ec5b53]">
                    {proj.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Order: {proj.order}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#002d5b] mb-2">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                  {proj.tagline}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {proj.techStackList?.map((tech: string, i: number) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-slate-500 space-y-1 mb-4">
                  <div className="font-semibold text-slate-700">Highlights ({highlights.length}):</div>
                  <ul className="list-disc pl-4 space-y-0.5 line-clamp-3">
                    {highlights.map((h: string, idx: number) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleOpenEdit(proj)}
                  className="p-2 rounded-lg text-slate-600 hover:text-[#002d5b] hover:bg-slate-100 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(proj.id, proj.title)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-serif text-2xl font-bold text-[#002d5b]">
                {editingProject.id ? "Edit Project" : "Add New Project"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={editingProject.title || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tagline / Short Summary
                </label>
                <input
                  type="text"
                  value={editingProject.tagline || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingProject.category || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingProject.order ?? 0}
                    onChange={(e) => setEditingProject({ ...editingProject, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tech Stack (Comma Separated)
                </label>
                <input
                  type="text"
                  value={editingProject.techStack || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, techStack: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                  placeholder="Node.js, Express.js, MySQL, Stripe"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Metrics &amp; Achievements
                </label>
                <input
                  type="text"
                  value={editingProject.metrics || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, metrics: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                  placeholder="3 Gateways Integrated • RBAC Security"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Key Highlights / Bullet Points (One per line)
                </label>
                <textarea
                  rows={4}
                  value={(() => {
                    try {
                      const arr =
                        typeof editingProject.highlights === "string"
                          ? JSON.parse(editingProject.highlights)
                          : editingProject.highlights;
                      return Array.isArray(arr) ? arr.join("\n") : editingProject.highlights;
                    } catch {
                      return editingProject.highlights || "";
                    }
                  })()}
                  onChange={(e) => {
                    const lines = e.target.value.split("\n").filter((l) => l.trim() !== "");
                    setEditingProject({ ...editingProject, highlights: JSON.stringify(lines) });
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                  placeholder="Enter each bullet point on a new line"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Architecture Notes
                </label>
                <input
                  type="text"
                  value={editingProject.architectureNotes || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, architectureNotes: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                  placeholder="Controller-Service-Repository pattern..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#ec5b53] hover:bg-[#d94840] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Saving..." : "Save Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
