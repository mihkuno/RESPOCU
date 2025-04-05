"use client";

import { addBookmark } from '@/actions/study';
import { removeBookmark } from '@/actions/study';
import { storeArchive } from '@/actions/study';
import { restoreArchive } from '@/actions/study';
import { deleteStudy } from '@/actions/study';
import { markBestPaper } from '@/actions/study';
import { unmarkBestPaper } from '@/actions/study';

import React from 'react';
import { 
  Bookmark, 
  BookmarkMinus, 
  Archive, 
  ArchiveRestore,
  Trash,
  Edit, 
  Award, 
  Star,
  Calendar,
  User,
  Users
} from 'lucide-react';
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

interface StudyCardProps {
  study: Study;
  setStudies: React.Dispatch<React.SetStateAction<Study[]>>;
  isAdmin: boolean;
}

export default function StudyCard({ study, setStudies }: StudyCardProps) { 

  const { profile } = useProfile();
  const { email, isAdmin } = profile;

  const onToggleBookmark = async (studyId: string) => {
    setStudies((prevStudies) => {
      return prevStudies.map((s: Study) => {
        if (s.id === studyId) {
          return { ...s, isBookmarked: !s.isBookmarked };
        }
        return s;
      });
    });

    // Toggle bookmark in the database
    if (study.isBookmarked) {
      await removeBookmark(studyId, email);
    } else {
      await addBookmark(studyId, email);
    }
  }
  
  const onArchive = async (studyId: string) => {
    setStudies((prevStudies) => {
      return prevStudies.map((s: Study) => {
        if (s.id === studyId) {
          return { ...s, isArchived: !s.isArchived };
        }
        return s;
      });
    });

    // Toggle archive in the database
    if (study.isArchived) {
      await restoreArchive(studyId);
    } else {
      await storeArchive(studyId);
    }
  }

  const onDelete = async (studyId: string) => {
    setStudies((prevStudies) => {
      return prevStudies.filter((s: Study) => s.id !== studyId);
    });
    // Delete study from the database
    await deleteStudy(studyId);
  }

  const onMarkBestPaper = async (studyId: string, status: boolean) => {
    setStudies((prevStudies) => {
      return prevStudies.map((s: Study) => {
        if (s.id === studyId) {
          return { ...s, isBestPaper: status };
        }
        return s;
      });
    });
    // Toggle best paper status in the database
    if (study.isBestPaper) {
      await unmarkBestPaper(studyId);
    }
    else {
      await markBestPaper(studyId);
    }
  }
  
  const onEdit = async (studyId: string) => {
    // Implement edit functionality here
  }

  const onClick = async (studyId: string) => {
    // Implement click functionality here
  };

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
      onClick={() => onClick(study.id)}
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
            <span>{study.authors.join(', ')}</span>
          </div>
          
          <div className="flex items-center">
            <User size={16} className="mr-2 text-gray-400" />
            <span className="font-medium mr-1">Published by:</span>
            <span>{study.publishedBy}</span>
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
                  title={study.isBookmarked ? "Remove bookmark" : "Bookmark"}
                  aria-label={study.isBookmarked ? "Remove bookmark" : "Bookmark this study"}
                >
                  {study.isBookmarked ? (
                    <BookmarkMinus className="text-red-600" size={18} />
                  ) : (
                    <Bookmark className="text-gray-600" size={18} />
                  )}
                </button>
              </>
            )}

            {!study.isArchived && isAdmin && (
              <>
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

            {study.isArchived && (
              <>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onArchive) onArchive(study.id);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Restore Study"
                  aria-label="Archive study"
                >
                  <ArchiveRestore className="text-gray-600" size={18} />
                </button>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (onDelete) onDelete(study.id);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Delete Permanently"
                aria-label="Archive study"
              >
                <Trash className="text-gray-600" size={18} />
              </button>
              </>
            )}
            
            {isAdmin && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (onMarkBestPaper) onMarkBestPaper(study.id, !study.isBestPaper);
                }}
                className={`p-2 hover:bg-amber-100 rounded-full transition-colors ${study.isBestPaper ? 'bg-amber-100' : ''}`}
                title={study.isBestPaper ? "Remove best paper mark" : "Mark as best paper"}
                aria-label={study.isBestPaper ? "Remove best paper mark" : "Mark as best paper"}
              >
                <Star className={study.isBestPaper ? "text-amber-500" : "text-gray-600"} size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};