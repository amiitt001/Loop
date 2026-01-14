import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const TEAM = [
  {
    role: 'Head', width: '300px', members: [
      { name: 'Amit Verma', title: 'President', img: '/amit.jpg', social: { github: '#', linkedin: '#' } },
      { name: 'Aviral Pandey', title: 'Vice President', img: '/aviral.png', social: { twitter: '#', linkedin: '#' } }
    ]
  },
  {
    role: 'Coordinator', width: '250px', members: [
      { name: 'Vijay Singh', title: 'Tech Lead', img: '/vijay.png', social: { github: '#' } },
      { name: 'Arpita', title: 'Event Lead', img: '/arpita.jpg', social: { linkedin: '#' } },
      { name: 'Jhanak', title: 'Marketing Lead', img: '/jhanak.jpg', social: { twitter: '#' } },
    ]
  },
  {
    role: 'Member', width: '220px', members: [
      { name: 'Mike Ross', title: 'Developer', img: '', social: { github: '#' } },
      { name: 'Emily Blunt', title: 'Designer', img: '', social: { linkedin: '#' } },
      { name: 'Jessica Day', title: 'Content', img: '', social: { twitter: '#' } },
      { name: 'Cece Parekh', title: 'Developer', img: '', social: { github: '#' } },
    ]
  }
];

const Team = () => {
  return (
    <div className="container" style={{ padding: '8rem 0 4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="animate-fade-in">
        <h1 className="text-neon-cyan" style={{ fontSize: '3rem', marginBottom: '1rem' }}>MEET THE SQUAD</h1>
        <p style={{ color: 'var(--text-dim)' }}>The minds behind the machines.</p>
      </div>

      {TEAM.map((group, groupIndex) => (
        <div key={group.role} style={{ marginBottom: '5rem' }} className="animate-fade-in">
          <h2 style={{
            textAlign: 'center',
            marginBottom: '2rem',
            color: 'var(--neon-violet)',
            fontSize: group.role === 'Head' ? '2rem' : '1.5rem',
            position: 'relative',
            display: 'inline-block',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            {group.role}s
            <span style={{ position: 'absolute', bottom: '-10px', left: '0', width: '100%', height: '2px', background: 'var(--neon-violet)', opacity: 0.5 }}></span>
          </h2>

          <div className="team-grid">
            {group.members.map((member, i) => (
              <TeamCard key={member.name} member={member} width={group.width} delay={`${i * 0.1}s`} />
            ))}
          </div>
        </div>
      ))}

      <style>{`
        .team-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
        }
      `}</style>
    </div>
  );
};

const TeamCard = ({ member, width, delay }) => {
  return (
    <div className="team-card animate-fade-in" style={{
      width: width,
      animationDelay: delay,
      height: '350px',
      position: 'relative' // For hover overlay
    }}>
      <div className="card-inner">
        {member.img ? (
          <img
            src={member.img}
            alt={member.name}
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              border: '2px solid var(--border-dim)',
              objectFit: 'cover',
              marginBottom: '1rem'
            }}
            className="member-avatar"
          />
        ) : (
          <div className="avatar-placeholder"></div>
        )}
        <h3 style={{ fontSize: '1.2rem', marginTop: '1rem' }}>{member.name}</h3>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{member.title}</p>
      </div>

      {/* Hover Overlay */}
      <div className="social-overlay">
        <div style={{ display: 'flex', gap: '1rem' }}>
          {member.social.github && <Github className="social-icon" />}
          {member.social.linkedin && <Linkedin className="social-icon" />}
          {member.social.twitter && <Twitter className="social-icon" />}
        </div>
      </div>

      <style>{`
        .team-card {
          perspective: 1000px;
        }
        
        .card-inner {
          background: var(--bg-card);
          border: 1px solid var(--border-dim);
          border-radius: 12px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
          position: relative;
          z-index: 1;
        }

        .avatar-placeholder {
          width: 140px;
          height: 140px;
          background: #222;
          border-radius: 50%;
          border: 2px solid var(--border-dim);
          transition: all 0.4s ease;
        }

        .member-avatar {
             transition: all 0.4s ease;
        }

        .team-card:hover .card-inner {
          transform: translateY(-5px);
          border-color: var(--neon-cyan);
          background: rgba(10, 10, 10, 0.9);
        }

        .team-card:hover .avatar-placeholder,
        .team-card:hover .member-avatar {
          border-color: var(--neon-cyan);
          box-shadow: 0 0 20px rgba(0, 243, 255, 0.3);
        }

        /* Social Reveal */
        .social-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0; /* Hidden by default */
          background: linear-gradient(to top, rgba(0, 243, 255, 0.2), transparent);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 2rem;
          opacity: 0;
          transition: all 0.4s ease;
          border-radius: 0 0 12px 12px;
          pointer-events: none; /* Let clicks pass through if hidden */
          z-index: 2;
        }

        .team-card:hover .social-overlay {
          height: 40%;
          opacity: 1;
          pointer-events: auto;
        }

        .social-icon {
          color: #fff;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .social-icon:hover {
          color: var(--neon-cyan);
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default Team;
