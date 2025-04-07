"use client";

import { useState, useMemo } from 'react';
import { FiArchive, FiRotateCw, FiTrash } from 'react-icons/fi';
import { Search } from 'lucide-react';
import StudyCard from '@/app/dashboard/(components)/card';

interface ArchivedStudy {
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

export default function Archive({ archivedStudies = []}: { archivedStudies: ArchivedStudy[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudies, setSelectedStudies] = useState<string[]>([]);

const filteredStudies = useMemo(() => {
    return archivedStudies
      .filter(study => {
        const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          study.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          study.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
          study.categories.some(category => category.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesSearch;
      })

  }, [searchTerm]);


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
    <>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search archived studies..."
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F36]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="text-sm text-gray-500">
          {archivedStudies.length} archived studies
        </div>

        {selectedStudies.length > 0 && (
          <div className="flex gap-3">
            <button
              onClick={restoreStudies}
              className="cursor-pointer font-semibold flex items-center px-4 py-2 bg-[#292F36] text-white rounded-md hover:bg-[#1a1f24]"
            >
              <FiRotateCw className="mr-2" /> Restore
            </button>
            <button
              onClick={deletePermanently}
              className="cursor-pointer font-semibold flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <FiTrash className="mr-2" />
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
                isAdmin={true}
                setStudies={() => {}}
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
    </>
  );
}