"use client";

import { useState } from 'react';
import { FiSearch, FiClock, FiArchive, FiTrash2, FiRotateCw } from 'react-icons/fi';

interface ArchivedStudy {
  id: string;
  title: string;
  description: string;
  authors: string[];
  archivedDate: string;
  archivedBy: string;
}

export default function ArchivePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudies, setSelectedStudies] = useState<string[]>([]);

  const archivedStudies: ArchivedStudy[] = [
    {
      id: '1',
      title: "Historical Analysis of Learning Methods",
      description: "A study examining the evolution of teaching techniques from 1950-2000",
      authors: ["Dr. Robert Johnson", "Prof. Sarah Chen"],
      archivedDate: "2023-05-15",
      archivedBy: "admin@capitol.edu"
    },
    {
      id: '2',
      title: "Early Computer Science Education",
      description: "Research on the first computer science programs in universities",
      authors: ["Dr. Alan Turing", "Prof. Ada Lovelace"],
      archivedDate: "2023-04-22",
      archivedBy: "admin@capitol.edu"
    },
    {
      id: '3',
      title: "Traditional Assessment Methods",
      description: "Evaluation of paper-based testing effectiveness",
      authors: ["Dr. Maria Santos", "Prof. Juan Dela Cruz"],
      archivedDate: "2023-03-10",
      archivedBy: "sysadmin@capitol.edu"
    },
  ];

  const filteredStudies = archivedStudies.filter(study =>
    study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    study.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleSelectStudy = (studyId: string) => {
    setSelectedStudies(prev =>
      prev.includes(studyId)
        ? prev.filter(id => id !== studyId)
        : [...prev, studyId]
    );
  };

  const restoreStudies = () => {
    // Implement restore functionality
    console.log("Restoring studies:", selectedStudies);
    alert(`${selectedStudies.length} studies restored successfully!`);
    setSelectedStudies([]);
  };

  const deletePermanently = () => {
    if (confirm(`Permanently delete ${selectedStudies.length} studies? This action cannot be undone.`)) {
      // Implement delete functionality
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

      {/* Search and Bulk Actions */}
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
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <FiTrash2 className="mr-2" /> Delete Permanently
            </button>
          </div>
        )}
      </div>

      {/* Archived Studies List */}
      <div className="bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden">
        {filteredStudies.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredStudies.map((study) => (
              <li key={study.id} className="hover:bg-gray-50">
                <div className="px-6 py-4 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedStudies.includes(study.id)}
                    onChange={() => toggleSelectStudy(study.id)}
                    className="h-4 w-4 text-[#292F36] focus:ring-[#292F36] border-gray-300 rounded mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-800">{study.title}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiClock className="mr-1" />
                        {new Date(study.archivedDate).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-1">{study.description}</p>
                    <div className="mt-2">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Authors:</span> {study.authors.join(", ")}
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Archived by:</span> {study.archivedBy}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
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