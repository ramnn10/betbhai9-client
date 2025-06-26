// export const authHeader = () => {
//   const user = JSON.parse(localStorage.getItem('clientUser'));
//   if (user && user?.token) {
//     return { 'Authorization': 'Bearer ' + user?.token };
//   } else {
//     return {};
//   }
// };


export const authHeader = ()=> {
  const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;


  if (token) {
      return { 'Authorization': 'Bearer ' + token };
  } else {
      return {};
  }
}