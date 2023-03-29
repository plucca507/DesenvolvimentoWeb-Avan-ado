import "./Card.css";

const filmes = [{
  "nome": "Pacific Rim 1",
  "duracao": "1H30",
  "foto": "pacific.jpg",
  "assistido": true,
  "ano": 2013,
},
{
  "nome": "Pacific Rim 1",
  "duracao": "3H30",
  "foto": "pacific.jpg",
  "assistido": true,
  "ano": 2014,
},
{
  "nome": "Pacific Rim 1",
  "duracao": "2H30",
  "foto": "Pacific_Rim_FilmPoster.jpeg",
  "assistido": false,
  "ano": 2020,
}
]


function Assistido( {javisto} ) {
  if (javisto){
    return <p className="text-success">Assistido</p>;
  }
  return <p className="text-danger">Não assistido</p>;
}

export default function Card() {
  return (
    <div className="container text-center">
      <div className="row">
        {filmes.map((filme, i) => (
          <div className="col" key={i}>
            <div className="card">
              <img src={'/assets/images/' + filme.foto} alt={filme.nome} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{filme.nome} ({filme.ano}) </h5>
                <p>Sinopse</p>
                <p className="card-text">{filme.descricao}</p>
                <p>{filme.duracao}</p>
                <p>{filme.genero}</p>
                <p>{filme.nota}</p>
                <Assistido 
                  javisto={filme.assistido}/>
                <a
                  href={`/detalhes/${filme.nome}`}
                >
                  <div className="btn btn-primary">
                    Detalhes
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}