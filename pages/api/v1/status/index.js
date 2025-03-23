function status(request, response){
    response.status(200).json({ 
        chave: "Yuri é viado" 

    });
}

export default status;