
const API = 'https://tan-panicky-lamb.cyclic.app/api'

export const userExists = async (address)=>{
   const response = await fetch(`${API}/getAddress/${address}`,{
    method : 'GET'
   })
   const result = await response.json();
   return result;
}

export const postAddress = async (address,isDoctor) =>{
    const response = await fetch(`${API}/addAddress`,{
        method : 'POST',
        headers:{
          'Content-Type': 'application/json',
          Accept : 'application/json'
        },
        body : JSON.stringify({
            address,
            isDoctor
        })
    })
  const result = await response.json();

  return result;
}