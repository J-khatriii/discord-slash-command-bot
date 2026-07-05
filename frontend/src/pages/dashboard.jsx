import { useEffect, useState } from "react";

import { getInteractions } from "../services/interactionApi.js";
import { getStats } from "../services/statsApi.js";

import InteractionTable from "../components/InteractionTable.jsx";
import StatsCard from "../components/StatsCard.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Pagination from "../components/Pagination.jsx";

const Dashboard = () => {
  const [interactions, setInteractions] = useState([]);

  const [stats, setStats] = useState({
    totalInteractions: 0,
    totalReports: 0,
    totalStatusChecks: 0,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sorting, setSorting] = useState({
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const statsCards = [
    {
      title: "Total Interactions",
      value: stats.totalInteractions,
    },
    {
      title: "Reports",
      value: stats.totalReports,
    },
    {
      title: "Status Checks",
      value: stats.totalStatusChecks,
    },
  ];

  const loadInteractions = async (
    searchTerm = "",
    page = pagination.page,
    limit = pagination.limit
  ) => {
    try {
      const response = await getInteractions(
        searchTerm,
        page,
        limit,
        sorting.sortBy,
        sorting.sortOrder,
      );

      setInteractions(response.data);

      setPagination((prev) => ({
        ...prev,
        ...response.pagination,
      }));
    } catch (error) {
      setError("Failed to load interactions.");
      console.error(error);
    }
  };

  const loadStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      setError("Failed to load stats.");
      console.error(error);
    }
  };

  const refreshDashboard = async () => {
    setLoading(true);

    try {
      await Promise.all([
        loadInteractions(
          search,
          pagination.page,
          pagination.limit
        ),
        loadStats(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (value) => {
    setSearch(value);

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handlePrevious = () => {
    setPagination((prev) => ({
      ...prev,
      page: prev.page - 1,
    }));
  };

  const handleNext = () => {
    setPagination((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const handleSort = (column) => {
    setSorting((prev) => ({
      sortBy: column,
      sortOrder:
        prev.sortBy === column &&
        prev.sortOrder === "asc"
          ? "desc"
          : "asc",
    }));
  };

  useEffect(() => {
    refreshDashboard();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadInteractions(
        search,
        pagination.page,
        pagination.limit
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    loadInteractions(
      search,
      pagination.page,
      pagination.limit
    );
  }, [sorting]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="font-semibold text-red-600">
          {error}
        </h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-xl font-semibold">
          Loading dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <DashboardHeader onRefresh={refreshDashboard} />

      <div className="grid gap-6 md:grid-cols-3">
        {statsCards.map((card) => (
          <StatsCard
            key={card.title}
            title={card.title}
            value={card.value}
          />
        ))}
      </div>

      <SearchBar search={search} setSearch={setSearch} onSearchChange={handleSearchChange} />

      <InteractionTable interactions={interactions} sorting={sorting} onSort={handleSort} />

      <Pagination page={pagination.page} totalPages={pagination.totalPages} onPrevious={handlePrevious} onNext={handleNext} />
    </div>
  );
};

export default Dashboard;
