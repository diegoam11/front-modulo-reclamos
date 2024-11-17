import { Link } from "react-router-dom"


const Missing = () => {
    return (
        <main className='Missing'>
            <p>Page Not Found</p>
            <p>Well, that's disappointing</p>
            <p>
                <Link to='/'>Visit Our Homepage</Link>
            </p>
        </main>
    )
}

export default Missing