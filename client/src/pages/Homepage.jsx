import { Button } from "antd";


function HomePage(){
    return (
        <div>
            <h1> Welcome to the Jungle!!</h1>
            <button>send email</button>
            <Button>Local products for sale</Button>
          <Button onClick={()=>window.location.replace('/advertisenew')}>Advertise new produce</Button>
          <Button onClick={() => window.location.replace('findlocal')}>Find Local Produce</Button>

        </div>
    )
}

export default HomePage;