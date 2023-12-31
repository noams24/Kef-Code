"use server"

interface Payload {
    values: any,
    subscription:any
     amount:any
    discount:any
}

export const handlePayment = async ({values, subscription, amount, discount}:Payload) => {
    console.log(values)
    return ('bla')
}