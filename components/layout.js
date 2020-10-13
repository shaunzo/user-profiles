const Layout = ({children, title}) => (
    <div className="layout-root">
        <header className="layout-header">
            <span className="layout-header-item layout-header-logo"><img src="/static/logo.png" alt="Logo" /></span>
            <span className="layout-header-item layout-header-title">{title}</span>
            <span className="layout-header-item"></span>
        </header>

        <div className="layout-content">
            {children}
        </div>
        
        <footer className="layout-footer">&copy;{new Date().getFullYear()}</footer>
        <style jsx>{`
    
            .layout-root {
                display: flex;
                flex-direction: column;
                height: 100%;
            }
    
            .layout-header {
                color: #fff;
                background-color: #000;
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                padding: 20px;
            }

            .layout-header-item {
                flex-grow: 0;
                flex-shrink: 1;
                flex-basis: 33.33%;
                display: flex;
                
            }

            .layout-header-logo img {
                height: 30px;
            }

            .layout-header-title {
                text-align: center;
                text-transform: uppercase;
                letter-spacing: 2px;
                align-items: center;
                justify-content: center;
            }
    
            .layout-content {
                flex-grow: 1;
            }
    
            .layout-footer {
                margin-top: 20px;
                padding: 20px;
                border-top: 1px solid #ccc;
                text-align: center;
                font-style: italic;
            }
        `}</style>
    </div>
);


export default Layout;