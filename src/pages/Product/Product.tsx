import { Await, useLoaderData } from 'react-router-dom';
import { IProduct } from '../../interfaces/product.interfaces';
import { Suspense } from 'react';

function Product() {
    const data = useLoaderData() as { data: IProduct};
    return (
        <>
        <Suspense fallback={'Загружаем...'}>
            <Await
                resolve={data.data}
            >
                {({data} : {data: IProduct})=>(
                    <>Product - {data.name}</>
                )}
            </Await>
        </Suspense>
        </>
    );
        
    
}
export default Product;