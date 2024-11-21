const app = require("express")()
const { StatusCodes } = require("http-status-codes");
const axios = require("axios");

const serverMessage = (message, data) => {
    let key = "data";

    if(data instanceof Error) {
        key = "error";
        data = data.message;
    }

    return {
        message,
        [key]: data
    }
}

app.get("/", (_, res) => {
    res.send({hello: "world"})
})

app.get("/cep/:cep", async (req, res) => {
    const { cep } = req.params
    const cepUrl = `https://viacep.com.br/ws/${cep}/json/`   

    try {
        const response = await axios.get(cepUrl);

        if(response.status != StatusCodes.OK) {
            throw Error(JSON.stringify(response))
        }
        res
            .status(StatusCodes.OK)
            .json(serverMessage(
                "CEP carregado com sucesso",
                response.data
            ))
    } catch (e) {
        res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(serverMessage(
            "Erro ao carregar CEP",
            e
        ))
    }
})

app.listen(8000, () => {
    console.log("server rodando")
})