const opcoes =[{
    nomePlano: "Plano Básico",
    usuarios: "1 usuário",
    anuncio: "Básico com anúncios",
    resolucao: "Resolução: 720p",
    valor: "R$14,99",
    audio: "Padrão",
  },
  {
    nomePlano: "Plano Intermediário",
    usuarios: "3 usuários",
    anuncio: "Sem anúncios",
    resolucao: "Resolução: 1080p",
    valor: "R$29,99",
    audio: "HI-FI",
  },
  {
    nomePlano: "Plano Ultra",
    usuarios: "7 Usuários",
    anuncio: "Sem anúncios",
    resolucao: "Resolução: 4k",
    valor: "R$49,99",
    audio: "HI-FI + Dolby Atmos",
  }
  ]

  export default function Opcoes() {
    return (
      <div className="container text-center">
        <div className="row">
        {opcoes.map((opcoes, i) => (
          <div className="col" key={i}> 
            <div className="card">
              <div className="card-header">
                <h3 className="card-header">{opcoes.nomePlano}</h3>
                <div className="card body">
                    <p>{opcoes.usuarios}</p>
                    <p>{opcoes.anuncio}</p>
                    <p>{opcoes.resolucao}</p>
                    <p>{opcoes.audio}</p>
                    <p><b>{opcoes.valor}</b></p>
                    <div className="btn btn-primary">
                  Assinar
                    </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    )
  }