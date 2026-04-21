import React from 'react'
import Page_Title from '../../components/Page-Title/Page_Title'
import ButtonForm from '../../components/composant_formulaire/ButtonForm'
import CreateMotif from './CreateMotif'

const Motif = () => {
  return (
    <div>
      <div className="flex flex-col">
        <div>
          <Page_Title Title={"Liste des motifs"} />
        </div>
        <div>
          <CreateMotif/>
        </div>
      </div>
    </div>
  )
}

export default Motif