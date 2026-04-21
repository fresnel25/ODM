import React from 'react'
import Page_Title from '../../components/Page-Title/Page_Title'
import ButtonForm from '../../components/composant_formulaire/ButtonForm'
import CreatePlace from './CreatePlace'

const Lieu = () => {
  return (
    <div>
      <div className="flex flex-col">
        <div>
          <Page_Title Title={"Liste des lieux"} />
        </div>
        <div>
         <CreatePlace/>
        </div>
      </div>
    </div>
  )
}

export default Lieu