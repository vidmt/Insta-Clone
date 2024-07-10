import PropTypes from 'prop-types';

export default function Images({src,caption}){


    return(
        <img src={src} alt={caption}/>
    );
}

Image.proptypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
}