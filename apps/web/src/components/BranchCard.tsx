import React from 'react';
import { Branch, BRANCH_TYPE_LABELS, BRANCH_TYPE_ICONS } from '../types/Branch';
import './BranchCard.css';

interface BranchCardProps {
  branch: Branch;
}

const BranchCard: React.FC<BranchCardProps> = ({ branch }) => {
  const getFullAddress = () => {
    const parts = [
      branch.address,
      branch.city,
      branch.state,
      branch.country,
      branch.postal_code,
    ].filter(Boolean);
    return parts.join(', ');
  };

  const getGoogleMapsUrl = () => {
    if (branch.latitude && branch.longitude) {
      return `https://www.google.com/maps?q=${branch.latitude},${branch.longitude}`;
    }
    const address = getFullAddress();
    if (address) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    }
    return null;
  };

  const formatHours = (day: string) => {
    if (branch.hours_of_operation && branch.hours_of_operation[day.toLowerCase()]) {
      return branch.hours_of_operation[day.toLowerCase()];
    }
    return null;
  };

  const googleMapsUrl = getGoogleMapsUrl();

  return (
    <div className={`branch-card ${branch.is_main_branch ? 'main-branch' : ''}`}>
      {branch.is_main_branch && (
        <div className="main-branch-badge">
          ⭐ Headquarters
        </div>
      )}

      <div className="branch-header">
        <div className="branch-icon">
          {BRANCH_TYPE_ICONS[branch.branch_type]}
        </div>
        <div className="branch-title">
          <h3>{branch.branch_name}</h3>
          <span className="branch-type-label">
            {BRANCH_TYPE_LABELS[branch.branch_type]}
          </span>
        </div>
      </div>

      {branch.description && (
        <p className="branch-description">{branch.description}</p>
      )}

      <div className="branch-details">
        {getFullAddress() && (
          <div className="branch-detail-item">
            <span className="detail-icon">📍</span>
            <div className="detail-content">
              <span className="detail-label">Address</span>
              <span className="detail-value">{getFullAddress()}</span>
            </div>
          </div>
        )}

        {branch.phone && (
          <div className="branch-detail-item">
            <span className="detail-icon">📞</span>
            <div className="detail-content">
              <span className="detail-label">Phone</span>
              <a href={`tel:${branch.phone}`} className="detail-value">
                {branch.phone}
              </a>
            </div>
          </div>
        )}

        {branch.email && (
          <div className="branch-detail-item">
            <span className="detail-icon">✉️</span>
            <div className="detail-content">
              <span className="detail-label">Email</span>
              <a href={`mailto:${branch.email}`} className="detail-value">
                {branch.email}
              </a>
            </div>
          </div>
        )}

        {branch.hours_of_operation && Object.keys(branch.hours_of_operation).length > 0 && (
          <div className="branch-detail-item hours">
            <span className="detail-icon">🕒</span>
            <div className="detail-content">
              <span className="detail-label">Hours</span>
              <div className="hours-list">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                  const hours = formatHours(day);
                  if (!hours) return null;
                  return (
                    <div key={day} className="hours-row">
                      <span className="day-name">{day.substring(0, 3)}</span>
                      <span className="hours-value">{hours}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {googleMapsUrl && (
        <div className="branch-actions">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="get-directions-btn"
          >
            🗺️ Get Directions
          </a>
        </div>
      )}
    </div>
  );
};

export default BranchCard;
