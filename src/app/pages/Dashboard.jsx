import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLeads } from "../../hooks/useLeads";
import { useLeadsStore } from "../../store/useLeadsStore";
import { motion } from "framer-motion";
import { tokens } from "../../design-system/tokens";
import { updateStatus } from "../../lib/api";
import Modal from "../../components/ui/Modal";
import { IoLogOut, IoSearch, IoDownload } from "react-icons/io5";

export default function Dashboard() {
  const navigate = useNavigate();
  const { leads, setLeads } = useLeadsStore();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useLeads();

  useEffect(() => {
    if (localStorage.getItem("admin") !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const handleStatusChange = async (phone, newStatus) => {
    try {
      await updateStatus(phone, newStatus);
      setLeads((prev) =>
        prev.map((l) => (l.phone === phone ? { ...l, status: newStatus } : l)),
      );
    } catch (err) {
      console.error(err);
      setShowModal(true);
    }
  };

  // Filter and search
  const filteredLeads = leads
    .filter((l) => {
      const matchesSearch =
        l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.phone?.includes(searchTerm) ||
        l.university?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "All" || l.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return 0; // Keep original order
      if (sortBy === "alphabetical") return a.name.localeCompare(b.name);
      return 0;
    });

  const stats = [
    {
      title: "Total Applications",
      value: leads.length,
      color: tokens.colors.primary,
      icon: "📊",
    },
    {
      title: "Pending",
      value: leads.filter((l) => l.status === "Pending").length,
      color: tokens.colors.warning,
      icon: "⏳",
    },
    {
      title: "Approved",
      value: leads.filter((l) => l.status === "Approved").length,
      color: tokens.colors.success,
      icon: "✓",
    },
    {
      title: "Rejected",
      value: leads.filter((l) => l.status === "Rejected").length,
      color: tokens.colors.danger,
      icon: "✕",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        background: tokens.colors.background,
        padding: "20px",
        overflow: "hidden",
      }}
    >
      {/* Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 1 }}
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${tokens.colors.primary}40, transparent)`,
          top: "-100px",
          right: "-100px",
          zIndex: 1,
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "2.5rem",
              fontFamily: tokens.fonts.heading,
              color: tokens.colors.text,
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Dashboard
          </h1>
          <p
            style={{
              color: tokens.colors.muted,
              fontSize: "0.95rem",
              margin: "8px 0 0 0",
            }}
          >
            Manage all applications
          </p>
        </div>

        <motion.button
          onClick={logout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            background: tokens.colors.danger,
            color: tokens.colors.text,
            border: "none",
            borderRadius: tokens.radius.md,
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "0.95rem",
            fontFamily: tokens.fonts.body,
            boxShadow: `0 0 20px ${tokens.colors.danger}40`,
          }}
        >
          <IoLogOut /> Logout
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <StatCard stat={stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* Controls & Table */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Controls */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {/* Search */}
          <div
            style={{
              position: "relative",
              background: tokens.colors.glass,
              border: `1.5px solid ${tokens.colors.border}`,
              borderRadius: tokens.radius.md,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <IoSearch style={{ color: tokens.colors.muted }} />
            <input
              type="text"
              placeholder="Search by name, phone, or university..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                color: tokens.colors.text,
                fontSize: "0.95rem",
                outline: "none",
                fontFamily: tokens.fonts.body,
              }}
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "12px 16px",
              borderRadius: tokens.radius.md,
              border: `1.5px solid ${tokens.colors.border}`,
              background: tokens.colors.glass,
              color: tokens.colors.text,
              fontSize: "0.95rem",
              fontFamily: tokens.fonts.body,
              cursor: "pointer",
              backdropFilter: "blur(10px)",
            }}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "12px 16px",
              borderRadius: tokens.radius.md,
              border: `1.5px solid ${tokens.colors.border}`,
              background: tokens.colors.glass,
              color: tokens.colors.text,
              fontSize: "0.95rem",
              fontFamily: tokens.fonts.body,
              cursor: "pointer",
              backdropFilter: "blur(10px)",
            }}
          >
            <option value="newest">Newest First</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>

        {/* Table Container */}
        <div
          style={{
            background: tokens.colors.backgroundSecondary,
            border: `1.5px solid ${tokens.colors.borderStrong}`,
            borderRadius: tokens.radius.lg,
            overflow: "hidden",
            backdropFilter: "blur(20px)",
            boxShadow: tokens.shadow.card,
          }}
        >
          {filteredLeads.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                padding: "60px 40px",
                textAlign: "center",
              }}
            >
              <p style={{ color: tokens.colors.muted, fontSize: "1.1rem" }}>
                {leads.length === 0
                  ? "No applications yet..."
                  : "No matching applications found"}
              </p>
            </motion.div>
          ) : (
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.95rem",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: tokens.colors.card,
                      borderBottom: `1px solid ${tokens.colors.border}`,
                    }}
                  >
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Phone</TableHeader>
                    <TableHeader>University</TableHeader>
                    <TableHeader>Year</TableHeader>
                    <TableHeader>Major</TableHeader>
                    <TableHeader>Screenshot</TableHeader>
                    <TableHeader>Status</TableHeader>
                  </tr>
                </thead>

                <tbody>
                  {filteredLeads.map((lead, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      style={{
                        borderBottom: `1px solid ${tokens.colors.border}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = tokens.colors.card;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <TableCell>{lead.name}</TableCell>
                      <TableCell>{lead.phone}</TableCell>
                      <TableCell>{lead.university}</TableCell>
                      <TableCell>{lead.year}</TableCell>
                      <TableCell>{lead.major}</TableCell>
                      <TableCell>
                        {lead.fileUrl ? (
                          <a
                            href={lead.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              color: tokens.colors.primary,
                              textDecoration: "none",
                              fontWeight: "600",
                              transition: tokens.transition.smooth,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color =
                                tokens.colors.primaryHover;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color =
                                tokens.colors.primary;
                            }}
                          >
                            <IoDownload /> View
                          </a>
                        ) : (
                          <span style={{ color: tokens.colors.muted }}>—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead.phone, e.target.value)
                          }
                          style={{
                            padding: "8px 12px",
                            borderRadius: tokens.radius.sm,
                            border: `1.5px solid ${getStatusColor(lead.status)}`,
                            background: `${getStatusColor(lead.status)}15`,
                            color: getStatusColor(lead.status),
                            fontWeight: "600",
                            cursor: "pointer",
                            fontFamily: tokens.fonts.body,
                            fontSize: "0.85rem",
                            transition: tokens.transition.smooth,
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </TableCell>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: "0.9rem",
            color: tokens.colors.muted,
            marginTop: "16px",
            textAlign: "center",
          }}
        >
          Showing {filteredLeads.length} of {leads.length} applications
        </motion.p>
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Error"
        message="Failed to update status. Please try again."
        type="error"
        actionLabel="Dismiss"
      />
    </section>
  );
}

function StatCard({ stat }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      style={{
        background: stat.color + "15",
        border: `1.5px solid ${stat.color}40`,
        borderRadius: tokens.radius.lg,
        padding: "24px",
        backdropFilter: "blur(20px)",
        cursor: "pointer",
        transition: tokens.transition.smooth,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 40px ${stat.color}30`;
        e.currentTarget.style.borderColor = stat.color + "80";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = stat.color + "40";
      }}
    >
      <div
        style={{
          fontSize: "1.8rem",
          marginBottom: "12px",
        }}
      >
        {stat.icon}
      </div>
      <p
        style={{
          fontSize: "0.9rem",
          color: tokens.colors.muted,
          margin: "0 0 8px 0",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontWeight: "600",
        }}
      >
        {stat.title}
      </p>
      <p
        style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          margin: 0,
          color: stat.color,
          fontFamily: tokens.fonts.heading,
        }}
      >
        {stat.value}
      </p>
    </motion.div>
  );
}

function TableHeader({ children }) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "16px",
        color: tokens.colors.accent,
        fontSize: "0.9rem",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        fontFamily: tokens.fonts.body,
      }}
    >
      {children}
    </th>
  );
}

function TableCell({ children }) {
  return (
    <td
      style={{
        padding: "16px",
        color: tokens.colors.text,
        fontFamily: tokens.fonts.body,
      }}
    >
      {children}
    </td>
  );
}

function getStatusColor(status) {
  const colors = {
    Pending: tokens.colors.warning,
    Approved: tokens.colors.success,
    Rejected: tokens.colors.danger,
  };
  return colors[status] || tokens.colors.muted;
}
