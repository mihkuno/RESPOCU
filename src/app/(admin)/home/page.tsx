"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, BookOpen } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Sample study data
  const studies = [
    {
      id: 1,
      title: "The Impact of Social Media on Academic Performance",
      description: "A quantitative study examining the correlation between social media usage and GPA among senior high students.",
      type: "Quantitative Research",
      publishedDate: "2023-05-15",
      authors: ["Maria Santos", "Juan Dela Cruz"],
      tags: ["Education", "Social Media", "Academic Performance"]
    },
    {
      id: 2,
      title: "Effects of Sleep Deprivation on Cognitive Functions",
      description: "Experimental research measuring the effects of different sleep durations on memory retention.",
      type: "Experimental Study",
      publishedDate: "2023-03-22",
      authors: ["Robert Johnson", "Sarah Chen"],
      tags: ["Neuroscience", "Sleep", "Cognitive Research"]
    },
    {
      id: 3,
      title: "Cultural Influences on Learning Styles",
      description: "Qualitative analysis of how cultural background affects preferred learning methods.",
      type: "Qualitative Research",
      publishedDate: "2023-07-10",
      authors: ["Amina Mohammed", "James Wilson"],
      tags: ["Cultural Studies", "Education", "Learning Methodology"]
    },
  ];

  // Memoized filtered and sorted studies
  const filteredStudies = useMemo(() => {
    return studies
      .filter(study => 
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        study.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        if (sortBy === 'oldest') return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
        return a.title.localeCompare(b.title);
      });
  }, [searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <img 
              src="/logo.png" 
              alt="Capitol University Logo" 
              className="w-16 h-16 object-contain" 
            />
            <h1 className="text-3xl font-extrabold text-slate-800">
              Research Repository
            </h1>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search studies, authors, tags..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                  transition-all duration-300 ease-in-out"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search 
                className="absolute left-3 top-3.5 text-slate-400" 
                size={20} 
              />
            </div>
            
            <select
              className="pl-4 pr-10 py-3 rounded-xl border border-slate-200 
                bg-white appearance-none focus:outline-none 
                focus:ring-2 focus:ring-blue-500 
                transition-all duration-300 ease-in-out"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </header>

        {/* Studies Grid */}
        {filteredStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((study) => (
              <div 
                key={study.id} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl 
                  transition-all duration-300 ease-in-out transform hover:-translate-y-2 
                  border border-slate-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-slate-800 line-clamp-2">
                      {study.title}
                    </h2>
                    <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {study.type}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {study.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-slate-500">
                    <span>
                      Published: {new Date(study.publishedDate).toLocaleDateString()}
                    </span>
                    <Link href={`/studies/${study.id}`}>
                      <button 
                        className="flex items-center text-blue-600 hover:text-blue-800 
                          font-medium transition-colors duration-200 group"
                      >
                        View Details
                        <BookOpen 
                          className="ml-2 group-hover:translate-x-1 transition-transform" 
                          size={16} 
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-slate-700 mb-4">
              No studies found
            </h3>
            <p className="text-slate-500 mb-6">
              Try adjusting your search query or explore different filters
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg 
                hover:bg-blue-700 transition-colors"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}