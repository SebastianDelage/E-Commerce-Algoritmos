import { Fragment, useEffect, useState } from "react";
import ProductCard from "../Componentes/ProductCard.jsx";
 

const getData = async () => {
    let rsp = await fetch("http://localhost:5079/Producto/GetAll", {
        method:"GET",
        mode:"cors",
        /*
        method:"POST",
        mode:"cors"
        body:JSON.stringify({})
        */
    })
    .then(rsp => rsp.json())
    .then(rsp => rsp)
    .catch(err => console.log(err));

    return rsp;
}


const Integracion = (props) => {

    const [data, setData] = useState({});

    useEffect(
        () => {
            const func = async () => {
                let res = await getData();

                
                if(typeof(res) == typeof({}))
                {
                    setData(res);
                };
            };

        func();
    }, [])

    return(<>
        {
            data?.data?.map((el) => {
                return(
                <ProductCard producto={el} key={el.producto_id}/>)
            })

        }
    </>);
}

export default Integracion;


