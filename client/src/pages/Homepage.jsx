const linkToLogin = () =>{
    location.href="/login";
}


function HomePage(){
    return (
        <div>
            <h1> Welcome to the Jungle!!</h1>
            <button>Logout</button>
            <button onClick={linkToLogin}>Return to Login Page</button>
            <button>send email</button>
        </div>
    )
}

export default HomePage;