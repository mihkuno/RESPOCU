"use client";

import React from 'react';
import { 
  Bookmark, 
  BookmarkMinus, 
  Archive, 
  Edit, 
  Award, 
  Star,
  Calendar,
  User,
  Users
} from 'lucide-react';

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
  categories: string[]; // Renamed 'tags' to 'categories'
  isArchived: boolean;
  isBestPaper: boolean;
}

interface StudyCardProps {
  study: Study;
  isBookmarked: boolean;
  isAdmin: boolean;
  isDashboard: boolean;
  onToggleBookmark: (studyId: number) => void;
  onArchive?: (studyId: number) => void;
  onDelete?: (studyId: number) => void;
  onEdit?: (studyId: number) => void;
  onMarkBestPaper?: (studyId: number, status: boolean) => void;
  onClick?: (studyId: number) => void;
}

const StudyCard: React.FC<StudyCardProps> = ({ 
  study, 
  isBookmarked = false,
  isAdmin = false,
  isDashboard = false,
  onToggleBookmark,
  onArchive,
  onDelete,
  onEdit,
  onMarkBestPaper,
  onClick
}) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick(study.id);
    }
  };

  const studentAuthors = study.authors.filter(author => author.role === 'student');
  const facultyPublisher = study.publishedBy;
  const formattedDate = new Date(study.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const colors = study.isBestPaper 
    ? {
        border: 'border-amber-300',
        bg: 'bg-amber-50',
        highlight: 'bg-amber-400',
        text: 'text-amber-900',
        secondary: 'text-amber-700',
        badgeBg: 'bg-amber-100',
        badgeText: 'text-amber-800',
      }
    : {
        border: 'border-gray-200',
        bg: 'bg-white',
        highlight: 'bg-red-800',
        text: 'text-gray-900',
        secondary: 'text-gray-700',
        badgeBg: 'bg-blue-50',
        badgeText: 'text-blue-700',
      };

  return (
    <div 
      className={`${colors.bg} rounded-xl shadow-lg hover:shadow-xl
        transition-all duration-300 ease-in-out transform hover:-translate-y-1 
        border ${colors.border} overflow-hidden cursor-pointer relative
        flex flex-col h-full`}
      onClick={handleCardClick}
      aria-label={`Study: ${study.title}`}
      role="article"
    >
      {/* Top highlight bar */}
      <div className={`h-1.5 ${colors.highlight} w-full`}></div>
      
      {/* Best paper corner ribbon */}
      {study.isBestPaper && (
        <div className="absolute -right-12 top-6 rotate-45 bg-amber-500 text-white py-1 px-12 text-xs font-bold shadow-md z-10">
          BEST PAPER
        </div>
      )}
      
      <div className="p-5 flex flex-col h-full">
        {/* Header with type badge */}
        <div className="flex items-start justify-between mb-4">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colors.badgeBg} ${colors.badgeText}`}>
            {study.type}
          </span>
          
          {study.isBestPaper && (
            <Award size={22} className="text-amber-500" aria-label="Best Research Award" />
          )}
        </div>
        
        {/* Title */}
        <h2 className={`text-xl font-bold mb-3 line-clamp-2 ${colors.text}`}>
          {study.title}
        </h2>
        
        {/* Description */}
        <p className={`${colors.secondary} mb-4 line-clamp-3 text-sm`}>
          {study.description}
        </p>
        
        
        {/* Categories */}
        {study.categories.length > 0 && (
          <div className="mb-4">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {study.categories.map((category, index) => (
                <span
                  key={`category-${index}`}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="my-4 border-t border-gray-200"></div>
        
        {/* Authors section */}
        <div className="text-sm text-gray-600 space-y-2 mt-auto">
          <div className="flex items-center">
            <Users size={16} className="mr-2 text-gray-400" />
            <span className="font-medium mr-1">Authors:</span>
            <span>{studentAuthors.map(author => author.name).join(', ')}</span>
          </div>
          
          <div className="flex items-center">
            <User size={16} className="mr-2 text-gray-400" />
            <span className="font-medium mr-1">Published by:</span>
            <span>{facultyPublisher.name}</span>
          </div>
          
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-gray-400" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end items-center mt-4 pt-3 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-1">
            
            {!study.isArchived && (
              <>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(study.id);
                  }}
                  className={`p-2 hover:bg-gray-100 rounded-full transition-colors`}
                  title={isBookmarked ? "Remove bookmark" : "Bookmark"}
                  aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this study"}
                >
                  {isBookmarked ? (
                    <BookmarkMinus className="text-red-600" size={18} />
                  ) : (
                    <Bookmark className="text-gray-600" size={18} />
                  )}
                </button>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onArchive) onArchive(study.id);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Archive"
                  aria-label="Archive study"
                >
                  <Archive className="text-gray-600" size={18} />
                </button>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onEdit) onEdit(study.id);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Edit"
                  aria-label="Edit study"
                >
                  <Edit className="text-gray-600" size={18} />
                </button>
              </>
            )}
            
            {isAdmin && isDashboard && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (onMarkBestPaper) onMarkBestPaper(study.id, !study.isBestPaper);
                }}
                className={`p-2 hover:bg-amber-100 rounded-full transition-colors ${study.isBestPaper ? 'bg-amber-100' : ''}`}
                title={study.isBestPaper ? "Remove best paper mark" : "Mark as best paper"}
                aria-label={study.isBestPaper ? "Remove best paper mark" : "Mark as best paper"}
              >
                <Star className={study.isBestPaper ? "text-amber-500" : "text-gray-400"} size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyCard;