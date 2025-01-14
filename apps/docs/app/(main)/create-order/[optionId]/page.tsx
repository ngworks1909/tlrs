import { fetchOption } from '@/actions/fetchOption';
import CreateOrder from '@/components/orders/CreateOrder';
import { redirect } from 'next/navigation'

  

export default async function page({params}: {params: {optionId: string}}) {
  const {optionId} = params;
  const orderDetails = await fetchOption(optionId);
  if(!orderDetails){
    redirect('/')
  }
  return (
    <CreateOrder orderDetails={orderDetails}/>
  )
}
