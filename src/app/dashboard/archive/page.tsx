"use client";

import { useState } from 'react';
import { FiSearch, FiClock, FiArchive, FiRotateCw } from 'react-icons/fi';
import StudyCard from '@/app/dashboard/(components)/card';

interface ArchivedStudy {
  id: number;
  title: string;
  description: string;
  authors: { id: number; name: string; role: 'student' | 'faculty' }[];
  publishedDate: string;
  publishedBy: { id: number; name: string; role: 'faculty' };
  tags: string[];
  keywords: string[];
  isArchived: boolean;
  isBestPaper: boolean;
}

export default function ArchivePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudies, setSelectedStudies] = useState<number[]>([]);

  const archivedStudies: ArchivedStudy[] = [
    {
      id: 1,
      title: "Historical Analysis of Learning Methods",
      description: "A study examining the evolution of teaching techniques from 1950-2000",
      authors: [
        { id: 1, name: "Dr. Robert Johnson", role: 'faculty' },
        { id: 2, name: "Prof. Sarah Chen", role: 'student' }
      ],
      publishedDate: "2023-05-15",
      publishedBy: { id: 3, name: "Prof. Admin", role: 'faculty' },
      tags: ["history", "education"],
      keywords: ["learning", "methods", "evolution"],
      isArchived: true,
      isBestPaper: false,
    },
    {
      id: 2,
      title: "Early Computer Science Education",
      description: "Research on the first computer science programs in universities",
      authors: [
        { id: 4, name: "Dr. Alan Turing", role: 'faculty' },
        { id: 5, name: "Prof. Ada Lovelace", role: 'student' }
      ],
      publishedDate: "2023-04-22",
      publishedBy: { id: 6, name: "Prof. SysAdmin", role: 'faculty' },
      tags: ["computer science", "education"],
      keywords: ["early", "programs", "universities"],
      isArchived: true,
      isBestPaper: true,
    },
    {
      id: 3,
      title: "Traditional Assessment Methods",
      description: "Evaluation of paper-based testing effectiveness",
      authors: [
        { id: 7, name: "Dr. Maria Santos", role: 'faculty' },
        { id: 8, name: "Prof. Juan Dela Cruz", role: 'student' }
      ],
      publishedDate: "2023-03-10",
      publishedBy: { id: 9, name: "Prof. Admin", role: 'faculty' },
      tags: ["assessment", "education"],
      keywords: ["traditional", "paper-based", "effectiveness"],
      isArchived: true,
      isBestPaper: false,
    },
  ];

  const filteredStudies = archivedStudies.filter(study =>
    study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.authors.some(author => author.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleSelectStudy = (studyId: number) => {
    setSelectedStudies(prev =>
      prev.includes(studyId)
        ? prev.filter(id => id !== studyId)
        : [...prev, studyId]
    );
  };

  const restoreStudies = () => {
    console.log("Restoring studies:", selectedStudies);
    alert(`${selectedStudies.length} studies restored successfully!`);
    setSelectedStudies([]);
  };

  const deletePermanently = () => {
    if (confirm(`Permanently delete ${selectedStudies.length} studies? This action cannot be undone.`)) {
      console.log("Deleting studies:", selectedStudies);
      alert(`${selectedStudies.length} studies deleted permanently!`);
      setSelectedStudies([]);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FiArchive className="mr-2" /> Study Archive
        </h1>
        <div className="text-sm text-gray-500">
          {archivedStudies.length} archived studies
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search archived studies..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F36]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {selectedStudies.length > 0 && (
          <div className="flex gap-3">
            <button
              onClick={restoreStudies}
              className="flex items-center px-4 py-2 bg-[#292F36] text-white rounded-md hover:bg-[#1a1f24]"
            >
              <FiRotateCw className="mr-2" /> Restore
            </button>
            <button
              onClick={deletePermanently}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete Permanently
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudies.length > 0 ? (
          filteredStudies.map((study) => (
            <div
              key={study.id}
              className={selectedStudies.includes(study.id) ? "border-2 border-blue-500 rounded-xl" : ""}
            >
              <StudyCard
                study={study}
                isBookmarked={false}
                isAdmin={true}
                isDashboard={false}
                onToggleBookmark={() => { }}
                onArchive={() => { }}
                onDelete={() => { }}
                onEdit={() => { }}
                onMarkBestPaper={() => { }}
                onClick={() => toggleSelectStudy(study.id)}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-12 col-span-full">
            <div className="text-gray-400 mb-4">
              <FiArchive className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">
              {searchTerm ? "No matching studies found" : "No archived studies"}
            </h3>
            <p className="text-gray-500 mt-1">
              {searchTerm ? "Try a different search term" : "Studies you archive will appear here"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}