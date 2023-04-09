


import {useEffect, useState} from 'react';
import {Grid} from '@mui/material';
import CardElement from '../../../components/elements/header/card/CardElement';
import * as database from '../../../database';
import { useDispatch, useSelector } from 'react-redux';
import { setDeals } from '../../../redux/slices/dealsSlice';
import { FireStoreConst } from '../../../constants/AppConstants';
import SpinnerLoader from '../../../components/spinner-loader/SpinnerLoaderComponent';

const ShopPage = () =>{
    const dispatch = useDispatch();
    const deals = useSelector((state)=> state.deals);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            (async() =>{ 
                const data = await database.load(FireStoreConst.INVENTORY_VEHICLES);
                setLoading(false);
                dispatch(setDeals(data));
              })() 
        }, 1000);
        return () => clearTimeout(timer);
      }, [dispatch]);
    return(
        <> 
        {
        !loading  && 
       <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {deals && Array.from(deals).map((deal, index) => (
                <Grid item xs={2} sm={3} md={3} key={index}>
                    <CardElement data={deal}/>
                </Grid>
            ))}
            </Grid>
        } 
        {loading && <SpinnerLoader  size={55} loading={loading}/>}
        </>
    )
}
export default ShopPage;