
import { VinForm } from '../components/VinForm';
import { useVinDecoder } from '../hooks/useVinDecoder';

export const HomePage = () => {
  const { results, history, loading, error, apiMessage, decodeVin, clearResults } = useVinDecoder();

  return (
    <div className="home-page">    
      <div className='container'>  
      <h1 className='page-title'>Розшифровка VIN</h1>
      <VinForm onSearch={decodeVin} />
      {history.length > 0 && (
        <div className="history">
          <span>Останні: </span>
          {history.map(vin => (
            <button key={vin} onClick={() => decodeVin(vin)} className="history-btn">{vin}</button>   
    ))}                       
        </div> 
                  
      )}    

          {loading && <div className="loader">Шукаємо дані...</div>}
      {apiMessage && <div className="api-info-msg">Статус: {apiMessage}</div>}
      {error && <div className="error-alert">{error}</div>} 
      {(results || error) && !loading && (
        <div className="actions-bar">
          <button onClick={clearResults} className="reset-btn">
            🔄 Очистити результати
          </button>
        </div>
      )}
  </div>    
  <div className='results-section'>   
    <div className="container">  
       <div className="results-grid">                 
         {results && results.length === 0 && !loading && (
      <p className="no-data-msg">
          ✅ VIN розшифровано, але детальних характеристик не знайдено.
     </p>
)}  
        {results?.map((res, index) => (
          <div key={index} className="result-card">
            <span className="var-name">{res.Variable}:</span>
            <span className="var-value">{res.Value}</span>
          </div>
        ))} 
        </div>
      </div>       
    </div> 
  </div> 
  
  );
}; 
