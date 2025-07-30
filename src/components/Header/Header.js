import './Header.module.css';

function Header() {
    function getLocalizedFormattedDate() {
        const today = new Date();
        const browserLang = navigator.language || 'en-US';

        const options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };

        return today.toLocaleDateString(browserLang, options);
    }

    return (
        <header className="bg-primary text-white p-4 pl-12 flex justify-between">
            <h1>Family Dashboard</h1>
            <p className="p-4 pt-8">{getLocalizedFormattedDate()}</p>
        </header>
    )
}

export default Header;