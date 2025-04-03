"use client";

import React, { useState, useMemo } from 'react';
import { Search, ChevronsUpDown } from 'lucide-react';
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
  const [showBestResearch, setShowBestResearch] = useState<boolean>(false);
  const isAdmin = true;

  const studies: Study[] = [
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
      tags: ["Education", "Social Media"],
      keywords: ["Academic Performance", "Social Media", "Student GPA", "Research"],
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
      tags: ["Psychology", "Health"],
      keywords: ["Sleep", "Cognitive Function", "Memory", "Experimental"],
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
      tags: ["Education", "Culture"],
      keywords: ["Cultural Studies", "Learning Styles", "Qualitative"],
      isArchived: false,
      isBestPaper: false
    }
  ];

  const filteredStudies = useMemo(() => {
    return studies
      .filter(study =>
        (study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.authors.some(author => author.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        study.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        study.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))) &&
        (showBestResearch ? study.isBestPaper : true)
      )
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        if (sortBy === 'oldest') return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
        return a.title.localeCompare(b.title);
      });
  }, [searchQuery, sortBy, showBestResearch]);

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
    alert(`Mark study ${studyId} as best paper: ${status}`);
  };

  const handleCardClick = (studyId: number): void => {
    router.push(`/studies/${studyId}`);
  };

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
            <button
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300 ease-in-out ${showBestResearch ? 'bg-red-900 text-white border-red-900' : 'bg-white text-gray-700 border-slate-200'}`}
              onClick={() => setShowBestResearch(!showBestResearch)}
            >
              {showBestResearch ? 'Show All' : 'Show Best Research'}
            </button>
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
              {showBestResearch
                ? "No best research studies match your search criteria"
                : "Try adjusting your search query or explore different filters"}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                if (showBestResearch) setShowBestResearch(false);
              }}
              className="px-6 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}