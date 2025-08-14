import styles from './Card.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from "react-router-dom";

function Card({width, shadow, title, icon, coloredHeader, link, children}) {
    return <div className={`bg-white rounded-lg ${shadow ? 'shadow-xl' : ''} ${width}`}>
        <h2 className={`relative text-center p-4 ${coloredHeader ? 'coloredBackground' : ''}`}>
            <span>{title}</span>
            {link ? (
                <Link to={link}>
                    {icon && (
                        <FontAwesomeIcon
                            icon={icon}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-white pr-4"
                        />
                    )}
                </Link>
            ) : (
                icon && (
                    <FontAwesomeIcon
                        icon={icon}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-white pr-4"
                    />
                )
            )}
        </h2>
        {children}
    </div>
}

export default Card;