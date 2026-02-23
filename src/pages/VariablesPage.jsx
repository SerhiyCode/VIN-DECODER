
import { useState } from 'react'; 
import { useLoaderData, Link } from 'react-router-dom';

export const VariablesPage = () => {
  const variables = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const filteredVariables = variables.filter(v => 
    v.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className='page-title'>Довідник змінних</h1>      
      <div className="search-container">
        <input
          type="text"
          placeholder="Пошук змінної за назвою..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />    
      </div>
      <div className="variables-list">
        {filteredVariables.map((v) => (
          <div key={v.ID} className="variable-card-link">
            <Link to={`/variables/${v.ID}`} className="variable-link">
              <strong className='variables-strong'>{v.Name}</strong>
            </Link>
            {v.Description && (
              <div 
                className="variable-short-desc"
                dangerouslySetInnerHTML={{ __html: v.Description }} 
              />
            )}
          </div>
        ))}

        {filteredVariables.length === 0 && (
          <p className="no-results">Нічого не знайдено за запитом {searchTerm}</p>
        )}
      </div>
    </div>
  );
};