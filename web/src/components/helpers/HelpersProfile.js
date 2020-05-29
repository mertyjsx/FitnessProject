import React from 'react'
import imageDefaultUser from '../../assets/images/default-user.jpg'

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