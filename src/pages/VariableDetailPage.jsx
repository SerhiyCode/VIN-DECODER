
import { useLoaderData, useNavigate } from 'react-router-dom';

export const VariableDetailPage = () => {
  const variable = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Назад до списку
      </button>

      <article className="detail-article">
        <h1>{variable.Name}</h1>
        <div 
          className="description-box"
          dangerouslySetInnerHTML={{ __html: variable.Description }} 
        />
      </article>
    </div>
  );
};