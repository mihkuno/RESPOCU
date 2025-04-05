"use client";

import React, { useState, useMemo } from 'react';
import { Search, ChevronsUpDown, Award, Filter, Bookmark, ChevronDown, TestTube, Book, FileText, FileSpreadsheet, LineChart, Users, FlaskConical, BookOpen, Clock, Globe, Layers, Settings, Heart, Leaf, Cpu, DollarSign, GraduationCap, UserRound, Rocket, FileMinus2 } from 'lucide-react';
import StudyCard from '@/app/dashboard/(components)/card';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/providers/profileContext';

interface Study {
  id: string;
  title: string;
  description: string;
  type: string;
  publishedDate: string;
  authors: string[];
  publishedBy: string;
  categories: string[];
  isArchived: boolean;
  isBestPaper: boolean;
  isBookmarked: boolean;
}

export default function Home({ studyData }: { studyData: Study[] }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState<boolean>(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [studies, setStudies] = useState<Study[]>(studyData);
  const { profile } = useProfile();
  const { isAdmin } = profile;


  const categoryOptions = [
    "Health & Wellness",
    "Environment & Sustainability",
    "Technology & Innovation",
    "Economics & Development",
    "Education & Learning",
    "Sociology & Society",
    "Astronomy & Exploration",
  ];

  const typeOptions = [
    "Capstone Research",
    "Qualitative Research",
    "Quantitative Research",
    "Experimental Research",
    "Descriptive Research",
    "Correlational Research",
    "Action Research",
    "Case Study Research",
    "Longitudinal Research",
    "Ethnographic Research",
    "Mixed-Methods Research",
    "Developmental Research",
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'title', label: 'Title (A-Z)' },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Capstone Research": return <FileMinus2 size={18} />;
      case "Qualitative Research": return <Users size={18} />;
      case "Quantitative Research": return <FileSpreadsheet size={18} />;
      case "Experimental Research": return <TestTube size={18} />;
      case "Descriptive Research": return <FileText size={18} />;
      case "Correlational Research": return <LineChart size={18} />;
      case "Action Research": return <Settings size={18} />;
      case "Case Study Research": return <BookOpen size={18} />;
      case "Longitudinal Research": return <Clock size={18} />;
      case "Ethnographic Research": return <Globe size={18} />;
      case "Mixed-Methods Research": return <Layers size={18} />;
      case "Developmental Research": return <FlaskConical size={18} />;
      default: return <Book size={18} />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Health & Wellness": return <Heart size={18} />;
      case "Environment & Sustainability": return <Leaf size={18} />;
      case "Technology & Innovation": return <Cpu size={18} />;
      case "Economics & Development": return <DollarSign size={18} />;
      case "Education & Learning": return <GraduationCap size={18} />;
      case "Sociology & Society": return <UserRound size={18} />;
      case "Astronomy & Exploration": return <Rocket size={18} />;
      default: return null;
    }
  };

  const filteredStudies = useMemo(() => {
    return studies
      .filter(study => !study.isArchived)
      .filter(study => {
        const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          study.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          study.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
          study.categories.some(category => category.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory =
          categoryFilter === 'all' ? true :
            categoryFilter === 'best' ? study.isBestPaper :
              categoryFilter === 'bookmarks' ? study.isBookmarked :
                study.categories.includes(categoryFilter);

        const matchesType = typeFilter === 'all' || study.type === typeFilter;

        return matchesSearch && matchesCategory && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        if (sortBy === 'oldest') return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
        return a.title.localeCompare(b.title);
      });
  }, [searchQuery, sortBy, categoryFilter, typeFilter, studies]);


  const selectCategory = (category: string) => {
    setCategoryFilter(category);
    setIsCategoryDropdownOpen(false);
  };

  const selectType = (type: string) => {
    setTypeFilter(type);
    setIsTypeDropdownOpen(false);
  };

  const selectSort = (sortValue: string) => {
    setSortBy(sortValue);
    setIsSortDropdownOpen(false);
  };

  const getCurrentCategoryDisplay = () => {
    if (categoryFilter === 'all') return 'All Categories';
    if (categoryFilter === 'best') return 'Best Papers';
    if (categoryFilter === 'bookmarks') return 'Bookmarks';
    return categoryFilter;
  };

  const getCurrentTypeDisplay = () => {
    if (typeFilter === 'all') return 'All Types';
    return typeFilter;
  };

  const getCurrentSortDisplay = () => {
    return sortOptions.find(option => option.value === sortBy)?.label || 'Sort By';
  };

  const bestPapersCount = studies.filter(study => study.isBestPaper && !study.isArchived).length;
  const bookmarksCount = studies.filter(study => study.isBookmarked && !study.isArchived).length;

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-8 flex-wrap">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search studies, authors..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-900 transition-all duration-300 ease-in-out"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 text-slate-400" size={20} />
        </div>

        <div className="relative">
          <button
            className="flex items-center justify-between gap-2 px-4 py-3 w-48 rounded-lg border border-slate-200 bg-white text-gray-700 hover:bg-slate-50 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-900"
            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            aria-haspopup="true"
            aria-expanded={isSortDropdownOpen}
          >
            <div className="flex items-center gap-2">
              <span>{getCurrentSortDisplay()}</span>
            </div>
            <ChevronDown size={18} className={`transition-transform duration-300 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isSortDropdownOpen && (
            <div className="absolute z-10 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1" role="menu" aria-orientation="vertical">
                {sortOptions.map(option => (
                  <button
                    key={option.value}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 flex items-center gap-2"
                    onClick={() => selectSort(option.value)}
                    role="menuitem"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      
        <div className="relative">
          <button
            className="flex items-center justify-between gap-2 px-4 py-3 w-48 rounded-lg border border-slate-200 bg-white text-gray-700 hover:bg-slate-50 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-900"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            aria-haspopup="true"
            aria-expanded={isCategoryDropdownOpen}
          >
            <div className="flex items-center gap-2">
              {categoryFilter === 'best' && (
                <Award className="text-yellow-500" size={20} />
              )}
              {categoryFilter === 'bookmarks' && (
                <Bookmark className="text-blue-500" size={20} />
              )}
              {categoryFilter !== 'all' && categoryFilter !== 'best' && categoryFilter !== 'bookmarks' && (
                getCategoryIcon(categoryFilter)
              )}
              <span>{getCurrentCategoryDisplay()}</span>
            </div>
            <ChevronDown size={18} className={`transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCategoryDropdownOpen && (
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
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 flex items-center gap-2"
                  onClick={() => selectCategory('bookmarks')}
                  role="menuitem"
                >
                  <Bookmark className="text-blue-500" size={18} />
                  Bookmarks
                  {bookmarksCount > 0 && (
                    <span className="ml-auto bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {bookmarksCount}
                    </span>
                  )}
                </button>
                <div className="border-t border-slate-200 my-1"></div>
                {categoryOptions.map(category => (
                  <button
                    key={category}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 flex items-center gap-2"
                    onClick={() => selectCategory(category)}
                    role="menuitem"
                  >
                    {getCategoryIcon(category)}
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            className="flex items-center justify-between gap-2 px-4 py-3 w-48 rounded-lg border border-slate-200 bg-white text-gray-700 hover:bg-slate-50 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-900"
            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
            aria-haspopup="true"
            aria-expanded={isTypeDropdownOpen}
          >
            <div className="flex items-center gap-2">
              {typeFilter !== 'all' && getTypeIcon(typeFilter)}
              <span>{getCurrentTypeDisplay()}</span>
            </div>
            <ChevronDown size={18} className={`transition-transform duration-300 ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isTypeDropdownOpen && (
            <div className="absolute z-10 mt-1 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 flex items-center gap-2"
                  onClick={() => selectType('all')}
                  role="menuitem"
                >
                  All Types
                </button>
                <div className="border-t border-slate-200 my-1"></div>
                {typeOptions.map(type => (
                  <button
                    key={type}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 flex items-center gap-2"
                    onClick={() => selectType(type)}
                    role="menuitem"
                  >
                    {getTypeIcon(type)}
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
    </div>

      {filteredStudies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudies.map((study) => (
            <StudyCard
              key={study.id.toString()} // Convert ObjectId to string for the key
              study={study}
              setStudies={setStudies}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 bg-white/90 backdrop-blur-sm rounded-lg shadow-md m-auto flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            No studies found
          </h3>
          <p className="text-gray-600 mb-6">
            {categoryFilter === 'best'
              ? "No best research studies match your search criteria"
              : categoryFilter === 'bookmarks'
                ? "You haven't bookmarked any studies yet"
                : categoryFilter !== 'all' || typeFilter !== 'all'
                  ? `No studies found with the current filters`
                  : "Try adjusting your search query or explore different filters"}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setTypeFilter('all');
            }}
            className="cursor-pointer font-semibold px-6 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors flex items-center gap-2"
          >
            <Filter size={18} />
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
}