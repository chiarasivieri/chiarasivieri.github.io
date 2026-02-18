// src/components/GitHubProfile.jsx (VERSIONE CORRETTA E COMPLETA)

import React, { useState, useEffect } from 'react';
import './GitHubProfile.css';

export default function GitHubProfile({ username }) {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`)
        ]);

        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error('Dati GitHub non trovati');
        }

        const profileData = await profileResponse.json();
        const reposData = await reposResponse.json();
        
        setProfile(profileData);
        setRepos(reposData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  if (loading) return <p>Caricamento profilo GitHub...</p>;
  if (error) return <p style={{ color: 'red' }}>Errore: {error}</p>;

  return (
    <>
      {/* ============ BLOCCO DA SOSTITUIRE ============ */}
      <div className="github-card">
        <img src={profile.avatar_url} alt={`${profile.login}'s avatar`} className="github-avatar" />
        
        <div className="github-info">
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="github-username">
            <h3>{profile.login}</h3>
          </a>
          
          <div className="github-stats">
            <span>Followers: {profile.followers}</span>
            <span>Following: {profile.following}</span>
            <span>Public Repos: {profile.public_repos}</span>
          </div>
          
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="github-button">
            Check on GitHub
          </a>
        </div>
      </div>
      {/* ============================================== */}

      <div className="github-repos">
        <h3>Last Projects</h3>
        <ul>
          {repos.map(repo => (
            <li key={repo.id} className="repo-item">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
              <p>{repo.description || "No description yet"}</p>
              {repo.language && <span>{repo.language}</span>}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}