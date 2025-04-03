"use client";

import { useState } from 'react';
import { FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import StudyCard from '@/app/dashboard/(components)/card';

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
  category: string; // Added category field
}

export default function CreateStudyPage() {
  const [study, setStudy] = useState({
    title: '',
    description: '',
    authors: [] as string[],
    tags: [],
    isDraft: true,
    category: '', // Added category to the state
  });
  const [newAuthor, setNewAuthor] = useState('');
  const [newTag, setNewTag] = useState('');
  const [publishedStudies, setPublishedStudies] = useState<Study[]>([]); // State to store published studies

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStudy(prev => ({ ...prev, [name]: value }));
  };

  const addAuthor = () => {
    if (newAuthor.trim() && !study.authors.includes(newAuthor.trim())) {
      setStudy(prev => ({ ...prev, authors: [...prev.authors, newAuthor.trim()] }));
      setNewAuthor('');
    }
  };

  const removeAuthor = (authorToRemove: string) => {
    setStudy(prev => ({
      ...prev,
      authors: prev.authors.filter(author => author !== authorToRemove),
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !study.tags.includes(newTag.trim())) {
      setStudy(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setStudy(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend and get the new study with all properties
    const newStudy: Study = {
      id: Date.now(), // Generate a unique ID (replace with backend ID)
      title: study.title,
      description: study.description,
      type: 'Research', // Replace with actual type
      publishedDate: new Date().toISOString(),
      authors: study.authors.map((authorName, index) => ({
        id: index, // Replace with actual author IDs
        name: authorName,
        role: 'student', // Replace with actual role
      })),
      publishedBy: {
        id: 1, // Replace with actual publisher ID
        name: 'Faculty Member', // Replace with actual publisher name
        role: 'faculty', // Replace with actual role
      },
      tags: study.tags,
      keywords: [], // Replace with actual keywords
      isArchived: false,
      isBestPaper: false,
      category: study.category, // Added category to the new study object
    };

    setPublishedStudies(prev => [...prev, newStudy]); // Add the new study to the list
    alert('Study submitted successfully!');

    // Reset form after submission
    setStudy({
      title: '',
      description: '',
      authors: [],
      tags: [],
      isDraft: false,
      category: '', // Reset the category after submission
    });
  };

  const discardDraft = () => {
    if (confirm('Are you sure you want to discard this draft?')) {
      setStudy({
        title: '',
        description: '',
        authors: [],
        tags: [],
        isDraft: true,
        category: '',
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Study</h1>

      <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 rounded-lg shadow-md p-6">
        {/* Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Study Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={study.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#292F36]"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={study.description}
            onChange={handleInputChange}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#292F36]"
            required
          />
        </div>

        {/* Authors */}
        <div className="mb-6">
          <label htmlFor="authors" className="block text-sm font-medium text-gray-700 mb-2">
            Authors *
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              id="newAuthor"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              placeholder="Add author name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#292F36]"
            />
            <button
              type="button"
              onClick={addAuthor}
              className="bg-[#292F36] text-white px-4 py-2 rounded-r-md hover:bg-[#1a1f24] transition-colors"
            >
              <FiPlus className="h-5 w-5" />
            </button>
          </div>
          {study.authors.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {study.authors.map((author, index) => (
                <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                  <span className="text-sm">{author}</span>
                  <button
                    type="button"
                    onClick={() => removeAuthor(author)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              id="newTag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add tag"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#292F36]"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-[#292F36] text-white px-4 py-2 rounded-r-md hover:bg-[#1a1f24] transition-colors"
            >
              <FiPlus className="h-5 w-5" />
            </button>
          </div>
          {study.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag, index) => (
                <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                  <span className="text-sm">{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={study.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#292F36]"
            required
          >
            <option value="">Select Category</option>
            <option value="Education">Education</option>
            <option value="Environment">Environment</option>
            <option value="Technology">Technology</option>
            <option value="Medicine">Health</option>
            <option value="Sociology">Social</option>
            <option value="History">History</option>
          </select>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={discardDraft}
            className="flex items-center text-red-500 hover:text-red-700"
          >
            <FiTrash2 className="h-5 w-5 mr-2" />
            Discard Draft
          </button>
          <div className="space-x-4">
            <button
              type="button"
              onClick={() => setStudy(prev => ({ ...prev, isDraft: true }))}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#292F36] text-white rounded-md hover:bg-[#1a1f24]"
            >
              Publish Study
            </button>
          </div>
        </div>
      </form>

      {/* Display Published Studies */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Published Studies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {publishedStudies.map(study => (
            <StudyCard
              key={study.id}
              study={study}
              isBookmarked={false}
              isAdmin={false}
              isDashboard={false}
              onToggleBookmark={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}