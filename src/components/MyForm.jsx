import React, { useState } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import RefreshButton from "./RefreshButton"
import refresh from "../assest/refresh.svg"

import './MyForm.css';


const MyForm = () => {
  const [formData, setFormData] = useState({
    time: '',
    hunger: '',
    dietaryRestrictions: [],
    otherInfo: '',
    timeprepare: '',
    flavor: [],
    temp: '',
    cuisine: '',
    otherCuisine: '',
    specifications: [''],
    protein: '',
    carbs: '',
    fat: '',
    calories: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    let updatedRestrictions = [...formData.dietaryRestrictions];
    if (updatedRestrictions.includes(name)) {
      updatedRestrictions = updatedRestrictions.filter((item) => item !== name);
    } else {
      updatedRestrictions.push(name);
    }
    setFormData({ ...formData, dietaryRestrictions: updatedRestrictions });
  };


  const handleFCheckboxChange = (e) => {
    const { name } = e.target;
    let updatedRestrictions = [...formData.flavor];
    if (updatedRestrictions.includes(name)) {
      updatedRestrictions = updatedRestrictions.filter((item) => item !== name);
    } else {
      updatedRestrictions.push(name);
    }
    setFormData({ ...formData, flavor: updatedRestrictions });
  };

  const handleSpecificationChange = (index, e) => {
    const { value } = e.target;
    const newSpecifications = [...formData.specifications];
    newSpecifications[index] = value;
    setFormData({ ...formData, specifications: newSpecifications });
  };

  const handleAddSpecification = () => {
    setFormData({ ...formData, specifications: [...formData.specifications, ''] });
  };

  const [showNutrition, setShowNutrition] = useState(false);
  const [nutritionOptions, setNutritionOptions] = useState([
    { name: 'Protein', options: ['Low', 'Moderate', 'High'] },
    { name: 'Carbs', options: ['Low', 'Moderate', 'High'] },
    { name: 'Fat', options: ['Low', 'Moderate', 'High'] },
    { name: 'Calories', options: ['Low', 'Moderate', 'High'] },
  ]);
  const handleTToggleChange = () => {
    setShowNutrition(!showNutrition);
  };

  const [showSpecifications, setShowSpecifications] = useState(false);
  const handleTTToggleChange = () => {
    setShowSpecifications(!showSpecifications);
  };

  const [showOtherCuisine, setShowOtherCuisine] = useState(false);
  const handleCToggleChange = () => {
    setShowOtherCuisine(!showOtherCuisine);
  };

  const [showTimePreparation, setShowTimePreparation] = useState(false);
  const handleToggleTChange = () => {
    setShowTimePreparation(!showTimePreparation);
  };



  const [showTimeDiv, setShowTimeDiv] = useState(false);
  const [showHungerDiv, setShowHungerDiv] = useState(false);
  const [showDietDiv, setShowDietDiv] = useState(false);
  const [showOtherDiv, setShowOtherDiv] = useState(false);

  const [timeOptions, setTimeOptions] = useState([
    '5 mins',
    '10 mins',
    '15 mins',
    '20 mins',
    '25 mins',
    '30 mins',
    '35 mins',
    '40 mins',
    '45 mins',
    '50 mins',
    '55 mins',
    '1 hr',
    '1 hr 30 mins',
    '2 hrs',
    '3 hrs',
    '4 hrs',
    '5 hrs'
  ]);
  const [showFlavorDiv, setShowFlavorDiv] = useState(false)
  const [MealTemp, setMealTemp] = useState(false);
  const [cuisineOptions, setCuisineOptions] = useState([
    'Italian',
    'Mexican',
    'Chinese',
    'Indian',
    'Japanese',
    'Greek',
    'Thai',
    'French',
    'Spanish',
    'Mediterranean',
    'Middle Eastern',
    'Korean',
    'American',
    'Cajun/Creole',
    'Vietnamese',
    'Ethiopian',
    'Caribbean',
    'Brazilian',
    'Peruvian',
    'German',
  ]);




  // send promptString to AI
  //console.log(promptString);
  const [promptString, setPromptString] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    let newPromptString = "";
    for (const [key, value] of Object.entries(formData)) {
      newPromptString += `${key}: ${value} `;
    }
    setPromptString(newPromptString);
  };
    // send promptString to AI
  function handleRefreshButton() {
    // set the promptString state variable here
    let newPromptString = "";
    for (const [key, value] of Object.entries(formData)) {
      newPromptString += `${key}: ${value} `;
    }
    setPromptString(newPromptString);
    
    setRefreshKey(prevKey => prevKey + 1);
  }

  

  return (

    <Form onSubmit={handleSubmit} className="Form">
      <Container>
        <Row>
          <Col md={6} xs={12}>
            <div className="input-container">
              <div className="toggle-container">
                <Form.Check
                  type="switch"
                  id="time-switch"
                  label="What time of day is it?"
                  onChange={() => setShowTimeDiv(!showTimeDiv)}
                />
              </div>
              {showTimeDiv && (
                <div className="input-div">
                  <Form.Group controlId="time">
                    <Form.Check
                      type="radio"
                      name="time"
                      label="Morning"
                      value="morning"
                      checked={formData.time === 'morning'}
                      onChange={handleInputChange}
                    />
                    <Form.Check
                      type="radio"
                      name="time"
                      label="Afternoon"
                      value="afternoon"
                      checked={formData.time === 'afternoon'}
                      onChange={handleInputChange}
                    />
                    <Form.Check
                      type="radio"
                      name="time"
                      label="Evening"
                      value="evening"
                      checked={formData.time === 'evening'}
                      onChange={handleInputChange}
                    />
                    <Form.Check
                      type="radio"
                      name="time"
                      label="Late night"
                      value="late night"
                      checked={formData.time === 'late night'}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </div>
              )}
            </div>
          </Col>
          <Col md={6} xs={12}>
            <div className="input-container">
              <div className="toggle-container">
                <Form.Check
                  type="switch"
                  id="flavor-switch"
                  label="What kind of Flavors are you in the mood for?"
                  onChange={() => setShowFlavorDiv(!showFlavorDiv)}
                />
              </div>
              {showFlavorDiv && (
                <div className="input-div">
                  <Form.Group controlId="flavor">
                    <Form.Check
                      type="checkbox"
                      name="spicy"
                      label="Spicy"
                      checked={formData.flavor.includes('spicy')}
                      onChange={handleFCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="savoury"
                      label="Savoury"
                      checked={formData.flavor.includes('savoury')}
                      onChange={handleFCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="sweet"
                      label="Sweet"
                      checked={formData.flavor.includes('sweet')}
                      onChange={handleFCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="sour"
                      label="Sour"
                      checked={formData.flavor.includes('sour')}
                      onChange={handleFCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="salty"
                      label="Saltyr"
                      checked={formData.flavor.includes('salty')}
                      onChange={handleFCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="bitter"
                      label="Bitter"
                      checked={formData.flavor.includes('bitter')}
                      onChange={handleFCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="umami"
                      label="Umami"
                      checked={formData.flavor.includes('umami')}
                      onChange={handleFCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="mild"
                      label="Mild"
                      checked={formData.flavor.includes('mild')}
                      onChange={handleFCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="fresh"
                      label="Fresh"
                      checked={formData.flavor.includes('fresh')}
                      onChange={handleFCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="tangy"
                      label="Tangy"
                      checked={formData.flavor.includes('tangy')}
                      onChange={handleFCheckboxChange}
                    />
                    <Form.Control
                      type="text"
                      placeholder="Other"
                      name="otherFlavor"
                      value={formData.otherFlavor}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12}>
            <div className="input-container">
              <div className="toggle-container">
                <Form.Check
                  type="switch"
                  id="hunger-switch"
                  label="How hungry are you?"
                  onChange={() => setShowHungerDiv(!showHungerDiv)}
                />
              </div>
              {showHungerDiv && (
                <div className="input-div">
                  <Form.Group controlId="hunger">
                    <Form.Check
                      type="radio"
                      name="hunger"
                      label="Not hungry"
                      value="not hungry"
                      checked={formData.hunger === 'not hungry'}
                      onChange={handleInputChange}
                    />
                    <Form.Check
                      type="radio"
                      name="hunger"
                      label="A little hungry"
                      value="a little hungry"
                      checked={formData.hunger === 'a little hungry'}
                      onChange={handleInputChange}
                    />
                    <Form.Check
                      type="radio"
                      name="hunger"
                      label="Very hungry"
                      value="very hungry"
                      checked={formData.hunger === 'very hungry'}
                      onChange={handleInputChange}
                    />
                    <Form.Check
                      type="radio"
                      name="hunger"
                      label="Craving food"
                      value="craving food"
                      checked={formData.hunger === 'craving food'}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </div>
              )}
            </div>
          </Col>
          <Col md={6} xs={12}>
            <div className="input-container">
              <div className="toggle-container">
                <Form.Check
                  type="switch"
                  id="nutrition-switch"
                  label="How much protein, carbs, fat, and calories do you want in your meal?"
                  onChange={handleTToggleChange}
                />
              </div>
              {showNutrition && (
                <div className="input-div">
                  {nutritionOptions.map((option) => (
                    <Form.Group key={option.name} controlId={option.name.toLowerCase()}>
                      <Form.Label>{option.name}: </Form.Label>
                      <Form.Control
                        as="select"
                        name={option.name.toLowerCase()}
                        value={formData[option.name.toLowerCase()]}
                        onChange={handleInputChange}
                      >
                        <option value="">Select {option.name.toLowerCase()} amount</option>
                        {option.options.map((amount) => (
                          <option key={amount} value={amount}>
                            {amount}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12}>
            <div className="input-container">
              <div className="toggle-container">
                <Form.Check
                  type="switch"
                  id="diet-switch"
                  label="What are your dietary restrictions?"
                  onChange={() => setShowDietDiv(!showDietDiv)}
                />
              </div>
              {showDietDiv && (
                <div className="input-div">
                  <Form.Group controlId="dietaryRestrictions">
                    <Form.Check
                      type="checkbox"
                      name="vegetarian"
                      label="Vegetarian"
                      checked={formData.dietaryRestrictions.includes('vegetarian')}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="vegan"
                      label="Vegan"
                      checked={formData.dietaryRestrictions.includes('vegan')}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="glutenFree"
                      label="Gluten-free"
                      checked={formData.dietaryRestrictions.includes('glutenFree')}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="dairyFree"
                      label="Dairy-free"
                      checked={formData.dietaryRestrictions.includes('dairyFree')}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="nutFree"
                      label="Nut-free"
                      checked={formData.dietaryRestrictions.includes('nutFree')}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="shellfishFree"
                      label="Shellfish-free"
                      checked={formData.dietaryRestrictions.includes('shellfishFree')}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="kosher"
                      label="Kosher"
                      checked={formData.dietaryRestrictions.includes('kosher')}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="halal"
                      label="Halal"
                      checked={formData.dietaryRestrictions.includes('halal')}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="paleo"
                      label="Paleo"
                      checked={formData.dietaryRestrictions.includes('paleo')}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      name="keto"
                      label="Keto"
                      checked={formData.dietaryRestrictions.includes('keto')}
                      onChange={handleCheckboxChange}
                    />
                    <Form.Control
                      type="text"
                      placeholder="Other"
                      name="otherDietaryRestrictions"
                      value={formData.otherDietaryRestrictions}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </div>
              )}
            </div>
          </Col>
          <Col md={6} xs={12}>
            <div className="input-container">
              <div className="toggle-container">
                <Form.Check
                  type="switch"
                  id="temp-switch"
                  label="Do you want a hot or cold meal?"
                  onChange={() => setMealTemp(!MealTemp)}
                />
              </div>
              {MealTemp && (
                <div className="input-div">
                  <Form.Group controlId="temp">
                    <Form.Check
                      type="radio"
                      name="temp"
                      label="Hot"
                      value="hot"
                      checked={formData.temp === 'hot'}
                      onChange={handleInputChange}
                    />
                    <Form.Check
                      type="radio"
                      name="temp"
                      label="Cold"
                      value="cold"
                      checked={formData.temp === 'cold'}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12}>
            <div className="input-container">
              <div className="toggle-container">
                <Form.Check
                  type="switch"
                  id="other-switch"
                  label="What Ingredients do you have in hand?"
                  onChange={() => setShowOtherDiv(!showOtherDiv)}
                />
              </div>
              {showOtherDiv && (
                <div className="input-div">
                  <Form.Group controlId="otherInfo">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter any additional information here"
                      name="otherInfo"
                      value={formData.otherInfo}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </div>
              )}
            </div>
          </Col>
          <Col md={6} xs={12}>
            <div className="input-container">
              <div className="toggle-container">
                <Form.Check
                  type="switch"
                  id="cuisine-switch"
                  label="What cuisine are you in the mood for?"
                  onChange={handleCToggleChange}
                />
              </div>
              {showOtherCuisine ? (
                <Form.Group controlId="otherCuisine">
                  <Form.Label>Other: </Form.Label>
                  <Form.Control
                    type="text"
                    name="otherCuisine"
                    value={formData.otherCuisine}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              ) : (
                <div className="input-div">
                  <Form.Group controlId="cuisine">
                    <Form.Control
                      as="select"
                      name="cuisine"
                      value={formData.cuisine}
                      onChange={handleInputChange}
                    >
                      <option value="">Select cuisine</option>
                      {cuisineOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12}>
            <div>
              <div className="toggle-container">
                <Form.Check
                  type="switch"
                  id="time-preparation-switch"
                  label="How much time do you have to prepare?"
                  onChange={handleToggleTChange}
                />
              </div>
              {showTimePreparation && (
                <div className="input-container">
                  <div className="input-div">
                    <Form.Group controlId="time-preparation">
                      {/*                 <Form.Label>How much time do you have to prepare?</Form.Label> */}
                      <Form.Control
                        as="select"
                        onChange={handleInputChange}
                        value={formData.timePreparation}
                        name="timePreparation"
                      >
                        <option value="">Select time</option>
                        {timeOptions.map((timeOption, index) => (
                          <option key={index} value={timeOption}>
                            {timeOption}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </div>
                </div>
              )}
            </div>
          </Col>
          <Col md={6} xs={12}>
            <div className="input-container">
              <div className="toggle-container">
                <Form.Check
                  type="switch"
                  id="specifications-switch"
                  label="Other specifications you would like to add."
                  onChange={handleTTToggleChange}
                />
              </div>
              {showSpecifications &&
                formData.specifications.map((specification, index) => (
                  <Form.Group key={index} controlId={`specification-${index}`}>
                    <Form.Control
                      type="text"
                      placeholder="Enter specification"
                      value={specification}
                      onChange={(e) => handleSpecificationChange(index, e)}
                    />
                  </Form.Group>
                ))}
              {showSpecifications && formData.specifications.length < 3 && (
                <Button variant="outline-primary" onClick={handleAddSpecification}>
                  Add more
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>


      <div className="submit-container center magin-b">
        <button type="submit" className="refresh-btn" onClick={handleRefreshButton}>
          <img src={refresh} alt="Refresh" className="refreshbtn"/>
        </button></div>
      <div>
        {promptString && <RefreshButton promptString={promptString} refreshKey={refreshKey} />}
      </div>
    </Form>
  );
};


export default MyForm;
