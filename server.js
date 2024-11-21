const app = require("express")()
const { StatusCodes } = require("http-status-codes");

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
        const response = await fetch(cepUrl);

        if(!response.ok) {
            throw Error("Erro ao fazer requisição")
        }
        const json = await response.json();
        res
            .status(StatusCodes.OK)
            .json(serverMessage(
                "CEP carregado com sucesso",
                json
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