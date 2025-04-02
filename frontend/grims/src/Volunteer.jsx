import React, { useState } from 'react';
import './Volunteer.css';
import SideNav from './sidenav';
import './index.css';

const Volunteer = () => {
  // State for managing volunteer actions
  const [level1Sheets, setLevel1Sheets] = useState([]);
  const [level2Items, setLevel2Items] = useState([]);
  const [level3Routes, setLevel3Routes] = useState([]);

  const [volunteerId, setVolunteerId] = useState('');
  const [newLevel, setNewLevel] = useState(1);
  const [volunteers, setVolunteers] = useState([
    { id: 'V001', name: 'John Doe', level: 1 },
    { id: 'V002', name: 'Jane Smith', level: 2 },
    { id: 'V003', name: 'Mike Johnson', level: 3 }
  ]);
  // Function to send sheets to Level 1 volunteers
  const sendSheetsToLevel1 = () => {
    const sheetNumber = level1Sheets.length + 1;
    const volunteerName = `Volunteer ${sheetNumber}`; // Replace with actual volunteer name logic
    const newSheet = {
      sheetNumber,
      volunteerName,
      status: 'Pending Verification',
      additionalInfo: '', // To be filled by Level 1 volunteer
    };
    setLevel1Sheets([...level1Sheets, newSheet]);
    alert(`Sheet ${sheetNumber} sent to Level 1 Volunteer: ${volunteerName}`);
  };

  // Function to update sheet with additional info (Level 1 Volunteer)
  const updateSheetWithInfo = (sheetNumber, additionalInfo) => {
    const updatedSheets = level1Sheets.map((sheet) =>
      sheet.sheetNumber === sheetNumber
        ? { ...sheet, additionalInfo, status: 'Verified' }
        : sheet
    );
    setLevel1Sheets(updatedSheets);
  };

  // Function to send verified sheets to Level 2 volunteers
  const sendVerifiedSheetsToLevel2 = (sheetNumber) => {
    const sheet = level1Sheets.find((s) => s.sheetNumber === sheetNumber);
    if (sheet) {
      const itemList = `Item List for Sheet ${sheetNumber}`;
      setLevel2Items([...level2Items, { ...sheet, itemList, status: 'Pending Packing' }]);
      alert(`Sheet ${sheetNumber} sent to Level 2 Volunteer for packing.`);
    }
  };

  // Function to send routes to Level 3 volunteers
  const sendRoutesToLevel3 = () => {
    const route = `Route ${level3Routes.length + 1}`;
    setLevel3Routes([...level3Routes, route]);
    alert(`Route sent to Level 3 Volunteer: ${route}`);
  };

  const updateVolunteerLevel = () => {
    if (!volunteerId) {
      alert('Please enter Volunteer ID');
      return;
    }
    
    setVolunteers(volunteers.map(v => 
      v.id === volunteerId ? { ...v, level: newLevel } : v
    ));
    alert(`Volunteer ${volunteerId} updated to Level ${newLevel}`);
    setVolunteerId('');
  };

  return (
    <div className="app">
      <SideNav />
      <div className="main-content">
        <div className="volunteer-page">
          <h1 className="volunteer-title">Volunteer Management</h1>
          {/* NEW VOLUNTEER LEVEL UPDATE CARD */}
          <div className="volunteer-section" style={{ maxWidth: '500px', marginBottom: '30px' }}>
            <h2>Update Volunteer Level</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <input
                type="text"
                placeholder="Volunteer ID"
                value={volunteerId}
                onChange={(e) => setVolunteerId(e.target.value)}
                style={{ padding: '8px', flex: 1 }}
              />
              <select 
                value={newLevel}
                onChange={(e) => setNewLevel(Number(e.target.value))}
                style={{ padding: '8px' }}
              >
                {[1, 2, 3, 4, 5].map(level => (
                  <option key={level} value={level}>Level {level}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={updateVolunteerLevel}
              style={{
                padding: '8px 16px',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Update Level
            </button>
          </div>
          {/* Level 1 Volunteers Section */}
          <div className="volunteer-section">
            <h2>Level 1 Volunteers</h2>
            <p>Send sheets for verification:</p>
            <button className="volunteer-button" onClick={sendSheetsToLevel1}>
              Send Sheet to Level 1
            </button>
            <div className="volunteer-list">
              {level1Sheets.map((sheet) => (
                <div key={sheet.sheetNumber} className="volunteer-item">
                  <span>Sheet {sheet.sheetNumber} - {sheet.volunteerName}</span>
                  <span className="status">{sheet.status}</span>
                  {sheet.status === 'Pending Verification' && (
                    <button
                      onClick={() => updateSheetWithInfo(sheet.sheetNumber, 'Additional Info Added')}
                    >
                      Add Info
                    </button>
                  )}
                  {sheet.status === 'Verified' && (
                    <button
                      onClick={() => sendVerifiedSheetsToLevel2(sheet.sheetNumber)}
                    >
                      Send to Level 2
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Level 2 Volunteers Section */}
          <div className="volunteer-section">
            <h2>Level 2 Volunteers</h2>
            <p>Item lists for packing:</p>
            <div className="volunteer-list">
              {level2Items.map((item) => (
                <div key={item.sheetNumber} className="volunteer-item">
                  <span>{item.itemList} - {item.volunteerName}</span>
                  <span className="status">{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Level 3 Volunteers Section */}
          <div className="volunteer-section">
            <h2>Level 3 Volunteers (Drivers)</h2>
            <p>Send delivery routes:</p>
            <button className="volunteer-button" onClick={sendRoutesToLevel3}>
              Send Route to Level 3
            </button>
            <div className="volunteer-list">
              {level3Routes.map((route, index) => (
                <div key={index} className="volunteer-item">
                  <span>{route}</span>
                  <span className="status">Pending Delivery</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;