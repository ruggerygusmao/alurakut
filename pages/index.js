import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades){
  return(
      <Box as="aside">
        <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}}></img>
        <hr/>
        <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
        </p>
        <hr/>
        
        <AlurakutProfileSidebarMenuDefault />
      </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  const maxFollowers = propriedades.maxFollowers;
  const followersLimited = propriedades.items.slice(0, maxFollowers);

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      
      <ul>
        { followersLimited.map((itemAtual) => {
          return (
            <li key={itemAtual.login}>
              <a href={`https://github.com/${itemAtual.login}`}>
                <img src={`https://github.com/${itemAtual.login}.png`} />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          )
        })} 
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([
    {
    id: '777777',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    },
    {
    id: '66666',
    title: 'Diolinux',
    image: 'https://github.com/Diolinux.png'
    },
    {
    id: '888888',
    title: 'Digital Innovation One',
    image: 'https://github.com/digitalinnovationone.png'
    },
    {
    id: '99999',
    title: 'Alura',
    image: 'https://github.com/alura.png'
    }
]);
  const githubUser = 'ruggerygusmao';
  //const comunidades = ['Alurakut'];
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'felipefialho',
    'robertaarcoverde',
  ]

  const [seguidores, setSeguidores] = React.useState([]);
  //0 - Pegar o array de dados do github
  React.useEffect(function(){
    fetch("https://api.github.com/users/ruggerygusmao/followers")
    .then(function (respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta){
      setSeguidores(respostaCompleta)
    })
  }, [])

  return (
   <>
   <AlurakutMenu githubUser={githubUser} />
  <MainGrid>
    <div className="profileArea" style={{gridArea: 'profileArea'}}>
      <ProfileSidebar githubUser={githubUser}/>
    </div>
    <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
      <Box>
       <h1 className= "title"> 
          Bem vindo(a) 
       </h1>

       <OrkutNostalgicIconSet />
      </Box> 
      <Box>
        <h2 className="subTitle">
          O que você deseja fazer ?
        </h2>
        <form onSubmit={function handleCriaComunidade(e) {
          e.preventDefault();
          const dadosDoForm = new FormData(e.target);
        
          //setComunidades.push('Alura Stars');
          const comunidade ={
            id: new Date().toISOString(),
            title: dadosDoForm.get('title'),
            image: dadosDoForm.get('image')
          }
          const comunidadesAtualizadas = [...comunidades, comunidade];
          setComunidades(comunidadesAtualizadas);
        }}>
          <div>
            <input 
              placeholder="Qual vai ser o nome da sua comunidade?" 
              name="title" 
              aria-label="Qual vai ser o nome da sua comunidade?" 
              type="text"
            />
          </div>
          <div>
            <input 
              placeholder="Coloque uma URL para usarmos de capa" 
              name="image" 
              aria-label="Coloque uma URL para usarmos de capa" 
            />
          </div>

          <button>
            Criar comunidade
          </button>
        </form>
      </Box>
    </div>
    <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBox title="Seguidores" items={seguidores}  />

        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
        <ul>
        {comunidades.map((itemAtual) => {  
        return (
          <li key={itemAtual.id}>
            <a href={`/users/${itemAtual.title}`}>
              <img src={itemAtual.image}/>
              <span>{itemAtual.title}</span>
            </a>
            </li>
        )
          })}
        </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          Pessoas da Comunidade ({pessoasFavoritas.length})
        </h2>

        <ul>
        {pessoasFavoritas.map((itemAtual) => {  
        return (
          <li key={itemAtual}>
            <a href={`/users/${itemAtual}`}>
              <img src={`https://github.com/${itemAtual}.png`}/>
              <span>{itemAtual}</span>
            </a>
            </li>
        )
          })}
          </ul>
           </ProfileRelationsBoxWrapper>
    </div>
  </MainGrid>
  </>
  )
}
