import styles from './Card.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function Card({title, icon, children}) {
    return <div className="bg-white rounded-lg shadow-xl w-1/4">
        <h2 className="relative text-center">
            <span>{title}</span>
            {icon ? <FontAwesomeIcon icon={icon} className="absolute right-0 top-1/2 -translate-y-1/2 text-white pr-4" /> : null}
        </h2>
        {children}
    </div>
}

export default Card;