const Layout = ({children, title}) => (
    <div className="layout-root">
        <header className="layout-header">Header</header>
            <div className="container"><h1>{title}</h1></div>
            <div className="layout-content">
                {children}
            </div>
        <footer className="layout-footer">Footer</footer>
        <style jsx>{`
    
            .layout-root {
                display: flex;
                flex-direction: column;
                height: 100%;
            }
    
            .layout-header {}
    
            .layout-content {
                flex-grow: 1;
            }
    
            .layout-footer {}
        `}</style>
    </div>
);


export default Layout;