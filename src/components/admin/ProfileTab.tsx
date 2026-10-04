"use client";

import React, { useState } from "react";
import { Save } from "lucide-react";
import { portfolioApi } from "@/lib/api";

interface ProfileTabProps {
  initialProfile: any;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export default function ProfileTab({ initialProfile, onSuccess, onError }: ProfileTabProps) {
  const [profile, setProfile] = useState(initialProfile || {});
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await portfolioApi.updateProfile(profile);
      setProfile(updated);
      onSuccess("Profile details saved successfully to database!");
    } catch (err: any) {
      onError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#002d5b]">
            Personal &amp; Professional Profile
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Data is stored in the database and immediately reflected across the live website.
          </p>
        </div>
        <button
          type="submit"
          form="profile-form"
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-[#ec5b53] hover:bg-[#d94840] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>

      <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profile.name || ""}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:border-[#ec5b53]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Professional Role
            </label>
            <input
              type="text"
              value={profile.role || ""}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:border-[#ec5b53]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={profile.email || ""}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:border-[#ec5b53]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={profile.phone || ""}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:border-[#ec5b53]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Short Location
            </label>
            <input
              type="text"
              value={profile.location || ""}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:border-[#ec5b53]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Notice Period / Availability
            </label>
            <input
              type="text"
              value={profile.availability || ""}
              onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:border-[#ec5b53]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Core Subtitles / Specializations
          </label>
          <input
            type="text"
            value={profile.subtitles || ""}
            onChange={(e) => setProfile({ ...profile, subtitles: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:border-[#ec5b53]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Full Permanent Address
          </label>
          <input
            type="text"
            value={profile.address || ""}
            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:border-[#ec5b53]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Executive Summary &amp; Professional Bio
          </label>
          <textarea
            rows={5}
            value={profile.summary || ""}
            onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:border-[#ec5b53] leading-relaxed"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-[#ec5b53] hover:bg-[#d94840] text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
