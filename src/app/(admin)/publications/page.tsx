"use client";

import { useState } from 'react';
import { FiTrash2, FiPlus, FiX } from 'react-icons/fi';

export default function CreateStudyPage() {
  const [study, setStudy] = useState({
    title: '',
    description: '',
    authors: [] as string[],
    tags: [] as string[],
    isDraft: true
  });
  const [newAuthor, setNewAuthor] = useState('');
  const [newTag, setNewTag] = useState('');

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
      authors: prev.authors.filter(author => author !== authorToRemove)
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
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Submitting study:', study);
    alert('Study submitted successfully!');
    // Reset form after submission
    setStudy({
      title: '',
      description: '',
      authors: [],
      tags: [],
      isDraft: false
    });
  };

  const discardDraft = () => {
    if (confirm('Are you sure you want to discard this draft?')) {
      setStudy({
        title: '',
        description: '',
        authors: [],
        tags: [],
        isDraft: true
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
    </div>
  );
}