"use client"
import { useState } from "react";
const FormImage = () => {
    const [file, setFile] = useState(null);
    return ( 
        <div>
      <form 
      onSubmit={async (e) =>{
        e.preventDefault()

        const formData = new FormData()
        formData.append('image', file)

        const response = await fetch ('api/upload', {
          method: "POST",
          body: formData,
        })
        const data = await response.json();
        console.log(data);

      }}>
        <label className="block mt-3 mb-3 text-1xl md:text-lg">Subir Imagen</label>

        <input type="file" name="image" onChange={(e) => {
          setFile(e.target.files[0]);
        }}/>

        <button className="p-3 bg-blue-900 text-gray-50 block mt-3">Enviar</button>
      </form>
    </div>
     );
}
 
export default FormImage;