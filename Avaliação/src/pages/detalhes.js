import React from 'react';
import { useParams } from 'react-router-dom';
import Title from './../components/Title';


const filmes = [{
    "nome": "Pacific Rim 1",
    "genero": "Ação/Nerd",
    "descricao": "Filme de robôs Gigantes",
    "nota": 10
},
{
    "nome": "Pacific Rim 2",
    "genero": "Ação/Nerd",
    "descricao": "Filme de robôs Gigantes",
    "nota": 9
},
{
    "nome": "Pacific Rim 3",
    "genero": "Ação/Nerd",
    "descricao": "Filme de robôs Gigantes",
    "nota": "-"
}
]


function Detalhes() {
    const { filme } = useParams();

    return (
        <div>
            <Title title={filme} text="" />
            <p>Filme: {filme}</p>
            {(() => {
                if (filme === 'Pacific Rim 1') {
                    return (
                        <div className="text-center col-12">
                            <p>{filmes[0].descricao}</p>
                            <p>{filmes[0].genero}</p>
                        </div>
                    )
                } else if (filme === 'Pacific Rim 2') {
                    return (
                        <div className="text-center col-12">
                            <p>{filmes[1].descricao}</p>
                            <p>{filmes[1].genero}</p>
                        </div>
                    )
                } else {
                    return (
                        <div className="text-center col-12">
                            <p>{filmes[2].descricao}</p>
                            <p>{filmes[2].genero}</p>
                        </div>
                    )
                }
            })()}
        </div>
    )
}

export default Detalhes;