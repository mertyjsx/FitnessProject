import React from 'react'
import imageDefaultUser from '../../assets/images/default-user.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { renderProfileImage } from '../helpers/HelpersProfile'
import GetRating from '../rating/GetRating'

const ProCard = ({ pro }) => {

	const renderCosts = () => {
		var proRates = []
		pro.ratesInPersonChef && proRates.push(parseInt(pro.ratesInPersonChef))
		pro.ratesOnlineChef && proRates.push(parseInt(pro.ratesOnlineChef))
		pro.ratesInPersonFitnessTrainer && proRates.push(parseInt(pro.ratesInPersonFitnessTrainer))
		pro.ratesOnlineFitnessTrainer && proRates.push(parseInt(pro.ratesOnlineFitnessTrainer))
		pro.ratesInPersonMassageTherapist && proRates.push(parseInt(pro.ratesInPersonMassageTherapist))
		pro.ratesOnlineMassageTherapist && proRates.push(parseInt(pro.ratesOnlineMassageTherapist))
		pro.ratesInPersonNutritionist && proRates.push(parseInt(pro.ratesInPersonNutritionist))
		pro.ratesOnlineNutritionist && proRates.push(parseInt(pro.ratesOnlineNutritionist))
		// console.log('rates', proRates);
		proRates.sort((a, b) => a - b);
		return (
			<p className="mb--0 text--bold" style={{ fontSize: '14px' }}>Starting at ${proRates[0]}</p>
		)
	}

	const renderProfessions = (professions) => {
		if (typeof professions === 'undefined') {
			return
		}
		var professionsArray = []
		if (professions.chef === true) { professionsArray.push('Chef') }
		if (professions.fitnessTrainer === true) { professionsArray.push('Fitness Trainer') }
		if (professions.nutritionist === true) { professionsArray.push('Nutritionist') }
		if (professions.massageThreapist === true) { professionsArray.push('Massage Therapist') }
		// console.log(professions.chef, professionsArray);
		return (
			<p className="text--capitalize mb--0"><strong>{professionsArray.join(', ')}</strong></p>
		)
	}

	return (
		<div className={`pro-card`}>
			<div className={`pro-card__inner`}>
				<div className={`pro-card__image`}>
					{renderProfileImage(pro.photoURL, `Image of user ${pro.firstName} + ${pro.lastName}`)}
				</div>
				<div className={`pro-card__content`}>
					<h2 className={`pro-card__content-name mb--0 text--capitalize`}>{pro.firstName} {pro.lastName}</h2>
					<GetRating proInteractions={pro.proInteractions} />
					{renderCosts()}
					<p>{pro.businessCity}{pro.businessState ? ', ' + pro.businessState[0] + pro.businessState[1] : ''}</p>
					{renderProfessions(pro.professions)}
					<p>{pro.about ? pro.about.substring(0, 48) + '...' : null}</p>
				</div>
			</div>
		</div>
	)
}

export default ProCard