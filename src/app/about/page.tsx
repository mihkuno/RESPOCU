import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
    // EduChest brand colors based on the logo
    const brandMaroon = '#9F1E22';
    const brandYellow = '#FFB81C';
    
    // Team member data structure - maintained as in original code
    const teamMembers = [
        {
            name: "Abao, Claudyn Nicole R.",
            role: "Member",
            image: "/team/abao-claudyn-nicole-r.jpg"
        },
        {
            name: "Banaag, Zhoe B.",
            role: "Member",
            image: "/team/banaag-zhoe-b.jpg"
        },
        {
            name: "Casis, Liezel C.",
            role: "Member",
            image: "/team/casis-liezel-c.jpg"
        },
        {
            name: "Dolauta, Elliza Dwyane C.",
            role: "Member",
            image: "/team/dolauta-elliza-dwyane-c.jpg"
        },
        {
            name: "Jarap, Allysa Khyle A.",
            role: "Leader",
            image: "/team/allysa-jarap.jpg"
        },
        {
            name: "Mabalacad, Karylle Jane G.",
            role: "Member",
            image: "/team/karylle-mabalacad.jpg"
        },
        {
            name: "Marucut, Camille Honeyvel N.",
            role: "Member",
            image: "/team/camille-marucut.jpg"
        },
        {
            name: "Montano, Ela Mae Q.",
            role: "Secretary",
            image: "/team/ela-montano.jpg"
        },
        {
            name: "Perpetua, Marjorie Jade R.",
            role: "Member",
            image: "/team/marjorie-perpetua.jpg"
        },
        {
            name: "Padernal, Rheyden Angelo C.",
            role: "Member",
            image: "/team/rheyden-padernal.jpg"
        },
        {
            name: "Ramirez, Althea R.",
            role: "Member",
            image: "/team/althea-ramirez.jpg"
        },
        {
            name: "Sabunod, Febe Claire O.",
            role: "Member",
            image: "/team/febe-sabunod.jpg"
        },
        {
            name: "Sarte, Melaiza Z.",
            role: "Member",
            image: "/team/melaiza-sarte.jpg"
        },
        {
            name: "Smith, Phillip Isaac P.",
            role: "Member",
            image: "/team/phillip-smith.jpg"
        },
        {
            name: "Uayan, Shanna Jehn G.",
            role: "Assistant Leader",
            image: "/team/shanna-uayan.jpg"
        }
    ];
    
    // Research adviser
    const researchAdviser = {
        name: "Niño Nilles Alce",
        role: "Capstone Research Adviser",
        image: "/team/niño-nilles-alce.jpg"
    };
    
    // Group team members by role for better organization
    const leaderMembers = teamMembers.filter(member => member.role === "Leader");
    const assistantLeaderMembers = teamMembers.filter(member => member.role === "Assistant Leader");
    const secretaryMembers = teamMembers.filter(member => member.role === "Secretary");
    const regularMembers = teamMembers.filter(member => member.role === "Member");

    
    return (
        <div className="relative min-h-screen bg-slate-50 overflow-hidden">
            {/* Abstract Background Lines - Same as landing page */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Maroon abstract lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,30 Q25,10 50,30 T100,30" stroke={brandMaroon} strokeWidth="0.2" fill="none" opacity="0.2" />
                    <path d="M0,35 Q25,55 50,35 T100,35" stroke={brandMaroon} strokeWidth="0.2" fill="none" opacity="0.15" />
                    <path d="M0,50 Q35,30 70,50 T100,50" stroke={brandMaroon} strokeWidth="0.3" fill="none" opacity="0.1" />
                    <path d="M0,65 Q40,85 60,65 T100,65" stroke={brandMaroon} strokeWidth="0.2" fill="none" opacity="0.2" />
                    <path d="M0,90 Q30,70 60,90 T100,90" stroke={brandMaroon} strokeWidth="0.4" fill="none" opacity="0.1" />
                </svg>
                
                {/* Yellow abstract lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,20 Q40,40 80,20 T100,20" stroke={brandYellow} strokeWidth="0.3" fill="none" opacity="0.15" />
                    <path d="M0,40 Q60,20 80,40 T100,40" stroke={brandYellow} strokeWidth="0.2" fill="none" opacity="0.1" />
                    <path d="M0,60 Q30,40 70,60 T100,60" stroke={brandYellow} strokeWidth="0.3" fill="none" opacity="0.15" />
                    <path d="M0,80 Q45,60 90,80 T100,80" stroke={brandYellow} strokeWidth="0.2" fill="none" opacity="0.1" />
                </svg>
                
                {/* Abstract geometric elements */}
                <div className="absolute top-20 left-20 w-32 h-32 border-2 border-yellow-500 rounded-full opacity-5"></div>
                <div className="absolute bottom-20 right-20 w-64 h-64 border-2 border-red-900 rounded-full opacity-5"></div>
                <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-yellow-400 rotate-45 opacity-5"></div>
            </div>
            
            {/* Navigation Bar */}
            <nav className="relative z-20 bg-white/80 backdrop-blur-sm shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link href="/">
                                <div className="relative w-40 h-10 cursor-pointer">
                                    <Image 
                                        src="/logo.png" 
                                        alt="EduChest logo" 
                                        fill
                                        priority
                                        className="object-contain" 
                                    />
                                </div>
                            </Link>
                        </div>
                        <div className="flex space-x-4">
                            <Link href="/">
                                <span className="px-3 py-2 text-gray-700 hover:text-red-900 cursor-pointer">Home</span>
                            </Link>
                            <Link href="/about">
                                <span className="px-3 py-2 text-red-900 font-semibold border-b-2 border-red-900 cursor-pointer">About</span>
                            </Link>
                            <Link href="/auth/login">
                                <span className="px-3 py-2 text-gray-700 hover:text-red-900 cursor-pointer">Login</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            
            {/* Header Section */}
            <div className="relative z-10 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <div className="bg-gradient-to-r from-red-900 to-red-800 h-2 w-24 mx-auto mb-6"></div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">About EduChest</h1>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Learn more about our mission to empower Senior High School students with a centralized repository for research papers and academic resources.
                        </p>
                    </div>
                </div>
            </div>
            
            {/* About Section */}
            <div className="relative z-10 bg-white/90 backdrop-blur-sm py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                        <div className="h-1 w-24 bg-yellow-500 mx-auto mb-6"></div>
                        <p className="text-gray-600 text-lg">
                            The EduChest Research Repository aims to develop an accessible digital platform where Senior High School students can store, browse, and retrieve research papers. Our project addresses the need for a centralized hub that promotes academic sharing, prevents duplication of research topics, and serves as a reference for future studies.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                        <div className="bg-slate-50 rounded-lg p-6 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-red-900 mb-4">Key Features</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Centralized research paper repository</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Easy citation and reference tools</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Research adviser recognition</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Best research papers showcase</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Secure access control</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="bg-slate-50 rounded-lg p-6 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-red-900 mb-4">Our Vision</h3>
                            <p className="text-gray-600 mb-4">
                                We envision a collaborative academic environment where research is more accessible, organized, and efficient for all users. EduChest will serve as a bridge connecting researchers, students, and academics, allowing them to:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Share knowledge across disciplines</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Find inspiration for new research</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Collaborate on academic projects</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Strive for academic excellence</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Research Adviser Section */}
            <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Adviser</h2>
                        <div className="h-1 w-24 bg-yellow-500 mx-auto"></div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                        <div className="w-48 h-48 relative rounded-full overflow-hidden mb-4 border-4 border-red-900">
                            <Image 
                                src={researchAdviser.image} 
                                alt={researchAdviser.name} 
                                fill
                                className="object-cover" 
                            />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{researchAdviser.name}</h3>
                        <p className="text-red-900 font-medium">{researchAdviser.role}</p>
                    </div>
                </div>
            </div>
            
            {/* Team Section */}
          {/* Improved Team Section */}
          <div className="relative z-10 bg-slate-100/90 backdrop-blur-sm py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                        <div className="h-1 w-24 bg-yellow-500 mx-auto mb-6"></div>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            The dedicated students behind the EduChest Research Repository project.
                        </p>
                    </div>
                    
                    {/* Leadership Team - Prominent display */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-red-900 mb-6 text-center">Leadership Team</h3>
                        <div className="flex flex-wrap justify-center gap-8">
                            {leaderMembers.map((member, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-red-200 flex flex-col items-center text-center transition-all hover:shadow-lg hover:border-red-400 max-w-xs">
                                    <div className="w-32 h-32 relative rounded-full overflow-hidden mb-4 border-4 border-red-900 shadow-md">
                                        <Image 
                                            src={member.image} 
                                            alt={member.name} 
                                            fill
                                            className="object-cover" 
                                        />
                                    </div>
                                    <span className="bg-red-900 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                                        {member.role}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                                </div>
                            ))}
                            
                            {assistantLeaderMembers.map((member, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-red-200 flex flex-col items-center text-center transition-all hover:shadow-lg hover:border-red-400 max-w-xs">
                                    <div className="w-32 h-32 relative rounded-full overflow-hidden mb-4 border-4 border-red-700 shadow-md">
                                        <Image 
                                            src={member.image} 
                                            alt={member.name} 
                                            fill
                                            className="object-cover" 
                                        />
                                    </div>
                                    <span className="bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                                        {member.role}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                                </div>
                            ))}
                            
                            {secretaryMembers.map((member, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-red-200 flex flex-col items-center text-center transition-all hover:shadow-lg hover:border-red-400 max-w-xs">
                                    <div className="w-32 h-32 relative rounded-full overflow-hidden mb-4 border-4 border-red-500 shadow-md">
                                        <Image 
                                            src={member.image} 
                                            alt={member.name} 
                                            fill
                                            className="object-cover" 
                                        />
                                    </div>
                                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                                        {member.role}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Team Members - Grid layout with improved cards */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Team Members</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {regularMembers.map((member, index) => (
                                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 transition-all hover:shadow-md hover:border-yellow-400 group">
                                    <div className="relative h-48 overflow-hidden">
                                        <Image 
                                            src={member.image} 
                                            alt={member.name} 
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-bold text-gray-900 truncate">{member.name}</h3>
                                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded mt-1">
                                            {member.role}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            
            {/* CTA Section */}
            <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-gradient-to-r from-red-900 to-red-800 rounded-xl shadow-xl overflow-hidden">
                    <div className="px-6 py-12 md:px-12 md:py-16 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Join the EduChest Community</h2>
                        <p className="text-red-100 mb-8 max-w-lg mx-auto">
                            Become part of our academic community and contribute to the future of research sharing at EduChest.
                        </p>
                        <div className="flex justify-center">
                            <Link href="/auth/login">
                                <button className="px-8 py-3 border border-transparent rounded-lg text-base font-bold text-red-900 bg-yellow-400 hover:bg-yellow-300 transition-all shadow-md">
                                    Get Started Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <footer className="relative z-10 bg-white/90 backdrop-blur-sm border-t border-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <div className="relative w-40 h-10">
                                <Image 
                                    src="/logo.png" 
                                    alt="EduChest logo" 
                                    fill
                                    priority
                                    className="object-contain" 
                                />
                            </div>
                        </div>
                        <div className="text-center md:text-right text-sm text-gray-600">
                            <p>© {new Date().getFullYear()} EduChest. All rights reserved.</p>
                            <p className="mt-1">EduChest - Research Repository for Senior High Students</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}