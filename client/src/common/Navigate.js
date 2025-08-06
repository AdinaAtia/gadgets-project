import { NavLink } from "react-router-dom"
const Navigate=()=>{
return <div className="nav">
<NavLink to='/'>Home page</NavLink>
<NavLink to='/products'>Products List</NavLink>

<NavLink to='/products/add'>Add Products </NavLink>
</div>

}
export default Navigate