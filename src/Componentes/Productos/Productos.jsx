import React from 'react'
import "./productos.css"

function Productos() {
  return (
    <section className='container-section'>
        <div>
            <h1 className="text-center tracking-tight sm:text-6xl">Descubrí nuestras diferentes colecciones</h1>
        </div>
        <div className='grid lg:grid-cols-2 sm:grid-cols-1 place-content-center place-items-center mt-10 gap-y-7 mx-8 gap-x-8'>
            <div className='container-collection promos p-32 rounded-md w-full text-center'>
                <h2 className='collection-title text-5xl font-bold'>Promos</h2>
            </div>
            <div className='container-collection arrivals p-32 rounded-md w-full text-center'>
                <h2 className='collection-title text-5xl font-bold'>Arrivals</h2>
            </div>
            <div className='container-collection summer p-32 rounded-md w-full text-center'>
                <h2 className='collection-title text-5xl font-bold'>Verano</h2>
            </div>
            <div className='container-collection winter p-32 rounded-md w-full text-center'>
                <h2 className='collection-title text-5xl font-bold'>Invierno</h2>
            </div>
        </div>
    </section>
  )
}

export default Productos