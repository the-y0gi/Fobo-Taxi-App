"use client";

import { useState } from "react";
import { users } from "@/lib/dummy/users";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserHistoryModal } from "@/components/modals/user-history-modal";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userList, setUserList] = useState(users);

  const filteredUsers = userList.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search)
  );

  const toggleBlock = (id: string) => {
    setUserList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isBlocked: !u.isBlocked } : u))
    );
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-900">User Management</h1>

      {/* Search Input */}
      <Input
        placeholder="Search users by name, email or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md border border-primary/30 shadow-sm"
      />

      {/* Desktop Table */}
      <Card className="p-4 border border-gray-200 shadow-sm bg-white rounded-xl hidden md:block">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="text-left">
              <th className="p-3 font-semibold text-gray-900">User</th>
              <th className="p-3 font-semibold text-gray-900">Email</th>
              <th className="p-3 font-semibold text-gray-900">Phone</th>
              <th className="p-3 font-semibold text-gray-900">Total Trips</th>
              <th className="p-3 font-semibold text-gray-900">Total Spent</th>
              <th className="p-3 font-semibold text-gray-900">Status</th>
              <th className="p-3 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-all">
                {/* User Name + Avatar */}
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={user?.profileImage}
                      className="w-10 h-10 rounded-lg object-cover border"
                      alt={user.name}
                    />
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.id}</p>
                    </div>
                  </div>
                </td>

                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3 font-semibold">{user.totalTrips}</td>
                <td className="p-3 font-semibold text-green-700">
                  ₹{user.totalSpent}
                </td>

                {/* Status */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      user.isBlocked
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : "bg-green-100 text-green-700 border border-green-200"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-3 flex gap-3">
                  {/* History Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full px-4 py-1 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black"
                    onClick={() => {
                      setSelectedUser(user);
                      setOpen(true);
                    }}
                  >
                    History
                  </Button>

                  {/* Block / Unblock Button */}
                  {user.isBlocked ? (
                    <Button
                      size="sm"
                      className="rounded-full px-5 py-1 bg-primary hover:bg-primary-dark text-white shadow-sm"
                      onClick={() => toggleBlock(user.id)}
                    >
                      Unblock
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="rounded-full px-5 py-1 bg-red-500 hover:bg-red-600 text-white shadow-sm"
                      onClick={() => toggleBlock(user.id)}
                    >
                      Block
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Mobile View – Card UI */}
      <div className="md:hidden space-y-4">
        {filteredUsers.map((user) => (
          <Card
            key={user.id}
            className="p-4 border border-gray-200 shadow-sm rounded-xl bg-white"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={user.profileImage}
                className="w-12 h-12 rounded-lg border"
                alt={user.name}
              />
              <div>
                <p className="text-base font-semibold text-gray-900">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Phone</span>
                <span>{user.phone}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Total Trips</span>
                <span className="font-semibold">{user.totalTrips}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Total Spent</span>
                <span className="font-semibold text-green-700">
                  ₹{user.totalSpent}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span
                  className={`px-2 py-1 rounded-lg text-xs ${
                    user.isBlocked
                      ? "bg-red-100 text-red-700 border border-red-200"
                      : "bg-green-100 text-green-700 border border-green-200"
                  }`}
                >
                  {user.isBlocked ? "Blocked" : "Active"}
                </span>
              </div>

              {/* Mobile Buttons */}
              <div className="flex gap-3 pt-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full rounded-full border-gray-300 text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setSelectedUser(user);
                    setOpen(true);
                  }}
                >
                  History
                </Button>

                <Button
                  size="sm"
                  className={`w-full rounded-full ${
                    user.isBlocked
                      ? "bg-primary hover:bg-primary-dark"
                      : "bg-red-500 hover:bg-red-600"
                  } text-white shadow-sm`}
                  onClick={() => toggleBlock(user.id)}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* History Modal */}
      <UserHistoryModal open={open} setOpen={setOpen} user={selectedUser} />
    </div>
  );
}
