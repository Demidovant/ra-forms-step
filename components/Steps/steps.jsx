import React, { useState } from 'react';
import './steps.css';

const Steps = () => {
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');

  const handleAddEntry = () => {
    const distanceNum = parseFloat(distance);
    if (date && !isNaN(distanceNum)) {
      setEntries(prevEntries => {
        const existingEntryIndex = prevEntries.findIndex(entry => entry.date === date);
        if (existingEntryIndex !== -1) {
          const updatedEntries = prevEntries.map(entry =>
            entry.date === date ? { ...entry, distance: entry.distance + distanceNum } : entry
          );
          return updatedEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else {
          const newEntries = [...prevEntries, { date, distance: distanceNum }];
          return newEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
      });
      setDate('');
      setDistance('');
    }
  };

  const handleDeleteEntry = (dateToDelete) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.date !== dateToDelete));
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-item">
          <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="distance">Пройдено км</label>
          <input
            type="number"
            id="distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            min="0"
            step="0.1"
            placeholder="Км"
          />
        </div>
        <button onClick={handleAddEntry}>OK</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Дата (ДД.ММ.ГГ)</th>
              <th>Пройдено км</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(entry => (
              <tr key={entry.date}>
                <td>{new Date(entry.date).toLocaleDateString('ru-RU')}</td>
                <td>{entry.distance.toFixed(1)}</td>
                <td>
                  <button onClick={() => handleDeleteEntry(entry.date)} className="delete-btn">✘</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Steps;
