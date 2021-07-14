import React from 'react';

 const Rank = ({usage,name})=> {
 	return(
        <div>
            <div className='white f3'>
                {`${name}, your current rank is...`}
            </div>
            <div className='white f2'>
                {usage}
            </div>
        </div>
 		)
 }

 export default Rank;