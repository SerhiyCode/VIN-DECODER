import { useState } from 'react';
import clsx from 'clsx';
import { validateVin } from '../utils/validateVin';

export const VinForm = ({ onSearch }) => {
  const [vin, setVin] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();  
    const cleanVin = vin.trim();
    const validationError = validateVin(cleanVin);
    
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    onSearch(cleanVin.toUpperCase()); 
    setVin('');
  };

  return (
    <form onSubmit={handleSubmit} className="vin-form">
      <div className="input-group">
        <input
          type="text"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          placeholder="Введіть 17 символів VIN..."
          className={clsx('vin-input', error && 'input-error')}
          maxLength={17}
        />
        <button type="submit" className="submit-btn">Розшифрувати</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};