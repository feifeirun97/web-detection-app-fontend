import React from 'react';
import './ImageLinkForm.css'

 const ImageLinkForm = ({ onInputChange,onButtonSubmit })=> {
 	return(
        <div className='ma4 mt0 mb2'>
            <p className='f3'>
            {'The magic rainbow will detect faces in pictures. Try it!'}
            </p>
            <div className='center form pa4 w-50 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type="text" onChange={ onInputChange }/>
                <button className='w-30 pointer grow f4 link ph3 pv2 dib white bg-light-purple' 
                onClick={ onButtonSubmit }
                >Detect</button>
            </div>
        </div>
 		)
 }

 export default ImageLinkForm;