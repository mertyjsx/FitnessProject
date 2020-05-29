import React, { Component } from 'react'
import audric from '../../assets/images/audric.png'
import justen from '../../assets/images/justen.png'

class About extends Component {
	render() {
		return (
			<div className="about page">
				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col">
							<h1 className="text--lg">About</h1>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<p>Choose To Be Fit (C2B) provides a platform and community to connect professionals (Trainers, Nutritionists, Chefs, and Massage Therapists) with clients in a convenient way through one of the most powerful tools out there today, the internet. If you need a trainer to help you meet your fitness goals, a massage therapist to provide a therapeutic massage, a nutritionist to design a tailored meal plan, or a chef to prepare the perfect meal, choose Choose To Be Fit. With C2B, our focus is to promote a lifestyle of health, wellness, motivation, and positivity for both clients and professionals. The purpose of our existence is to create a culture where everyone chooses to be fit for all aspects of life.</p>
						</div>
					</div>
				</div>

				<div className="page__quote">
					<div className="container container--small container--top-bottom-padding">
						<p className="text--center text--md">We’re on a mission to foster a GLOBAL community of health, positivity, motivation, and happiness in the next 5 years</p>
					</div>
				</div>

				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col col--7">
							<div>
								<h2 className="text--md">Audric Smith</h2>
								<p><strong>Co-Founder, CEO</strong></p>
								<p>Audric Smith is a Founder and Owner of Choose To Be You. He has always had a passion for health &amp; fitness, and discovered C2Byou to transfer this lifestyle to others and positively impact as many lives as possible. Audric received his Masters of Accounting degree from The Ohio State, and Bachelor of Science in Accounting from UNC Fayetteville State University. He also has a CPA license and is a Senior Manager at an accounting and financial consulting firm. Audric is also active in the community, contributing to organizations such as Big Brothers Big Sisters, Salvation Army, and Boys &amp; Girls Club, and Camillus House. Audric was born in Nassau, Bahamas and currently resides in Florida. When not occupied with the aforementioned activities, he is engaged in motivational speaking, self-education, and writing.</p>
							</div>
						</div>
						<div className="col col--5">
							<div>
								<img src={audric} alt={'Audric Smith'} />
							</div>
						</div>
					</div>
				</div>

				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col col--7">
							<div>
								<h2 className="text--md">Justen Augustine</h2>
								<p><strong>Co-Founder, COO</strong></p>
								<p>Justen Augustine is a Founder at Choose To Be You and directs strategic initiatives that concerns the company’s growth in the Health &amp; Fitness Industry. He has always been extremely passionate about health &amp; fitness since he was 15. Later, he discovered this opportunity, C2Byou, with his cousin, Audric Smith, to transfer his strong emotion into value, by helping others live a happier and healthier life. Justen has acquired his Personal Trainer Certification from ISSA. As an online fitness instructor, Justen has helped thousands of students and clients achieve their physical fitness goals. Justen was born in Florida and currently resides in New York. When he’s not working, the Social Media Influencer is engaged in exercise, self-education, and travel.</p>
							</div>
						</div>
						<div className="col col--5">
							<div>
								<img src={justen} alt={'Justen Augustine'} />
							</div>
						</div>
					</div>
				</div>

			</div>
		)
	}
}

export default About