import React from 'react';

//这里的onClick估计多嵌套一个()=>
//如果不嵌套函数就直接运行非点击运行了
const Navigation = ({ onRouteChange,isSignedIn })=>{
	if (isSignedIn) {
		return (
			<nav style = {{display:'flex', justifyContent:'flex-end'}}>
				<p onClick={()=>onRouteChange('signout')}
				className='f3 link dim black underline pa3 pointer'>Sign out</p>
			</nav>
				)
	} else {
		return (
			<nav style = {{display:'flex', justifyContent:'flex-end'}}>
				<p onClick={()=>onRouteChange('signin')}
				className='f3 link dim black underline pa3 pointer'>Sign in</p>
				<p onClick={()=>onRouteChange('register')}
				className='f3 link dim black underline pa3 pointer'>Register</p>
			</nav>
				)
	}
		
	}


export default Navigation;