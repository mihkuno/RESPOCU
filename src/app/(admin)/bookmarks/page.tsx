import React from 'react';
import Link from 'next/link';

const bookmarkedStudies = [
  {
    id: 1,
    title: "The Impact of Social Media on Academic Performance",
    description: "A quantitative study examining the correlation between social media usage and GPA among senior high students.",
    type: "Quantitative Research",
    publishedDate: "2023-05-15",
    authors: ["Maria Santos", "Juan Dela Cruz"],
  },
  {
    id: 2,
    title: "Effects of Sleep Deprivation on Cognitive Functions",
    description: "Experimental research measuring the effects of different sleep durations on memory retention.",
    type: "Experimental Study",
    publishedDate: "2023-03-22",
    authors: ["Robert Johnson", "Sarah Chen"],
  },
];

export default function BookmarksPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Bookmarked Studies</h1>
      
      {bookmarkedStudies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">You haven't bookmarked any studies yet.</p>
          <Link href="/publications" className="text-[#292F36] hover:underline mt-2 inline-block">
            Browse Publications
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedStudies.map((study) => (
            <div key={study.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-800">{study.title}</h2>
                  <span className="bg-[#292F36] text-white text-xs px-2 py-1 rounded-full">
                    {study.type}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{study.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {study.authors.map((author, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {author}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Published: {new Date(study.publishedDate).toLocaleDateString()}</span>
                  <button className="text-[#292F36] hover:text-[#1a1f24] font-medium">
                    Remove Bookmark
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}