import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from "react-router-dom";

function Card({width, shadow, title, icons = [], coloredHeader, children}) {
    return <div className={`bg-white rounded-lg ${shadow ? 'shadow-xl' : ''} ${width}`}>
        <h2 className={`relative text-center p-4 ${coloredHeader ? 'coloredBackground' : ''}`}>
            <span>{title}</span>
            {icons.length > 0 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2 pr-4 cursor-pointer">
                    {icons.map((icon, index) =>
                        icon.link ? (
                            <Link to={icon.link} key={index}>
                                <FontAwesomeIcon icon={icon.icon} className="text-white"/>
                            </Link>
                        ) : (
                            <FontAwesomeIcon icon={icon.icon} onClick={icon.onClick} className="text-white" key={index}/>
                        )
                    )}
                </div>
            )}
        </h2>
        {
            children
        }
    </div>
}

export default Card;