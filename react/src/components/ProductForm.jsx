function ProductForm({name, price, stock, description, weight, handleName, handlePrice, handleStock, handleDescription, handleWeight, saveProduct}) {
    return (
        <div className='container'>
            <h2>Cadastro de Produtos</h2>
            <form onSubmit={(e) => saveProduct(e)}>
                <div>
                <label className='form-label' htmlFor="nome">Nome:</label>
                <input className='form-input' value={name} type="text" name="nome" onChange={(e) => handleName(e)} required/>
                </div>
                <div>
                <label className='form-label' htmlFor="preco">Preço:</label>
                <input className='form-input' value={price} type="number" name="preco" onChange={(e) => handlePrice(e)} required/>
                </div>
                <div>
                <label className='form-label' htmlFor="estoque">Estoque:</label>
                <input className='form-input' value={stock} type="number" name="estoque" onChange={(e) => handleStock(e)} required/>
                </div>
                <div>
                <label className='form-label' htmlFor="descricao">Descrição:</label>
                <textarea className='form-input' value={description} name="descricao" onChange={(e) => handleDescription(e)} required></textarea>
                </div>
                <div>
                <label className='form-label' htmlFor="peso">Peso:</label>
                <input className='form-input' value={weight} type="number" name="peso" onChange={(e) => handleWeight(e)} required/>
                </div>
                <input className='form-submit' type="submit" value="Cadastrar" />
            </form>
        </div>
    )
}

export default ProductForm