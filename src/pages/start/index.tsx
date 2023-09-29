import { useNavigate } from 'react-router-dom';

function Start(){
    const navigate = useNavigate();
    
    localStorage.setItem('teste', true as any);

    return(
        <div>
            <button onClick={() => navigate('/home')}>teste</button>
        </div>
    );
}

export default Start;