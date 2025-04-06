"use client";

import { useState, useRef } from 'react';
import { FiTrash2, FiPlus, FiX, FiUpload } from 'react-icons/fi';
import StudyCard from '@/app/dashboard/(components)/card';
import { Search, ChevronsUpDown, Award, Filter, Bookmark, ChevronDown, TestTube, Book, FileText, FileSpreadsheet, LineChart, Users, FlaskConical, BookOpen, Clock, Globe, Layers, Settings, Heart, Leaf, Cpu, DollarSign, GraduationCap, UserRound, Rocket, FileMinus2, Edit, Save, FileUp, Paperclip, AlertTriangle, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useProfile } from '@/providers/profileContext';

import Modal, { ModalType } from '@/app/dashboard/(components)/modal';

interface StudyFile {
  name: string;
  size: number;
  type: string;
  data: Buffer;
  last_modified: number;
}

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
// Research types with icons
const researchTypes = [
  { value: "Capstone Research", icon: <FileMinus2 size={18} className="mr-2" /> },
  { value: "Qualitative Research", icon: <Users size={18} className="mr-2" /> },
  { value: "Quantitative Research", icon: <FileSpreadsheet size={18} className="mr-2" /> },
  { value: "Experimental Research", icon: <TestTube size={18} className="mr-2" /> },
  { value: "Descriptive Research", icon: <FileText size={18} className="mr-2" /> },
  { value: "Correlational Research", icon: <LineChart size={18} className="mr-2" /> },
  { value: "Action Research", icon: <Settings size={18} className="mr-2" /> },
  { value: "Case Study Research", icon: <BookOpen size={18} className="mr-2" /> },
  { value: "Longitudinal Research", icon: <Clock size={18} className="mr-2" /> },
  { value: "Ethnographic Research", icon: <Globe size={18} className="mr-2" /> },
  { value: "Mixed-Methods Research", icon: <Layers size={18} className="mr-2" /> },
  { value: "Developmental Research", icon: <FlaskConical size={18} className="mr-2" /> }
];

// Categories with icons
const availableCategories = [
  { value: "Health & Wellness", icon: <Heart size={18} className="mr-2" /> },
  { value: "Environment & Sustainability", icon: <Leaf size={18} className="mr-2" /> },
  { value: "Technology & Innovation", icon: <Cpu size={18} className="mr-2" /> },
  { value: "Economics & Development", icon: <DollarSign size={18} className="mr-2" /> },
  { value: "Education & Learning", icon: <GraduationCap size={18} className="mr-2" /> },
  { value: "Sociology & Society", icon: <UserRound size={18} className="mr-2" /> },
  { value: "Astronomy & Exploration", icon: <Rocket size={18} className="mr-2" /> }
];

// File constraints
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const ALLOWED_FILE_TYPES = ['application/pdf'];

export default function Publications(
  { 
    studyDataToEdit,
    studyFileToEdit,
    publishAction, 
    studies 
  }:
  { 
    studyDataToEdit?: Study,
    studyFileToEdit?: StudyFile,
    publishAction: (formData: FormData) => Promise<string>,
    studies: Study[]
  }) {

  const [study, setStudy] = useState<Study>(studyDataToEdit || {
    id: '',
    title: '',
    description: '',
    authors: [] as string[],
    type: '',
    categories: [] as string[],
    publishedDate: '',
    publishedBy: '',
    isArchived: false,
    isBestPaper: false,
    isBookmarked: false
  });

  const [newAuthor, setNewAuthor] = useState('');
  const [isEditing, setIsEditing] = useState(study.id ? true : false);
  const [uploadedFile, setUploadedFile] = useState<StudyFile | null>(studyFileToEdit || null); // Changed to single file
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [publishedStudies, setPublishedStudies] = useState<Study[]>(studies);
  const { profile } = useProfile();
  const { isAdmin } = profile;

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: ModalType;
    title: string;
    message: string | string[];
  }>({
    isOpen: false,
    type: 'validation',
    title: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStudy(prev => ({ ...prev, [name]: value }));
  };

  const handleCategorySelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    if (selectedCategory && !study.categories.includes(selectedCategory)) {
      setStudy(prev => ({ ...prev, categories: [...prev.categories, selectedCategory] }));
    }
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

  // Validate form before submission
  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!study.title.trim()) {
      errors.push("Study title is required");
    }
    
    if (!study.description.trim()) {
      errors.push("Description is required");
    }
    
    if (!study.type) {
      errors.push("Research type is required");
    }
    
    if (study.authors.length === 0) {
      errors.push("At least one author is required");
    }

    if (study.categories.length === 0) {
      errors.push("At least one category is required");
    }

    if (!uploadedFile) {
      errors.push("A PDF file is required");
    }

    return errors;
  };

  const handleSubmitAttempt = (e: React.FormEvent) => {

    e.preventDefault();
    
    const errors: string[] = validateForm();

    // First validate the form
    if (errors.length !== 0) {
      // Show validation errors modal
      setModalState({
        isOpen: true,
        type: 'validation',
        title: 'Form Validation Failed',
        message: errors
      });
      return;
    }
    
    // If validation passes, show confirmation modal
    setModalState({
      isOpen: true,
      type: 'confirmation',
      title: isEditing ? 'Confirm Study Update' : 'Confirm Study Publication',
      message: isEditing 
        ? "Are you sure you want to update this study? This action cannot be undone."
        : "Are you sure you want to publish this study?"
    });
  };

  const handleConfirmSubmit = async () => {
    // Close modal
    setModalState(prev => ({ ...prev, isOpen: false }));

    const formData = new FormData();
    formData.append('id', study.id);
    formData.append('title', study.title);
    formData.append('description', study.description);
    formData.append('research_type', study.type);
    formData.append('categories', JSON.stringify(study.categories));
    formData.append('authors', JSON.stringify(study.authors));
    formData.append('file', JSON.stringify(uploadedFile));

    // Show success modal
    setModalState({
      isOpen: true,
      type: 'success',
      title: 'Study Published',
      message: 'Your study was published successfully!'
    });

    const id = await publishAction(formData);

    // add the study to the published studies
    setPublishedStudies(
      prev => [
        ...prev, 
        { ...study, 
          id, publishedBy: profile.email, publishedDate: new Date().toISOString() }
      ]);

    // Reset form after submission
    resetForm();

    };

  const handleModalClose = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const resetForm = () => {
    setStudy({
      id: '',
      title: '',
      description: '',
      authors: [],
      type: '',
      categories: [],
      publishedDate: '',
      publishedBy: '',
      isArchived: false,
      isBestPaper: false,
      isBookmarked: false,
    });
    setUploadedFile(null); // Reset to null
    setFileError(null);
    setIsEditing(false);
  };

  const discardDraft = () => {
    setModalState({
      isOpen: true,
      type: 'confirmation',
      title: `Discard ${isEditing ? 'Edit' : 'Draft'}?`,
      message: `Are you sure you want to discard this ${isEditing ? 'edit' : 'draft'}? This action cannot be undone.`
    });
  };

  const handleConfirmDiscard = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    resetForm();
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileError(`Only PDF files are accepted. "${file.name}" is not a PDF file.`);
      return false;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File size exceeds 10MB limit. "${file.name}" is ${formatFileSize(file.size)}.`);
      return false;
    }

    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; // Get the first file

      // Validate the file
      if (validateFile(file)) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer); // Convert the ArrayBuffer to a Node.js Buffer
        
        const studyData: StudyFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          data: buffer,
          last_modified: file.lastModified,
        };

        setUploadedFile(studyData); // Set the single uploaded file
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setFileError(null);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];  // Get the first file

      // Validate the file
      if (validateFile(file)) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer); // Convert the ArrayBuffer to a Node.js Buffer
        
        const studyData: StudyFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          data: buffer,
          last_modified: file.lastModified,
        };

        setUploadedFile(studyData); // Set the single uploaded file
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Helper function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <>
      {/* Custom Modal */}
      <Modal 
        isOpen={modalState.isOpen}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
        onConfirm={
          modalState.type === 'confirmation' 
            ? (modalState.title.includes('Discard') ? handleConfirmDiscard : handleConfirmSubmit)
            : handleModalClose
        }
        onCancel={handleModalClose}
      />

      <form onSubmit={handleSubmitAttempt} className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#292F36] flex items-center">
            {isEditing ? (
              <>
                <Edit size={22} className="mr-2" />
                Edit Study
              </>
            ) : (
              <>
                <Rocket size={22} className="mr-2" />
                Create New Study
              </>
            )}
          </h2>

          {/* Display ID when editing */}
          {isEditing && study.id && (
            <div className="bg-gray-100 px-4 py-2 rounded-md flex items-center">
              <span className="text-sm font-medium text-gray-500 mr-1">ID:</span>
              <span className="text-sm font-mono">{study.id}</span>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Study Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={study.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F36] focus:border-transparent transition-all duration-200"
              placeholder="Enter the title of your research study"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={study.description}
              onChange={handleInputChange}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F36] focus:border-transparent transition-all duration-200"
              placeholder="Provide a detailed description of your research study"
            />
          </div>

          {/* Type - Select with Icons */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Research Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="type"
                name="type"
                value={study.type}
                onChange={handleInputChange}
                className="cursor-pointer w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F36] focus:border-transparent appearance-none transition-all duration-200"
              >
                <option value="">Select Research Type</option>
                {researchTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.value}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={20} />
            </div>

            {/* Display selected type with icon */}
            {study.type && (
              <div className="mt-3 bg-gray-50 px-4 py-3 rounded-lg inline-flex items-center border border-gray-200">
                {researchTypes.find(t => t.value === study.type)?.icon}
                <span className="font-medium">{study.type}</span>
              </div>
            )}
          </div>

          {/* Authors */}
          <div>
            <label htmlFor="authors" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Authors <span className="text-red-500">*</span>
            </label>
            <div className="flex mb-3">
              <input
                type="text"
                id="newAuthor"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="Add author name"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#292F36] focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onClick={addAuthor}
                className="cursor-pointer bg-[#292F36] text-white px-5 py-3 rounded-r-lg hover:bg-[#1a1f24] transition-colors flex items-center justify-center"
              >
                <FiPlus className="h-5 w-5" />
              </button>
            </div>
            {study.authors.length > 0 ? (
              <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                {study.authors.map((author, index) => (
                  <div key={index} className="bg-white px-3 py-2 rounded-full flex items-center shadow-sm border border-gray-100">
                    <UserRound size={16} className="mr-2 text-gray-500" />
                    <span className="text-sm font-medium">{author}</span>
                    <button
                      type="button"
                      onClick={() => removeAuthor(author)}
                      className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No authors added yet</p>
            )}
          </div>

          {/* Categories - Select with Icons */}
          <div>
            <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Categories
            </label>
            <div className="relative">
              <select
                id="categories"
                name="categories"
                value=""
                onChange={handleCategorySelection}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#292F36] focus:border-transparent appearance-none transition-all duration-200"
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
              <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={20} />
            </div>

            {study.categories.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                {study.categories.map((category, index) => {
                  const categoryObj = availableCategories.find(c => c.value === category);
                  return (
                    <div key={index} className="bg-white px-3 py-2 rounded-full flex items-center shadow-sm border border-gray-100">
                      {categoryObj?.icon}
                      <span className="text-sm font-medium">{category}</span>
                      <button
                        type="button"
                        onClick={() => removeCategory(category)}
                        className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No categories selected</p>
            )}
          </div>

          {/* PDF File Upload Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Upload PDF File (Max 10MB)
            </label>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Drag & Drop Area */}
            <div
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-all duration-200 ${
                isDragging ? 'border-[#292F36] bg-gray-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <div className="space-y-2 text-center cursor-pointer">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <p className="pl-1">
                    <span className="font-medium text-[#292F36]">Click to upload</span> or drag and drop
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF file only, max 10MB
                </p>
              </div>
            </div>

            {/* Error Message */}
            {fileError && (
              <div className="mt-2 flex items-center p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
                <AlertTriangle size={18} className="mr-2 flex-shrink-0" />
                <p className="text-sm">{fileError}</p>
              </div>
            )}

            {/* File Display */}
            {uploadedFile && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
                <div className="flex items-center overflow-hidden">
                  <FileText size={16} className="mr-2 text-red-500" />
                  <span className="text-sm font-medium truncate max-w-xs">{uploadedFile.name}</span>
                  <span className="text-xs text-gray-500 ml-2">({formatFileSize(uploadedFile.size)})</span>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={discardDraft}
            className="cursor-pointer flex items-center text-red-500 hover:text-red-700 font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition-all"
          >
            <FiTrash2 className="h-5 w-5 mr-2" />
            {isEditing ? 'Cancel Edit' : 'Discard Draft'}
          </button>
          <div className="space-x-4">
            {isEditing ? (
              <button
                type="submit"
                className="cursor-pointer px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium transition-all shadow-sm flex items-center"
              >
                <Save size={18} className="mr-2" />
                Update Study
              </button>
            ) : (
              <button
                type="submit"
                className="cursor-pointer px-6 py-3 bg-[#292F36] text-white rounded-lg hover:bg-[#1a1f24] font-medium transition-all shadow-sm flex items-center"
              >
                <Rocket size={18} className="mr-2" />
                Publish Study
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Display Published Studies */}
      {publishedStudies.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6 flex items-center text-[#292F36]">
            <Award className="mr-2" />
            Published Studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedStudies.map(study => (
              <div key={study.id} className="relative">
                <StudyCard
                  study={study}
                  setStudies={setPublishedStudies}
                  isAdmin={isAdmin}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}