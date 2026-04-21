import React from 'react'
import Page_Title from '../../components/Page-Title/Page_Title'
import ButtonForm from '../../components/composant_formulaire/ButtonForm'
import CreateTeam from './CreateTeam'

const Equipe = () => {
  return (
    <div>
      <div className="flex flex-col">
        <div>
          <Page_Title Title={"Liste des équipes"} />
        </div>
        <div>
         <CreateTeam/>
        </div>
      </div>
    </div>
  )
}

export default Equipe