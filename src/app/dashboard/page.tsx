"use client";

import React, { useState, useMemo } from 'react';
import { Search, ChevronsUpDown, Award, Filter, ChevronDown } from 'lucide-react';
import StudyCard from '@/app/dashboard/(components)/card';
import { useRouter } from 'next/navigation';

interface Author {
  id: number;
  name: string;
  role: 'student' | 'faculty';
}

interface Study {
  id: number;
  title: string;
  description: string;
  type: string;
  publishedDate: string;
  authors: Author[];
  publishedBy: Author;
  tags: string[];
  keywords: string[];
  isArchived: boolean;
  isBestPaper: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const isAdmin = true;

  const [studies, setStudies] = useState<Study[]>([
    {
      id: 1,
      title: "The Impact of Social Media on Academic Performance",
      description: "A quantitative study examining the correlation between social media usage and GPA among senior high students.",
      type: "Quantitative Research",
      publishedDate: "2023-05-15",
      authors: [
        { id: 101, name: "Maria Santos", role: "student" },
        { id: 102, name: "Juan Dela Cruz", role: "student" }
      ],
      publishedBy: { id: 201, name: "Dr. Robert Lee", role: "faculty" },
      tags: ["Education & Learning", "Social Media"],
      keywords: ["Learning", "Technology", "Students", "Analysis"],
      isArchived: false,
      isBestPaper: true
    },
    {
      id: 2,
      title: "Effects of Sleep Deprivation on Cognitive Functions",
      description: "Experimental research measuring the effects of different sleep durations on memory retention.",
      type: "Experimental Study",
      publishedDate: "2023-03-22",
      authors: [
        { id: 103, name: "Robert Johnson", role: "student" },
        { id: 104, name: "Sarah Chen", role: "student" }
      ],
      publishedBy: { id: 202, name: "Dr. Anna Garcia", role: "faculty" },
      tags: ["Health Sciences", "Health"],
      keywords: ["Health", "Cognition", "Experiment", "Memory"],
      isArchived: true,
      isBestPaper: false
    },
    {
      id: 3,
      title: "Cultural Influences on Learning Styles",
      description: "Qualitative analysis of how cultural background affects preferred learning methods.",
      type: "Qualitative Research",
      publishedDate: "2023-07-10",
      authors: [
        { id: 105, name: "Amina Mohammed", role: "student" },
        { id: 106, name: "James Wilson", role: "student" }
      ],
      publishedBy: { id: 203, name: "Dr. Michael Torres", role: "faculty" },
      tags: ["Culture & Society", "Education & Learning"],
      keywords: ["Culture", "Learning", "Qualitative", "Society"],
      isArchived: false,
      isBestPaper: false
    },
    {
      id: 4,
      title: "Sustainable Energy Solutions",
      description: "Analysis of renewable energy sources and their impact on reducing carbon footprint.",
      type: "Review Paper",
      publishedDate: "2023-09-05",
      authors: [{ id: 107, name: "Emily Green", role: "student" }],
      publishedBy: { id: 204, name: "Prof. David Brown", role: "faculty" },
      tags: ["Energy & Environment"],
      keywords: ["Renewable Energy", "Sustainability", "Environment"],
      isArchived: false,
      isBestPaper: false,
    },
    {
      id: 5,
      title: "Artificial Intelligence in Healthcare",
      description: "Exploring the applications of AI in diagnostics and patient care.",
      type: "Case Study",
      publishedDate: "2023-11-20",
      authors: [{ id: 108, name: "Carlos Ramirez", role: "student" }],
      publishedBy: { id: 205, name: "Dr. Sofia Martinez", role: "faculty" },
      tags: ["Technology & Innovation", "Health Sciences"],
      keywords: ["AI", "Healthcare", "Diagnostics", "Innovation"],
      isArchived: false,
      isBestPaper: false,
    },
    {
      id: 6,
      title: "The Economics of Digital Marketing",
      description: "Analyzing the economic impact of digital marketing strategies on small businesses.",
      type: "Economic Analysis",
      publishedDate: "2024-01-15",
      authors: [{ id: 109, name: "Laura Kim", role: "student" }],
      publishedBy: { id: 206, name: "Prof. John Smith", role: "faculty" },
      tags: ["Business & Economics", "Technology & Innovation"],
      keywords: ["Digital Marketing", "Economics", "Small Business"],
      isArchived: false,
      isBestPaper: false,
    },
  ]);

  const categoryOptions = [
    "Health Sciences",
    "Energy & Environment",
    "Technology & Innovation",
    "Social Sciences",
    "Business & Economics",
    "Education & Learning",
    "Culture & Society",
    "Engineering & Design",
    "Agriculture & Food Science",
    "Ethics & Philosophy",
  ];

  const filteredStudies = useMemo(() => {
    return studies
      .filter(study => {
        const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          study.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          study.authors.some(author => author.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          study.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          study.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));

        if (categoryFilter === 'all') return matchesSearch;
        if (categoryFilter === 'best') return matchesSearch && study.isBestPaper;
        return matchesSearch && study.tags.includes(categoryFilter);
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        if (sortBy === 'oldest') return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
        return a.title.localeCompare(b.title);
      });
  }, [searchQuery, sortBy, categoryFilter, studies]);

  const toggleBookmark = (studyId: number): void => {
    if (bookmarks.includes(studyId)) {
      setBookmarks(bookmarks.filter(id => id !== studyId));
    } else {
      setBookmarks([...bookmarks, studyId]);
    }
  };

  const handleArchive = (studyId: number): void => {
    alert(`Archive study with ID: ${studyId}`);
  };

  const handleDelete = (studyId: number): void => {
    alert(`Delete study with ID: ${studyId}`);
  };

  const handleEdit = (studyId: number): void => {
    router.push(`/studies/${studyId}/edit`);
  };

  const handleMarkBestPaper = (studyId: number, status: boolean): void => {
    setStudies(prevStudies => {
      const bestStudy = prevStudies.find(study => study.isBestPaper);
      if (status && bestStudy && bestStudy.id !== studyId) {
        return prevStudies.map(study => study.id === bestStudy.id ? { ...study, isBestPaper: false } : study)
      }
      return prevStudies.map(study => study.id === studyId ? { ...study, isBestPaper: status } : study)
    });
  };

  const handleCardClick = (studyId: number): void => {
    router.push(`/studies/${studyId}`);
  };

  const selectCategory = (category: string) => {
    setCategoryFilter(category);
    setIsDropdownOpen(false);
  };

  const getCurrentCategoryDisplay = () => {
    if (categoryFilter === 'all') return 'All Categories';
    if (categoryFilter === 'best') return 'Best Papers';
    return categoryFilter;
  };

  const bestPapersCount = studies.filter(study => study.isBestPaper).length;

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-10">
          <div className="bg-gradient-to-r from-red-900 to-red-800 h-2 w-24 mb-4"></div>
          <h1 className="text-3xl font-bold text-gray-900">
            Research <span className="text-red-900">Dashboard</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and explore your academic research collection
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search studies, authors, keywords..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-900 transition-all duration-300 ease-in-out"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 text-slate-400" size={20} />
          </div>

          <div className="relative">
            <select
              className="pl-4 pr-10 py-3 rounded-lg border border-slate-200 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-red-900 transition-all duration-300 ease-in-out"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
            </select>
            <ChevronsUpDown className="absolute right-3 top-3.5 text-slate-400" size={20} />
          </div>

          {isAdmin && (
            <div className="relative">
              <button
                className="flex items-center justify-between gap-2 px-4 py-3 w-48 rounded-lg border border-slate-200 bg-white text-gray-700 hover:bg-slate-50 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-900"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                <div className="flex items-center gap-2">
                  {categoryFilter === 'best' && (
                    <Award className="text-yellow-500" size={20} />
                  )}
                  <span>{getCurrentCategoryDisplay()}</span>
                </div>
                <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 flex items-center gap-2"
                      onClick={() => selectCategory('all')}
                      role="menuitem"
                    >
                      All Categories
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 flex items-center gap-2"
                      onClick={() => selectCategory('best')}
                      role="menuitem"
                    >
                      <Award className="text-yellow-500" size={18} />
                      Best Papers
                      {bestPapersCount > 0 && (
                        <span className="ml-auto bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {bestPapersCount}
                        </span>
                      )}
                    </button>
                    <div className="border-t border-slate-200 my-1"></div>
                    {categoryOptions.map(category => (
                      <button
                        key={category}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
                        onClick={() => selectCategory(category)}
                        role="menuitem"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {filteredStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((study) => (
              <StudyCard
                key={study.id}
                study={study}
                isBookmarked={bookmarks.includes(study.id)}
                isAdmin={isAdmin}
                isDashboard={true}
                onToggleBookmark={toggleBookmark}
                onArchive={handleArchive}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onMarkBestPaper={handleMarkBestPaper}
                onClick={handleCardClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              No studies found
            </h3>
            <p className="text-gray-600 mb-6">
              {categoryFilter === 'best'
                ? "No best research studies match your search criteria"
                : categoryFilter !== 'all'
                  ? `No studies in the "${categoryFilter}" category match your search criteria`
                  : "Try adjusting your search query or explore different filters"}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
              }}
              className="px-6 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors flex items-center gap-2"
            >
              <Filter size={18} />
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}