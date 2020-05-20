import React from 'react'
import imageDefaultUser from '../../assets/images/default-user.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProCard = ({ pro }) => {

	const renderImageURL = (photoURL, firstName, lastName) => {
		var pattern = /^((http|https|ftp):\/\/)/;
		if (!pattern.test(photoURL)) {
			return (<img src={imageDefaultUser} alt={`No self portrait picture provided`} />)
		}
		return (<img src={photoURL} alt={`Portrait of ${firstName} ${lastName}`} />)
	}

	const renderStartingCost = (online, inPerson) => {
		var onlineRate, inPersonRate;

		if (typeof online !== 'undefined' && online.length >= 1) {
			onlineRate = `$` + online + ` Online`;
		}
		if (typeof inPerson !== 'undefined') {
			if (inPerson.length >= 1) {
				inPersonRate = `$` + inPerson + ` In Person`;
			}
		}

		return (
			<div>
				<h3 className={`mb--0`}><strong>Starting Cost Per Hour</strong></h3>
				<p>{onlineRate} {inPersonRate}</p>
			</div>
		)
	}

	const renderStarRating = () => {
		return (
			<div className={`star-rating`}>
				<ul>
					<li className={`star-rating--yellow`}>3.0</li>
					<li className={`star-rating--yellow`}><FontAwesomeIcon icon={["fa", "star"]} /></li>
					<li className={`star-rating--yellow`}><FontAwesomeIcon icon={["fa", "star"]} /></li>
					<li className={`star-rating--yellow`}><FontAwesomeIcon icon={["fa", "star"]} /></li>
					<li><FontAwesomeIcon icon="star" /></li>
					<li><FontAwesomeIcon icon={["fas", "star"]} /></li>
				</ul>
			</div>
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
					{renderImageURL(pro.photoURL, pro.firstName, pro.lastName)}
				</div>
				<div className={`pro-card__content`}>
					<h2 className={`pro-card__content-name mb--0`}>{pro.firstName} {pro.lastName}</h2>
					{renderStarRating()}
					{renderProfessions(pro.professions)}
					<p>{pro.about ? pro.about.substring(0, 24) + '...' : null}</p>
					{renderStartingCost(pro.ratesOnline, pro.ratesInPerson)}
				</div>
			</div>
		</div>
	)
}

export default ProCard