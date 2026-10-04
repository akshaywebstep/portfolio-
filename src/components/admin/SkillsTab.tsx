"use client";

import React, { useState } from "react";
import { Plus, Edit3, Trash2, Save, X } from "lucide-react";
import { portfolioApi } from "@/lib/api";

interface SkillsTabProps {
  skills: any[];
  onRefresh: () => void;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export default function SkillsTab({ skills, onRefresh, onSuccess, onError }: SkillsTabProps) {
  const [editingSkill, setEditingSkill] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleOpenAdd = () => {
    setEditingSkill({
      name: "New Category",
      icon: "Server",
      skills: "Skill 1, Skill 2, Skill 3",
      order: skills.length,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill: any) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number | string, name: string) => {
    if (!confirm(`Delete skill category "${name}"?`)) return;
    try {
      await portfolioApi.deleteSkill(id);
      onSuccess("Skill category deleted successfully from database");
      onRefresh();
    } catch (err: any) {
      onError(err.message || "Failed to delete skill");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isNew = !editingSkill.id;
      await portfolioApi.saveSkill(editingSkill);
      setIsModalOpen(false);
      setEditingSkill(null);
      onSuccess(isNew ? "Skill category added successfully!" : "Skill category updated successfully!");
      onRefresh();
    } catch (err: any) {
      onError(err.message || "Failed to save skill category");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#002d5b]">
            Technical Skills &amp; Stack Categories
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
          <span>Add Skill Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((sc) => (
          <div
            key={sc.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#ec5b53] uppercase tracking-wider">
                  Icon: {sc.icon}
                </span>
                <span className="text-xs font-mono text-slate-400">Order: {sc.order}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#002d5b] mb-4">
                {sc.name}
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {sc.skillsList?.map((s: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleOpenEdit(sc)}
                className="p-2 rounded-lg text-slate-600 hover:text-[#002d5b] hover:bg-slate-100 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(sc.id, sc.name)}
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
      {isModalOpen && editingSkill && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-serif text-2xl font-bold text-[#002d5b]">
                {editingSkill.id ? "Edit Skill Category" : "Add Skill Category"}
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
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category Name</label>
                <input
                  type="text"
                  value={editingSkill.name || ""}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Icon Name</label>
                  <select
                    value={editingSkill.icon || "Server"}
                    onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                  >
                    <option value="Server">Server</option>
                    <option value="Database">Database</option>
                    <option value="CreditCard">CreditCard</option>
                    <option value="ShieldCheck">ShieldCheck</option>
                    <option value="Terminal">Terminal</option>
                    <option value="Code2">Code2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Order</label>
                  <input
                    type="number"
                    value={editingSkill.order ?? 0}
                    onChange={(e) => setEditingSkill({ ...editingSkill, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Skills (Comma Separated)</label>
                <textarea
                  rows={3}
                  value={editingSkill.skills || ""}
                  onChange={(e) => setEditingSkill({ ...editingSkill, skills: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#ec5b53]"
                  placeholder="Node.js, Express.js, REST APIs"
                  required
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
                  <span>{saving ? "Saving..." : "Save Category"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
