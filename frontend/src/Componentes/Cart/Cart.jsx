import React from 'react'
import "./cart.css"

//rendering condicional si está vacío o no
function Cart() {
  return (
    <div>
        <div className='empty-cart'>
            <h2 className='title-cart sm:text-6xl tracking-tight text-center'>Al parecer tu carrito está vacío...</h2>
            <p className='look-products text-center mt-8 text-3xl'>¿Qué tal si buscas algunos productos?</p>
            <button className='flex mx-auto mt-10'>
                <a href="#" className="inline-block justify-center rounded-md border-transparent bg-gray-600 py-3 px-8 text-center font-medium text-white hover:bg-gray-800 duration-200">
                    Ver colecciones
                </a>
            </button>
        </div>

        <div className='full-cart'>
          <h1 className='sm:text-6xl tracking-tight text-center'>Tu carrito</h1>
            <div className='each-product flex justify-center mt-11'>
              <div className='img-container mr-5'>
                <img className='product-img' src="./img/summer.jpg" alt="" />
              </div>
              <div className='flex flex-col'>
                <h3 className='font-black text-4xl product-title'>Titulo del producto</h3>
                <p className='text-lg py-3'>Descripción del producto</p>
                <p className='font-black text-lg py-3'>$88.60</p>
                <button className='inline-block justify-center rounded-md border-transparent mt-14 bg-gray-600 py-3 px-3 text-center font-medium text-white hover:bg-gray-800 duration-500"'>Quitar del carrito</button>
              </div>
            </div>
            <hr className='mt-12 mx-auto w-1/2'/>
            <div className='each-product flex justify-center mt-11'>
              <div className='img-container mr-5'>
                <img className='product-img' src="./img/summer.jpg" alt="" />
              </div>
              <div className='flex flex-col'>
                <h3 className='font-black text-4xl product-title'>Titulo del producto</h3>
                <p className='text-lg py-3'>Descripción del producto</p>
                <p className='font-black text-lg py-3'>$88.60</p>
                <button className='inline-block justify-center rounded-md border-transparent mt-14 bg-gray-600 py-3 px-3 text-center font-medium text-white hover:bg-gray-800 duration-500"'>Quitar del carrito</button>
              </div>
            </div>
            <hr className='mt-12 mx-auto w-1/2'/>

            <div className='summary flex justify-evenly mt-10'>
              <h2 className='subtitle-summary text-2xl'>Subtotal</h2>
              <p className='text-lg py-3'>1200</p>
            </div>
            <button className='flex mx-auto rounded-md border-transparent mt-14 bg-gray-600 py-3 px-8 text-center font-medium text-white hover:bg-gray-800 duration-500"'>Finalizar compra</button>
        </div>
    </div>
  )
}

export default Cart