import React from 'react'
import "./productos.min.css"

function Productos() {
  return (
    <>
        <div>
            <h1 className="font text-sm text-center tracking-tight sm:text-6xl">Descubrí nuestras diferentes colecciones</h1>
        </div>
        <div className='grid lg:grid-cols-2 sm:grid-cols-1 place-content-center place-items-center mt-10 gap-y-8'>
            <div className='container-collection p-32 rounded-xl'>
                <h2 className='collection-title text-3xl font-black'>Promos</h2>
            </div>
            <div className='container-collection p-32 rounded-xl'>
                <h2 className='collection-title text-3xl font-black'>Arrivals</h2>
            </div>
            <div className='container-collection p-32 rounded-xl'>
                <h2 className='collection-title text-3xl font-black'>Verano</h2>
            </div>
            <div className='container-collection p-32 rounded-xl'>
                <h2 className='collection-title text-3xl font-black'>Invierno</h2>
            </div>
        </div>
    </>
  )
}

export default Productos