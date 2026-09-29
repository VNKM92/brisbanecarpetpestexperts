"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Plus,
  Edit,
  X,
  CheckSquare,
  Square,
  Lock,
} from "lucide-react";

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: "",
    slug: "",
    description: "",
    permissionIds: [],
  });
  const [saving, setSaving] = useState(false);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/roles");
      const json = await res.json();
      if (json.success) {
        setRoles(json.data.roles);
        setPermissions(json.data.permissions);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleTogglePermission = (permId: string) => {
    const list = formData.permissionIds || [];
    if (list.includes(permId)) {
      setFormData({ ...formData, permissionIds: list.filter((id: string) => id !== permId) });
    } else {
      setFormData({ ...formData, permissionIds: [...list, permId] });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = formData.id ? "PATCH" : "POST";
      await fetch("/api/admin/roles", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setModalOpen(false);
      fetchRoles();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" size={24} />
            <span>Role-Based Access Control (RBAC)</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Define system roles, access boundaries and granular permissions matrix.
          </p>
        </div>
      </div>

      {/* Roles Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <p className="text-xs text-slate-500 py-6 col-span-2 text-center">Loading roles matrix...</p>
        ) : (
          roles.map((r) => {
            const rolePermIds = r.permissions?.map((rp: any) => rp.permissionId) || [];
            return (
              <div
                key={r.id}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">{r.name}</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-emerald-400">
                      {r.slug}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">
                      {r._count?.users || 0} Assigned Users
                    </span>
                    <button
                      onClick={() => {
                        setFormData({
                          id: r.id,
                          name: r.name,
                          slug: r.slug,
                          description: r.description || "",
                          permissionIds: rolePermIds,
                        });
                        setModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-900/60 text-slate-300 hover:text-emerald-300 transition"
                      title="Edit Role Matrix"
                    >
                      <Edit size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-400">{r.description || "System RBAC access role."}</p>

                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Enabled Permissions ({rolePermIds.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                    {r.slug === "super-admin" ? (
                      <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-lg">
                        ⭐ Full Super Administrator Access (All Modules)
                      </span>
                    ) : rolePermIds.length === 0 ? (
                      <span className="text-xs text-slate-500">No explicit permissions assigned.</span>
                    ) : (
                      permissions
                        .filter((p) => rolePermIds.includes(p.id))
                        .map((p) => (
                          <span
                            key={p.id}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                          >
                            {p.name}
                          </span>
                        ))
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSave}
            className="bg-slate-950 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 sticky top-0 bg-slate-950 z-10">
              <h2 className="text-sm font-bold text-white">Edit Role & Permissions Matrix</h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Role Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Select Role Permissions ({formData.permissionIds?.length || 0} active):
                </label>
                <div className="grid grid-cols-2 gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800 max-h-60 overflow-y-auto">
                  {permissions.map((p) => {
                    const isChecked = formData.permissionIds?.includes(p.id);
                    return (
                      <div
                        key={p.id}
                        onClick={() => handleTogglePermission(p.id)}
                        className={`p-2 rounded-lg border flex items-center gap-2 cursor-pointer transition select-none ${
                          isChecked
                            ? "bg-emerald-950/60 border-emerald-800 text-emerald-300"
                            : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare size={14} className="text-emerald-400 flex-shrink-0" />
                        ) : (
                          <Square size={14} className="text-slate-500 flex-shrink-0" />
                        )}
                        <span className="text-[11px] font-medium leading-tight">{p.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800 sticky bottom-0 bg-slate-950">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Role Matrix"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
