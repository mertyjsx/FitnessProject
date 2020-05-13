
import React from 'react'

const Notifications = (props) => {
	const { notifications } = props

	return (
		<div>
			Notifications
			<ul>
				{notifications && notifications.map(item => {
					return (
						<li key={item.id}>
							{item.user} - {item.content} - {item.time.toDate().toDateString()}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Notifications