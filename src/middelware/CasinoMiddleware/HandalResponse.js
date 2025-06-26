export const handleResponse = (response) => {
    // console.log("response22222   ", response);
  
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        // console.log("response22222   ", data);
        if (!response.ok) {
           
  
            if (response.status === 401) {
                localStorage.clear();
                window.location.href = "/"
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        if (data.error) {
   
            if (data.code === 3) {
                localStorage.clear();
                window.location.href = "/"
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
  };
  