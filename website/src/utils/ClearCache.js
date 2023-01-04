import { useNavigate } from "react-router-dom";


const ClearCache = () => {

    const navigate = useNavigate();

    const callClearCache = () => {
        localStorage.clear()
        navigate(0)
    }

    return (
        <>
            <button className="clear-cache" onClick={() => callClearCache()}>Clear Cache</button>
        </>
    )
}

export default ClearCache