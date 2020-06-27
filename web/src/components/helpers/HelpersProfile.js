import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import imageDefaultUser from '../../assets/images/default-user.jpg';

export function renderProfileImage(image, alt) {
	// console.log('test');

	const altTag = alt !== '' ? alt : ''
	if (typeof image !== 'string') { return null }
	var pattern = /^((http|https|ftp):\/\/)/;
	if (!pattern.test(image)) {
		return (<img src={imageDefaultUser} alt={`No self portrait picture provided`} />)
	}
	return (<img src={image} alt={altTag} />)
}

export function renderBlueCheck(profile) {
	if(
		profile.about === '',
		profile.background === '',
		profile.businessCity === '',
		profile.firstName === '',
		profile.isApproved !== true,
		profile.isPro !== true,
		profile.isProPremium !== true 
	) return null
	
	return <span className="blue-check"><FontAwesomeIcon size={'xs'} icon={["fa", "user-check"]} /></span>
}

export function convertToCapitalizeCase(word) {
	const regex = /([A-Z])(?=[A-Z][a-z])|([a-z])(?=[A-Z])/g;
	return word.replace(regex, '$& ');
}