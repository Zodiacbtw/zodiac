import React from 'react';
import { Linkedin, Github, Globe } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Emre Şahiner',
    role: 'Project Manager',
    imageUrl: 'https://ca.slack-edge.com/T046N0ZLKU4-U04798UTQFJ-a10ca8ef7bb2-512',
    bio: 'Experienced project manager with a passion for delivering high-quality digital products and leading successful teams.',
    socials: [
      { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/emresahinerjourneyapp/' },
      { icon: <Github size={20} />, url: 'https://github.com/EmreWorkintech' },
    ],
  },
  {
    id: 2,
    name: 'Doğukan Tekin',
    role: 'Full Stack Developer',
    imageUrl: 'https://ca.slack-edge.com/T046N0ZLKU4-U084V3BEJBA-f1142d3e04c8-512',
    bio: 'Versatile full stack developer dedicated to crafting efficient, scalable, and user-friendly web applications.',
    socials: [
      { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/dogukantekin/' },
      { icon: <Github size={20} />, url: 'https://github.com/Zodiacbtw' },
    ],
  },
];

const TeamPage = () => {
  return (
    <div className="flex flex-col space-y-10 md:space-y-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase text-indigo-600 tracking-wider">Our Experts</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Meet Our Team
        </h1>
        <p className="mt-4 max-w-2xl text-base text-gray-600 lg:mx-auto">
          We are a passionate group of professionals dedicated to creating the best e-commerce experience for you.
        </p>
      </div>

      <div className={`
        grid grid-cols-1 
        ${teamMembers.length === 1 ? 'sm:grid-cols-1' : 'sm:grid-cols-2'} 
        ${teamMembers.length <= 2 ? 'lg:max-w-4xl lg:mx-auto' : 'lg:grid-cols-3'}
        ${teamMembers.length <= 3 && teamMembers.length > 0 ? (teamMembers.length === 3 ? '' : 'xl:max-w-5xl xl:mx-auto') : (teamMembers.length > 0 ? 'xl:grid-cols-4' : '')}
        gap-8 md:gap-10
        ${teamMembers.length === 1 ? 'justify-items-center' : ''}
        ${teamMembers.length === 2 && teamMembers.length < 3 ? 'lg:grid-cols-2' : ''}
      `}>
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center text-center bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden mb-4 border-4 border-indigo-200 shadow-md">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-0.5">{member.name}</h3>
            <p className="text-sm font-medium text-indigo-600 mb-2">{member.role}</p>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed flex-grow px-2">
              {member.bio}
            </p>
            {member.socials && member.socials.length > 0 && (
              <div className="flex space-x-3 mt-auto">
                {member.socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-indigo-500 transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;