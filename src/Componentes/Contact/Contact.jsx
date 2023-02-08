import React from 'react'
import "./contact.css"

function Contact() {
  return (
    <div className='wrapper-section'>
        <h2 className='contact-title text-center tracking-tight sm:text-6xl'>Contacto</h2>
        <div className='container-contacts grid lg:grid-cols-2 sm:grid-cols-1 mt-4'>
            <div className='sales h-full mx-1 p-3 rounded-md'>
                <img src="./img/ventas.svg" alt="ventas" className='mx-auto h-48' />
                <h3 className='text-center font-black text-4xl mb-2 mt-0'>Ventas</h3>
                <p className='text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor iure id voluptas harum ullam molestiae in placeat cumque accusamus fugit aspernatur enim cum fuga, libero, quaerat labore reprehenderit animi perspiciatis?</p>
                <button className='btn-contact-sales rounded-md p-2 mt-2 border-none w-72 text-lg flex mx-auto justify-center'>Contactar</button>
            </div>
            <div className='support h-full mx-1 p-3 rounded-md'>
                <img src="./img/support.svg" alt="" className='mx-auto h-48' />
                <h3 className='text-center font-black text-4xl mb-2 mt-0'>Soporte técnico</h3>
                <p className='text-lg'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae molestiae velit fugiat repudiandae blanditiis id earum reiciendis deserunt eum, mollitia nam nihil dolores alias? Rem fugiat laboriosam nesciunt accusamus eos.</p>
                <button className='btn-contact-support rounded-md p-2 mt-2 border-none w-72 text-lg flex mx-auto justify-center'>Contactar</button>
            </div>
        </div>
    </div>
  )
}

export default Contact