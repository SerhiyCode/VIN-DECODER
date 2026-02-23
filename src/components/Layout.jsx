import { Outlet, useNavigation, useLocation, NavLink } from 'react-router-dom';

export const Layout = () => {
  const navigation = useNavigation(); 
  const location = useLocation(); 
  const isLoading = navigation.state === "loading"; 

  return (
    <>
      <header className="main-header">
        <nav className="container">
          <ul className="nav-links"> 
            <li>
              <NavLink 
                to="/" 
                end 
                className={({ isActive }) => isActive ? "active-link" : ""}
              >
                VIN Decoder
              </NavLink>
            </li>
            <li> 
              <NavLink 
                to="/variables" 
                className={({ isActive }) => isActive ? "active-link" : ""}
              >
                Variables List
              </NavLink>
            </li>
          </ul>
        </nav>
        {isLoading && <div className="global-loader-bar" />}
      </header>

      <main className="main-content">   
          
        <Outlet key={location.key} />
      </main>
    </>
  );
};