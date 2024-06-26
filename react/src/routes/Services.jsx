import { useState, useEffect } from 'react'

import './Services.css'
import ProductTable from '../components/ProductTable'
import ProductForm from '../components/ProductForm'

// CRUD COM JSON SERVER

function Services() {  
const [products, setProducts] = useState([]);
const [id, setId] = useState("");
const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [stock, setStock] = useState("");
const [description, setDescription] = useState("");
const [weight, setWeight] = useState("");
const [edit, setEdit] = useState(false);

  const url = 'http://localhost:3000/products';

  useEffect(() => {
    // Lista todos os produtos:
    const getProductsList = async() => {
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    }

    getProductsList();

  }, []);

  const clearForm = () => {
    setName("");
    setPrice("");
    setStock("");
  }

  // Busca apenas um produto pelo seu id:
  // Busca apenas um produto pelo seu id:
const getProductById = async (id) => {
    // Faz a requisição http
    const res = await fetch(url + `/${id}`);
    const data = await res.json();
    // Carrega os dados no formulário para edição:
    setName(data.name);
    setPrice(data.price);
    setStock(data.stock);
    setDescription(data.description); // Set the description state
    setWeight(data.weight); // Set the weight state
    setId(data.id);

    // Habilita edição:
    setEdit(true);
};

  const saveProduct = async (e) => {
    e.preventDefault();
    const saveRequestParams = {
      method: edit ? "PUT" : "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, price, stock, description, weight })
    }

    // Cria url para buscar todos ou apenas um produto
    const save_url = edit ? url + `/${id}` : url;

    // Faz a requisição http
    const res = await fetch(save_url, saveRequestParams);

    // Se for cadastro de produto novo:
    if(!edit) { 
      const newProduct = await res.json();
      // Atualização da tabela:
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }

    // Se for edição/atualização de produto já cadastrado:
    if(edit) {       
      const editedProduct = await res.json();
      // Atualização da tabela:
      const editedProductIndex = products.findIndex(prod => prod.id === id);
      products[editedProductIndex] = editedProduct;
      setProducts(products);
   }

    clearForm();
    setEdit(false);
}

  const deleteProduct = async(id) => {
    // Faz a requisição http
    const res = await fetch(url + `/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
    });

    const deletedProduct = await res.json();
    // Atualização da tabela:
    setProducts(products.filter(prod => prod.id !== deletedProduct.id));
  }

  // Mudança dos estados ao digitar no formulário:
  const handleName = (e) => {setName(e.target.value)};
  const handlePrice = (e) => {setPrice(e.target.value)};
  const handleStock = (e) => {setStock(e.target.value)};
  const handleDescription = (e) => { setDescription(e.target.value) };
const handleWeight = (e) => { setWeight(e.target.value) };

  return (
    <>
     <h2>CRUD com JSON Server</h2>
     <div>
        {
          products.length > 0 ? <ProductTable products={products} deleteProduct={deleteProduct} editProduct={getProductById} /> : <h3 style={{marginBottom: '30px'}}>Nenhum produto cadastrado...</h3>
        }
      </div>

      <ProductForm name={name} price={price} stock={stock} description={description} weight={weight} handleName={handleName} handlePrice={handlePrice} handleStock={handleStock} handleDescription={handleDescription} handleWeight={handleWeight} saveProduct={saveProduct} />
    </>
  )
}

export default Services
