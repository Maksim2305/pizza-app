import { Outlet } from 'react-router-dom';

function Auth(){
    return <>
        <div>
            <h1>Auth</h1>
        </div>
        <div>
            <Outlet/>
        </div>
    </>;
}
export default Auth;