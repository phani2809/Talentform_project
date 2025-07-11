import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = ({ 
  reports = [], 
  alerts = [], 
  center = [37.7749, -122.4194], 
  zoom = 10,
  height = '400px',
  className = ''
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      // Initialize map
      mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    // Create custom icons
    const reportIcon = L.divIcon({
      className: 'custom-marker report-marker',
      html: `<div style="
        background-color: #ff6b35;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    const alertIcon = L.divIcon({
      className: 'custom-marker alert-marker',
      html: `<div style="
        background-color: #dc2626;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        animation: pulse 2s infinite;
      "></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    // Add report markers
    reports.forEach((report) => {
      if (report.latitude && report.longitude) {
        const marker = L.marker([report.latitude, report.longitude], { icon: reportIcon })
          .addTo(mapInstanceRef.current);
        
        const popupContent = `
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #ff6b35; font-size: 14px; font-weight: bold;">
              ${report.incidentType}
            </h3>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">
              <strong>Damage Level:</strong> ${report.damageLevel}
            </p>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">
              <strong>Location:</strong> ${report.location}
            </p>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">
              <strong>Reported by:</strong> ${report.userName}
            </p>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
              <strong>Time:</strong> ${new Date(report.createdAt).toLocaleString()}
            </p>
            ${report.description ? `
              <p style="margin: 0; font-size: 12px; color: #333; padding: 8px; background: #f5f5f5; border-radius: 4px;">
                ${report.description}
              </p>
            ` : ''}
          </div>
        `;
        
        marker.bindPopup(popupContent);
      }
    });

    // Add alert markers
    alerts.forEach((alert) => {
      if (alert.latitude && alert.longitude) {
        const marker = L.marker([alert.latitude, alert.longitude], { icon: alertIcon })
          .addTo(mapInstanceRef.current);
        
        const popupContent = `
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #dc2626; font-size: 14px; font-weight: bold;">
              ${alert.title}
            </h3>
            <p style="margin: 0 0 4px 0; font-size: 12px;">
              <span style="
                background: ${getSeverityColor(alert.severity)};
                color: white;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 10px;
                text-transform: uppercase;
              ">
                ${alert.severity}
              </span>
            </p>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">
              <strong>Location:</strong> ${alert.location}
            </p>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
              <strong>Time:</strong> ${new Date(alert.createdAt).toLocaleString()}
            </p>
            <p style="margin: 0; font-size: 12px; color: #333; padding: 8px; background: #f5f5f5; border-radius: 4px;">
              ${alert.message}
            </p>
          </div>
        `;
        
        marker.bindPopup(popupContent);
      }
    });

    // Fit bounds if there are markers
    const allPoints = [
      ...reports.filter(r => r.latitude && r.longitude).map(r => [r.latitude, r.longitude]),
      ...alerts.filter(a => a.latitude && a.longitude).map(a => [a.latitude, a.longitude])
    ];

    if (allPoints.length > 0) {
      const group = new L.featureGroup(
        allPoints.map(point => L.marker(point))
      );
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }

  }, [reports, alerts]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#d97706';
      case 'low': return '#2563eb';
      default: return '#6b7280';
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.7;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
      <div 
        ref={mapRef} 
        style={{ height, width: '100%' }}
        className={`rounded-lg border border-gray-200 ${className}`}
      />
    </>
  );
};

export default Map;

