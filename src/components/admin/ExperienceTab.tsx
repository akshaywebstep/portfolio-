"use client";

import React, { useState } from "react";
import { Plus, Edit3, Trash2, Save, X } from "lucide-react";
import { portfolioApi } from "@/lib/api";

interface ExperienceTabProps {
  experience: any[];
  onRefresh: () => void;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export default function ExperienceTab({ experience, onRefresh, onSuccess, onError }: ExperienceTabProps) {
  const [editingExp, setEditingExp] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleOpenAdd = () => {
    setEditingExp({
      company: "Company Name",
      location: "City, Country",
      role: "Backend Developer",
      period: "2024 – Present",
      type: "Full-Time",
      order: experience.length,
      subsections: JSON.stringify([
        {
          title: "API Architecture & Microservices",
          points: ["Engineered scalable REST APIs."],
        },
      ]),
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp: any) => {
    setEditingExp({
      ...exp,
      subsections:
        typeof exp.subsections === "string"
          ? exp.subsections
          : JSON.stringify(exp.subsectionsList || exp.subsections, null, 2),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number | string, company: string) => {
    if (!confirm(`Are you sure you want to delete experience at "${company}"?`)) return;
    try {
      await portfolioApi.deleteExperience(id);
      onSuccess("Experience deleted successfully");
      onRefresh();
    } catch (err: any) {
      onError(err.message || "Failed to delete experience");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isNew = !editingExp.id;
      await portfolioApi.saveExperience(editingExp);
      setIsModalOpen(false);
      setEditingExp(null);
      onSuccess(isNew ? "Experience record added successfully!" : "Experience updated successfully!");
      onRefresh();
    } catch (err: any) {
      onError(err.message || "Failed to save experience");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#002d5b]">
            Work Experience Records
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
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-4">
        {experience.map((exp) => {
          const subsections = exp.subsectionsList || [];
          return (
            <div
              key={exp.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-md transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#002d5b]">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold text-slate-600 mt-0.5">
                    {exp.company} • <span className="text-slate-400 font-normal">{exp.location}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    {exp.period}
                  </span>
                  <button
                    onClick={() => handleOpenEdit(exp)}
                    className="p-2 rounded-lg text-slate-600 hover:text-[#002d5b] hover:bg-slate-100 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id, exp.company)}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                {subsections.map((sub: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                    <h4 className="font-serif text-sm font-bold text-[#002d5b] mb-2">
                      {sub.title}
                    </h4>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600">
                      {sub.points?.map((pt: string, pIdx: number) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && editingExp && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-serif text-2xl font-bold text-[#002d5b]">
                {editingExp.id ? "Edit Experience" : "Add Work Experience"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company</label>
                  <input
                    type="text"
                    value={editingExp.company || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={editingExp.location || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Role / Job Title</label>
                <input
                  type="text"
                  value={editingExp.role || ""}
                  onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Period</label>
                  <input
                    type="text"
                    value={editingExp.period || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                    placeholder="March 2024 – Present"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Employment Type</label>
                  <input
                    type="text"
                    value={editingExp.type || ""}
                    onChange={(e) => setEditingExp({ ...editingExp, type: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                    placeholder="Full-Time"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Deliverables JSON (Subsections Array)
                </label>
                <textarea
                  rows={6}
                  value={
                    typeof editingExp.subsections === "string"
                      ? editingExp.subsections
                      : JSON.stringify(editingExp.subsections, null, 2)
                  }
                  onChange={(e) => setEditingExp({ ...editingExp, subsections: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-hidden focus:border-[#ec5b53]"
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
                  <span>{saving ? "Saving..." : "Save Experience"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
