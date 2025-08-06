const ProductItem=({products})=>{
<div>
    <h2>{products.name}</h2>
    <button>Delete {products._id}</button>
</div>
}
export default ProductItem