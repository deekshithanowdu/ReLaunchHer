import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { calculateJobCompatibility } from "../../utils/jobCompatibility";
import JobCard from "../../components/jobs/JobCard";
import JobFilters from "../../components/jobs/JobFilters";
import EmptyState from "../../components/common/EmptyState";
import { Layers } from "lucide-react";

const Jobs = () => {
  const { currentUser } = useAuth();
  const { jobs, skills } = useAppContext();

  // Filters State
  const [filters, setFilters] = useState({
    searchQuery: "",
    locationQuery: "",
    jobType: "",
    isRemote: false,
    isReturnship: false,
    isFlexible: false
  });

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const handleReset = () => {
    setFilters({
      searchQuery: "",
      locationQuery: "",
      jobType: "",
      isRemote: false,
      isReturnship: false,
      isFlexible: false
    });
  };

  // Filter and sort jobs by compatibility
  const filteredJobs = jobs
    .map(job => {
      const compatibility = calculateJobCompatibility(job, currentUser || {}, skills);
      return {
        ...job,
        compatibility: compatibility.total
      };
    })
    .filter(job => {
      // 1. Keyword search
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesComp = job.company.toLowerCase().includes(query);
        const matchesSkill = job.skills.some(s => s.toLowerCase().includes(query));
        if (!matchesTitle && !matchesComp && !matchesSkill) return false;
      }

      // 2. Location search
      if (filters.locationQuery) {
        const locQuery = filters.locationQuery.toLowerCase();
        if (!job.location.toLowerCase().includes(locQuery)) return false;
      }

      // 3. Job Type
      if (filters.jobType) {
        if (job.jobType !== filters.jobType) return false;
      }

      // 4. Toggles
      if (filters.isRemote && !job.isRemote) return false;
      if (filters.isReturnship && !job.isReturnship) return false;
      if (filters.isFlexible && !job.isFlexible) return false;

      return true;
    })
    // Sort by compatibility score descending
    .sort((a, b) => b.compatibility - a.compatibility);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Header section */}
      <div>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>Compatible Jobs Board</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
          Explore returnships and career-break-friendly roles. Check your compatibility score tailored directly to your assessed skills.
        </p>
      </div>

      {/* Main Grid layout */}
      <div className="dashboard-grid">
        
        {/* Left Column (4 cols): Filter sidebar */}
        <div className="span-4">
          <JobFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleReset}
          />
        </div>

        {/* Right Column (8 cols): Job Listings grid */}
        <div className="span-8" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          <div className="flex justify-between items-center" style={{ fontSize: "0.85rem", color: "var(--text-muted)", paddingBottom: "0.25rem" }}>
            <span>Showing {filteredJobs.length} listings</span>
            <span>Sorted by highest compatibility matching</span>
          </div>

          {filteredJobs.length === 0 ? (
            <EmptyState
              title="No compatible jobs found"
              description="Try adjusting your keyword searches or deselecting filter criteria to find more opportunities."
              actionLabel="Reset Search Filters"
              onAction={handleReset}
            />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }}>
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  compatibility={job.compatibility}
                />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Jobs;
