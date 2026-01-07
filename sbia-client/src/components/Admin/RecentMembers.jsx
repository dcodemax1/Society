import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllMembers } from "../../services/memberApi";

function getStatusBadge(status) {
  switch (status) {
    case "ACTIVE":
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium whitespace-nowrap">
          ACTIVE
        </span>
      );
    case "INACTIVE":
      return (
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium whitespace-nowrap">
          INACTIVE
        </span>
      );
    default:
      return null;
  }
}

function RecentMembers() {
  const navigate = useNavigate();
  const [recentMembers, setRecentMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecentMembers = async () => {
      try {
        setLoading(true);
        const result = await fetchAllMembers();

        if (result.success && result.data) {
          // Sort by joining_date (newest first) and take only 5
          const sorted = (result.data || [])
            .sort((a, b) => {
              const dateA = new Date(a.joining_date || a.created_at);
              const dateB = new Date(b.joining_date || b.created_at);
              return dateB - dateA;
            })
            .slice(0, 5)
            .map((member) => ({
              id: member.member_id || member.id || Math.random(),
              name: member.full_name || "N/A",
              email: member.email || "N/A",
              mobile: member.mobile ? `+91 ${member.mobile}` : "N/A",
              status: member.status || "ACTIVE",
              joinDate: member.joining_date
                ? new Date(member.joining_date).toLocaleDateString("en-IN")
                : new Date(member.created_at).toLocaleDateString("en-IN"),
            }));

          setRecentMembers(sorted);
        } else {
          setRecentMembers([]);
        }
      } catch (error) {
        console.error("Error loading recent members:", error);
        setRecentMembers([]);
      } finally {
        setLoading(false);
      }
    };

    loadRecentMembers();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-800">
          New Members
        </h3>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/members");
          }}
          className="text-green-600 hover:text-green-700 font-medium text-sm"
        >
          View all
        </a>
      </div>

      <div className="space-y-2 flex-1">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        ) : recentMembers.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500 text-sm">No members found</p>
          </div>
        ) : (
          recentMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col sm:flex-row items-center justify-between p-2 md:p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition gap-2"
            >
              {/* Member Info - Left Side */}
              <div className="flex items-center gap-3 w-full sm:flex-1">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-green-700 font-bold text-sm md:text-lg">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <h4 className="font-semibold text-gray-800 text-sm md:text-base truncate">
                    {member.name}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600 truncate">
                    {member.email}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {member.mobile}
                  </p>
                </div>
              </div>

              {/* Status and Join Date - Right Side, Horizontally Aligned on Mobile */}
              <div className="flex items-center justify-between gap-4 w-full sm:flex-col sm:items-end sm:gap-2">
                <div>{getStatusBadge(member.status)}</div>
                <p className="text-xs text-gray-500">
                  Joined {member.joinDate}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/members");
          }}
          className="text-green-600 hover:text-green-700 font-medium text-sm"
        >
          View all members →
        </a>
      </div>
    </div>
  );
}

export default RecentMembers;
