import { useRouteError, Link } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();
  return (
    <main className="main-error"> 
    <div className="container"> 
      <div className="main-inner-error">  
        <h2 className="error-title">⚠️ Щось пішло не так</h2>
      <p className="error-message"> 
        {error.message || "Не вдалося завантажити дані."}
      </p>
      <Link to="/" className="submit-btn error-back-link">
        Повернутися на головну
      </Link>  
      </div>
      </div>
    </main>
  );
};