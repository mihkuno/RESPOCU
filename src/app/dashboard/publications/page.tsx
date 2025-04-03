"use client";

import { useState } from 'react';
import { FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import { 
  FiUsers, 
  FiBarChart2, 
  FiActivity, 
  FiFileText, 
  FiGitBranch, 
  FiTrendingUp, 
  FiBriefcase, 
  FiClock, 
  FiGlobe, 
  FiGrid, 
  FiCode 
} from 'react-icons/fi';
import { 
  FiHeart, 
  FiCloud, 
  FiCpu, 
  FiDollarSign, 
  FiBookOpen, 
  FiUsers as FiUsersAlt, 
  FiCompass 
} from 'react-icons/fi';
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
  categories: string[]; // Renamed tags to categories
  isArchived: boolean;
  isBestPaper: boolean;
}

// Research types with icons
const researchTypes = [
  { value: "Qualitative Research", icon: <FiUsers className="mr-2" /> },
  { value: "Quantitative Research", icon: <FiBarChart2 className="mr-2" /> },
  { value: "Experimental Research", icon: <FiActivity className="mr-2" /> },
  { value: "Descriptive Research", icon: <FiFileText className="mr-2" /> },
  { value: "Correlational Research", icon: <FiGitBranch className="mr-2" /> },
  { value: "Action Research", icon: <FiTrendingUp className="mr-2" /> },
  { value: "Case Study Research", icon: <FiBriefcase className="mr-2" /> },
  { value: "Longitudinal Research", icon: <FiClock className="mr-2" /> },
  { value: "Ethnographic Research", icon: <FiGlobe className="mr-2" /> },
  { value: "Mixed-Methods Research", icon: <FiGrid className="mr-2" /> },
  { value: "Developmental Research", icon: <FiCode className="mr-2" /> }
];

// Categories with icons (formerly tags)
const availableCategories = [
  { value: "Health & Wellness", icon: <FiHeart className="mr-2" /> },
  { value: "Environment & Sustainability", icon: <FiCloud className="mr-2" /> },
  { value: "Technology & Innovation", icon: <FiCpu className="mr-2" /> },
  { value: "Economics & Development", icon: <FiDollarSign className="mr-2" /> },
  { value: "Education & Learning", icon: <FiBookOpen className="mr-2" /> },
  { value: "Sociology & Society", icon: <FiUsersAlt className="mr-2" /> },
  { value: "Astronomy & Exploration", icon: <FiCompass className="mr-2" /> }
];

export default function CreateStudyPage() {
  const [study, setStudy] = useState({
    title: '',
    description: '',
    authors: [] as string[],
    type: '', // Changed to single type selection
    categories: [] as string[], // Renamed tags to categories
    isDraft: true,
  });
  const [newAuthor, setNewAuthor] = useState('');
  const [publishedStudies, setPublishedStudies] = useState<Study[]>([]); // State to store published studies

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStudy(prev => ({ ...prev, [name]: value }));
  };

  const handleCategorySelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    if (selectedCategory && !study.categories.includes(selectedCategory)) {
      setStudy(prev => ({ ...prev, categories: [...prev.categories, selectedCategory] }));
    }
    // Reset the select value
    e.target.value = "";
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

  const removeCategory = (categoryToRemove: string) => {
    setStudy(prev => ({
      ...prev,
      categories: prev.categories.filter(category => category !== categoryToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend and get the new study with all properties
    const newStudy: Study = {
      id: Date.now(), // Generate a unique ID (replace with backend ID)
      title: study.title,
      description: study.description,
      type: study.type,
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
      categories: study.categories, // Renamed tags to categories
      isArchived: false,
      isBestPaper: false,
    };

    setPublishedStudies(prev => [...prev, newStudy]); // Add the new study to the list
    alert('Study submitted successfully!');

    // Reset form after submission
    setStudy({
      title: '',
      description: '',
      authors: [],
      type: '',
      categories: [], // Renamed tags to categories
      isDraft: false,
    });
  };

  const discardDraft = () => {
    if (confirm('Are you sure you want to discard this draft?')) {
      setStudy({
        title: '',
        description: '',
        authors: [],
        type: '',
        categories: [], // Renamed tags to categories
        isDraft: true,
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

        {/* Type - Changed to Select with Icons */}
        <div className="mb-6">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
            Research Type *
          </label>
          <select
            id="type"
            name="type"
            value={study.type}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#292F36]"
            required
          >
            <option value="">Select Research Type</option>
            {researchTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.value}
              </option>
            ))}
          </select>
          {/* Display selected type with icon */}
          {study.type && (
            <div className="mt-2 bg-gray-100 px-3 py-2 rounded-md inline-flex items-center">
              {researchTypes.find(t => t.value === study.type)?.icon}
              <span>{study.type}</span>
            </div>
          )}
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

        {/* Categories - Changed to Select with Icons */}
        <div className="mb-6">
          <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-2">
            Categories
          </label>
          <select
            id="categories"
            name="categories"
            value=""
            onChange={handleCategorySelection}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#292F36]"
          >
            <option value="">Select Categories</option>
            {availableCategories
              .filter(category => !study.categories.includes(category.value))
              .map((category) => (
                <option key={category.value} value={category.value}>
                  {category.value}
                </option>
              ))}
          </select>
          
          {study.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {study.categories.map((category, index) => {
                const categoryObj = availableCategories.find(c => c.value === category);
                return (
                  <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                    {categoryObj?.icon}
                    <span className="text-sm">{category}</span>
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={discardDraft}
            className="flex items-center text-red-500 hover:text-red-700 font-semibold cursor-pointer"
          >
            <FiTrash2 className="h-5 w-5 mr-2" />
            Discard Draft
          </button>
          <div className="space-x-4">
            <button
              type="button"
              onClick={() => setStudy(prev => ({ ...prev, isDraft: true }))}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-semibold cursor-pointer"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#292F36] text-white rounded-md hover:bg-[#1a1f24] font-semibold cursor-pointer"
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