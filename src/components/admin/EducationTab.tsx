"use client";

import React, { useState } from "react";
import { Plus, Edit3, Trash2, Save, X } from "lucide-react";
import { portfolioApi } from "@/lib/api";

interface EducationTabProps {
  education: any[];
  onRefresh: () => void;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export default function EducationTab({ education, onRefresh, onSuccess, onError }: EducationTabProps) {
  const [editingEdu, setEditingEdu] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleOpenAdd = () => {
    setEditingEdu({
      degree: "Bachelor of Technology",
      institution: "Kurukshetra University",
      year: "2019 – 2023",
      score: "75% Aggregate",
      order: education.length,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (edu: any) => {
    setEditingEdu(edu);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number | string, degree: string) => {
    if (!confirm(`Delete education record "${degree}"?`)) return;
    try {
      await portfolioApi.deleteEducation(id);
      onSuccess("Education record deleted successfully from database");
      onRefresh();
    } catch (err: any) {
      onError(err.message || "Failed to delete education");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isNew = !editingEdu.id;
      await portfolioApi.saveEducation(editingEdu);
      setIsModalOpen(false);
      setEditingEdu(null);
      onSuccess(isNew ? "Education added successfully!" : "Education updated successfully!");
      onRefresh();
    } catch (err: any) {
      onError(err.message || "Failed to save education");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#002d5b]">
            Education &amp; Academic Credentials
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
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-wrap items-center justify-between gap-4 hover:shadow-md transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-[#002d5b]">
                  {edu.degree}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                  {edu.score}
                </span>
              </div>
              <p className="text-sm text-slate-600 font-medium">
                {edu.institution}
              </p>
              <span className="text-xs text-slate-400 font-mono">
                Year: {edu.year} • Order: {edu.order}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenEdit(edu)}
                className="p-2 rounded-lg text-slate-600 hover:text-[#002d5b] hover:bg-slate-100 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(edu.id, edu.degree)}
                className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && editingEdu && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-serif text-2xl font-bold text-[#002d5b]">
                {editingEdu.id ? "Edit Education" : "Add Education Record"}
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
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Degree / Course</label>
                <input
                  type="text"
                  value={editingEdu.degree || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Institution / University</label>
                <input
                  type="text"
                  value={editingEdu.institution || ""}
                  onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Year</label>
                  <input
                    type="text"
                    value={editingEdu.year || ""}
                    onChange={(e) => setEditingEdu({ ...editingEdu, year: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                    placeholder="2019 – 2023"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Score / Percentage</label>
                  <input
                    type="text"
                    value={editingEdu.score || ""}
                    onChange={(e) => setEditingEdu({ ...editingEdu, score: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                    placeholder="75% Aggregate"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Display Order</label>
                <input
                  type="number"
                  value={editingEdu.order ?? 0}
                  onChange={(e) => setEditingEdu({ ...editingEdu, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
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
                  <span>{saving ? "Saving..." : "Save Record"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
