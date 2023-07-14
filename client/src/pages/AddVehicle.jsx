import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SelectModel from '../components/SelectModel'
import SelectMake from '../components/SelectMake'
import SelectYear from '../components/SelectYear'
import axios from 'axios'

const AddVehicle = ({ user }) => {
  const navigate = useNavigate()

  const [makes, setMakes] = useState({})
  const [selectedMake, setSelectedMake] = useState({})
  const [models, setModels] = useState({})
  const [selectedModel, setSelectedModel] = useState({})
  const [years, setYears] = useState([])
  const [selectedYear, setSelectedYear] = useState('')

  const handleSubmit = async (e) => {
    await axios.post('http://localhost:3001/vehicles/', {
      username: user.username,
      make: selectedMake.name,
      model: selectedModel.name,
      year: selectedYear,
      apiId: years[selectedYear]
    })
    navigate('/vehicles')
  }

  if (!user) return <h1>Log in to access this page.</h1>
  else
    return (
      <div className="AddVehicle">
        <div>
          <SelectMake
            makes={makes}
            setMakes={setMakes}
            selectedMake={selectedMake}
            setSelectedMake={setSelectedMake}
          />
        </div>
        <div>
          {selectedMake.id && (
            <SelectModel
              makeId={selectedMake.id}
              models={models}
              setModels={setModels}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />
          )}
        </div>
        <div>
          {selectedModel.name && (
            <SelectYear
              selectedModel={selectedModel}
              models={models}
              years={years}
              setYears={setYears}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
          )}
        </div>
        <div>
          {selectedYear && (
            <div>
              <h2>
                {selectedYear} {selectedMake.name} {selectedModel.name}{' '}
                {years[selectedYear]}
              </h2>
              <button onClick={handleSubmit} disabled={!user.username}>
                Add Vehicle
              </button>
            </div>
          )}
        </div>
      </div>
    )
}

export default AddVehicle
