import { Fragment, useEffect, useState } from "react";


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
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.log(err));

    return rsp;
}


const Integracion = (props) => {

    const [data, setData] = useState({});

    useEffect(
        () => {
            const func = async () => {
                let res = await getData();

                console.log(res);
                
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
                <Fragment key={el.producto_id}>
                    <p>{el.nombre}</p>
                    <br />
                </Fragment>)
            })

        }
    </>);
}

export default Integracion;


